// app/api/contact/route.ts
import { Resend } from "resend";
import { getStore } from "@netlify/blobs";
import { contactSchema } from "@/lib/contact-schema";

// Route Handlers in app/ are dynamic by default (POST is never cached).
// Force the Node.js runtime — Resend's SDK uses Node APIs.
export const runtime = "nodejs";

// Minimum time a form must have been on screen before submitting.
// Faster than this almost certainly indicates a bot.
const MIN_FORM_FILL_MS = 1500;

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 submissions per IP per window

// In-memory fallback used only when Netlify Blobs is unavailable (e.g. local
// `next dev`). On Netlify each serverless instance has its own memory, so this
// alone would not enforce a shared limit — hence the Blobs-backed store below.
const ipHits = new Map<string, number[]>();

function memoryRateLimit(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (ipHits.get(ip) ?? []).filter((t) => t > cutoff);
  if (recent.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, recent);
    return false;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return true;
}

/**
 * Per-IP rate limit backed by Netlify Blobs so the limit is shared across all
 * serverless instances. Reads use strong consistency so concurrent requests
 * see each other's recent writes. Falls back to in-memory tracking if Blobs is
 * not configured (local dev), so the route never hard-fails on this check.
 */
async function rateLimit(ip: string): Promise<boolean> {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  try {
    const store = getStore("contact-rate-limit");
    const key = `ip:${ip}`;
    const existing = (await store.get(key, {
      type: "json",
      consistency: "strong",
    })) as number[] | null;
    const recent = (existing ?? []).filter((t) => t > cutoff);
    if (recent.length >= RATE_LIMIT_MAX) {
      await store.setJSON(key, recent);
      return false;
    }
    recent.push(now);
    await store.setJSON(key, recent);
    return true;
  } catch {
    // Blobs unavailable (typically local dev). Degrade to in-memory limiting.
    return memoryRateLimit(ip);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getClientIp(req: Request): string {
  // Vercel/most proxies forward the real client IP here.
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export async function POST(request: Request) {
  // --- Same-origin check ----------------------------------------------------
  // Only accept requests that originated from this site. Browsers send Origin
  // on POSTs, so a missing/foreign Origin is a strong CSRF signal.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin) {
    try {
      const originHost = new URL(origin).host;
      if (host && originHost !== host) {
        return Response.json({ ok: false, error: "Bad origin." }, { status: 403 });
      }
    } catch {
      return Response.json({ ok: false, error: "Bad origin." }, { status: 403 });
    }
  }

  // --- Parse + validate -----------------------------------------------------
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid form submission." },
      { status: 400 }
    );
  }

  const { name, email, message, website, mountedAt } = parsed.data;

  // --- Bot deterrents -------------------------------------------------------
  if (website && website.length > 0) {
    // Honeypot tripped. Pretend success so bots don't learn.
    return Response.json({ ok: true });
  }

  const elapsed = Date.now() - mountedAt;
  if (Number.isNaN(elapsed) || elapsed < MIN_FORM_FILL_MS) {
    return Response.json({ ok: true }); // silent reject
  }

  // --- Rate limit -----------------------------------------------------------
  const ip = getClientIp(request);
  if (!(await rateLimit(ip))) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  // --- Send via Resend ------------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("[contact] Missing required environment variables.");
    return Response.json(
      { ok: false, error: "Server is not configured to send email." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const subject = `New message from garrettswink.com — ${name}`;
  const text = `From: ${name} <${email}>\n\n${message}`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1a1a1a; line-height: 1.55;">
      <p style="margin: 0 0 8px;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return Response.json(
        { ok: false, error: "Could not send message. Please try again later." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return Response.json(
      { ok: false, error: "Could not send message. Please try again later." },
      { status: 500 }
    );
  }
}

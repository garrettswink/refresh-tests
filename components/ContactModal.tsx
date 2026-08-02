// components/ContactModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

type SendStatus = "idle" | "sending" | "success" | "error";

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const mountedAtRef = useRef<number>(0);
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const submitting = status === "sending";

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Focus first field when opened, reset state when closed
  useEffect(() => {
    if (open) {
      mountedAtRef.current = Date.now();
      // Wait for the transition's first frame so the input is interactive.
      requestAnimationFrame(() => firstFieldRef.current?.focus());
    } else {
      setStatus("idle");
      setErrorMessage("");
      setForm({ name: "", email: "", message: "", website: "" });
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          website: form.website,
          mountedAt: mountedAtRef.current,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Could not send message. Please try again."
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Blurred backdrop. Clicking dismisses. */}
      <button
        type="button"
        aria-label="Close contact form"
        onClick={onClose}
        className="absolute inset-0 w-full h-full bg-[#0a0a0a]/60 backdrop-blur-md cursor-default"
      />

      {/* Dialog wrapper — centers the panel within the viewport */}
      <div className="absolute inset-0 flex items-center justify-center px-4 py-6 pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          ref={dialogRef}
          className={`relative w-full max-w-[560px] bg-[#0a0a0a] border border-gold/30 shadow-[0_20px_80px_rgba(0,0,0,0.55)] px-7 md:px-10 py-10 md:py-12 max-h-[calc(100vh-3rem)] overflow-y-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
          }`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="group absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full border border-gold/30 text-gold hover:border-gold/70 hover:bg-gold/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>

          {status === "success" ? (
            /* Confirmation — replaces the form entirely */
            <div className="py-6 text-center">
              <p
                role="status"
                aria-live="polite"
                className="font-cormorant font-light text-[#f0ece4] leading-[1.3] tracking-[0.02em]"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)" }}
              >
                Thank you for your message.
                <br />
                <span className="italic text-gold">
                  I&rsquo;ll be in touch soon.
                </span>
              </p>
            </div>
          ) : (
            <>
          {/* Eyebrow + heading */}
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-3">
            Contact
          </p>
          <h2
            id="contact-modal-title"
            className="font-cormorant font-light text-[#f0ece4] leading-[1.15] tracking-[0.02em] mb-8"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Send a <span className="italic text-gold">message</span>
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot — visually hidden, accessible to bots only. */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
            >
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) =>
                  setForm((f) => ({ ...f, website: e.target.value }))
                }
              />
            </div>

            <Field
              id="contact-name"
              label="Name"
              inputRef={firstFieldRef}
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            />

            <Field
              id="contact-email"
              label="Email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            />

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="text-[0.6rem] tracking-[0.2em] uppercase text-[#f0ece4]/45"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="bg-transparent border border-white/[0.12] focus:border-gold/60 px-3 py-2.5 text-[0.95rem] font-light text-[#f0ece4] placeholder-[#f0ece4]/25 outline-none transition-colors duration-200 resize-y"
              />
            </div>

            <div className="pt-2 flex flex-col items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="text-[0.7rem] tracking-[0.18em] uppercase text-gold border border-gold/40 px-7 py-2.5 hover:bg-gold/10 hover:border-gold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending…" : "Send"}
              </button>

              <p
                role="status"
                aria-live="polite"
                className={`text-[0.7rem] tracking-[0.12em] uppercase min-h-[1rem] ${
                  status === "error"
                    ? "text-[#f0ece4]/70"
                    : "text-transparent"
                }`}
              >
                {status === "error" ? errorMessage : "\u00A0"}
              </p>
            </div>
          </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type: "text" | "email";
  value: string;
  onChange: (next: string) => void;
  required?: boolean;
  autoComplete?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

function Field({
  id,
  label,
  type,
  value,
  onChange,
  required,
  autoComplete,
  inputRef,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[0.6rem] tracking-[0.2em] uppercase text-[#f0ece4]/45"
      >
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border border-white/[0.12] focus:border-gold/60 px-3 py-2.5 text-[0.95rem] font-light text-[#f0ece4] placeholder-[#f0ece4]/25 outline-none transition-colors duration-200"
      />
    </div>
  );
}

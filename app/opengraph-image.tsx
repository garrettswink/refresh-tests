import { ImageResponse } from "next/og";

// Social share thumbnail for the whole site. Recreates the hero look:
// dark ground, gold accent, the serif "Digital Communications Strategy".
export const alt = "Garrett Swink — Digital Communications Strategy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load font: ${url}`);
  return res.arrayBuffer();
}

export default async function Image() {
  // Load Cormorant Garamond (normal + italic) so the OG image matches the
  // site's serif. If the CDN is unreachable, fall back to the bundled font.
  let fonts;
  try {
    const [regular, italic] = await Promise.all([
      loadFont(
        "https://cdn.jsdelivr.net/fontsource/fonts/cormorant-garamond@latest/latin-400-normal.ttf"
      ),
      loadFont(
        "https://cdn.jsdelivr.net/fontsource/fonts/cormorant-garamond@latest/latin-400-italic.ttf"
      ),
    ]);
    fonts = [
      { name: "Cormorant", data: regular, weight: 400 as const, style: "normal" as const },
      { name: "Cormorant", data: italic, weight: 400 as const, style: "italic" as const },
    ];
  } catch {
    fonts = undefined;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
          fontFamily: fonts ? "Cormorant" : "serif",
        }}
      >
        {/* Thin gold frame */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: "1px solid rgba(201,169,110,0.35)",
            display: "flex",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "#c9a96e",
            marginBottom: 44,
          }}
        >
          Garrett Swink
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#f0ece4",
            fontSize: 96,
            lineHeight: 1.08,
          }}
        >
          <div style={{ display: "flex" }}>Digital Communications</div>
          <div style={{ display: "flex", fontStyle: "italic", color: "#c9a96e" }}>
            Strategy
          </div>
        </div>

        {/* Rule */}
        <div
          style={{
            display: "flex",
            width: 240,
            height: 1,
            background: "rgba(201,169,110,0.5)",
            marginTop: 52,
          }}
        />
      </div>
    ),
    { ...size, fonts }
  );
}

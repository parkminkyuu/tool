import { ImageResponse } from "next/og";
import { locales } from "@/lib/locales";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered text is always English: next/og's default font only covers
// Latin glyphs, and embedding a Hangul-capable font would require a
// network fetch (or bundling a large font file) at build time.
const TAGLINE = "Free browser-based tools. No signup, no install.";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0f172a",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#ef4444",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 700, color: "#e2e8f0" }}>
            Toolbox
          </div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, marginTop: 40, display: "flex" }}>
          Free Web Tools
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 20,
            color: "#94a3b8",
            maxWidth: 920,
            display: "flex",
          }}
        >
          {TAGLINE}
        </div>
      </div>
    ),
    { ...size }
  );
}

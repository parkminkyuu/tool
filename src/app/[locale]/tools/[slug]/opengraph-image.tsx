import { ImageResponse } from "next/og";
import { locales } from "@/lib/locales";
import { tools, getToolBySlug } from "@/lib/tools-registry";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    tools.map((tool) => ({ locale, slug: tool.slug }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  // Always render the English name: next/og's default font only covers
  // Latin glyphs, and embedding a Hangul-capable font would require a
  // network fetch (or bundling a large font file) at build time.
  const name = tool?.en.name ?? "Toolbox";
  const category = tool?.category ?? "";

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
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#ef4444",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 700, color: "#e2e8f0" }}>
            Toolbox
          </div>
        </div>
        {category && (
          <div
            style={{
              fontSize: 24,
              marginTop: 36,
              color: "#f87171",
              textTransform: "uppercase",
              letterSpacing: 2,
              display: "flex",
            }}
          >
            {category}
          </div>
        )}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            marginTop: 12,
            lineHeight: 1.15,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {name}
        </div>
      </div>
    ),
    { ...size }
  );
}

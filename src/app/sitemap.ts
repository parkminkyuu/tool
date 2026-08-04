import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";

export const dynamic = "force-static";
import { tools } from "@/lib/tools-registry";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${siteUrl}/${locale}`,
      changeFrequency: "weekly",
      priority: 1,
    });
    for (const tool of tools) {
      entries.push({
        url: `${siteUrl}/${locale}/tools/${tool.slug}`,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    entries.push({
      url: `${siteUrl}/${locale}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}

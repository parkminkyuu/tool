import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, siteUrl, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionary";
import { tools, getToolBySlug } from "@/lib/tools-registry";
import { toolComponents } from "@/components/tools/registry";
import AdSlot from "@/components/AdSlot";
import RelatedTools from "@/components/RelatedTools";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    tools.map((tool) => ({ locale, slug: tool.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const t = tool[locale];

  return {
    title: t.name,
    description: t.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/tools/${slug}`,
      languages: {
        ko: `${siteUrl}/ko/tools/${slug}`,
        en: `${siteUrl}/en/tools/${slug}`,
      },
    },
    openGraph: {
      title: t.name,
      description: t.description,
      url: `${siteUrl}/${locale}/tools/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.name,
      description: t.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const dict = getDictionary(locale);
  const t = tool[locale];
  const ToolComponent = toolComponents[slug];

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t.name,
    description: t.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: `${siteUrl}/${locale}/tools/${slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <nav className="text-sm text-slate-500 mb-4">
        <Link href={`/${locale}`} className="hover:text-slate-900">
          {dict.common.backToHome}
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
        <span aria-hidden>{tool.icon}</span>
        {t.name}
      </h1>
      <p className="mt-2 text-slate-600 max-w-2xl">{t.description}</p>

      <AdSlot slot="1111111111" className="my-6 h-24" />

      <div className="mt-6 rounded-lg border border-slate-200 p-4 sm:p-6">
        {ToolComponent ? <ToolComponent locale={locale} /> : null}
      </div>

      <AdSlot slot="2222222222" className="my-10 h-24" />

      <section className="mt-10 max-w-2xl">
        <h2 className="text-lg font-bold text-slate-900 mb-3">{dict.common.howTo}</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
          {t.howTo.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10 max-w-2xl">
        <h2 className="text-lg font-bold text-slate-900 mb-3">{dict.common.faq}</h2>
        <div className="space-y-5">
          {t.faq.map((item, i) => (
            <div key={i}>
              <h3 className="font-medium text-slate-900">{item.q}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools tool={tool} locale={locale} dict={dict} />
    </div>
  );
}

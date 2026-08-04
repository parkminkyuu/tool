import type { Metadata } from "next";
import { isLocale, locales, siteUrl, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionary";
import { toolCategories } from "@/lib/tools-registry";
import CategorySection from "@/components/CategorySection";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.home.heroTitle,
    description: dict.home.heroSubtitle,
    alternates: { canonical: `${siteUrl}/${locale}` },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ko";
  const dict = getDictionary(locale);

  return (
    <div>
      <section className="mb-10 text-center py-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {dict.home.heroTitle}
        </h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          {dict.home.heroSubtitle}
        </p>
      </section>

      <AdSlot slot="0000000000" className="mb-10 h-24" />

      <h2 className="sr-only">{dict.home.categoriesTitle}</h2>
      {toolCategories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          locale={locale}
          dict={dict}
        />
      ))}
    </div>
  );
}

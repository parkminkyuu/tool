import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, siteUrl, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    title: { default: dict.siteName, template: `%s | ${dict.siteName}` },
    description: dict.tagline,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        ko: `${siteUrl}/ko`,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: dict.siteName,
      description: dict.tagline,
      url: `${siteUrl}/${locale}`,
      siteName: dict.siteName,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.siteName,
      description: dict.tagline,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <div className="flex flex-col flex-1" lang={locale}>
      <Header locale={locale} dict={dict} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}

import type { Metadata } from "next";
import { isLocale, locales, siteUrl, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionary";

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
    title: dict.footer.privacy,
    alternates: { canonical: `${siteUrl}/${locale}/privacy` },
  };
}

const content: Record<Locale, { title: string; body: string[] }> = {
  ko: {
    title: "개인정보처리방침",
    body: [
      "본 사이트의 모든 도구는 브라우저(클라이언트) 내에서 동작하며, 사용자가 입력한 텍스트나 이미지 등의 데이터는 서버로 전송되거나 저장되지 않습니다.",
      "본 사이트는 Google AdSense를 통해 광고를 게재할 수 있습니다. Google을 포함한 제3자 공급업체는 쿠키를 사용하여 사용자의 이전 방문 기록을 기반으로 광고를 게재합니다.",
      "Google의 광고 쿠키 사용으로 인해 Google과 파트너는 본 사이트 및/또는 인터넷의 다른 사이트 방문 기록을 기반으로 사용자에게 광고를 게재할 수 있습니다.",
      "사용자는 Google 광고 설정(https://adssettings.google.com)에서 맞춤 광고를 비활성화할 수 있습니다.",
      "본 사이트는 Google Analytics 등 방문자 통계 분석 도구를 사용할 수 있으며, 이 경우에도 쿠키가 사용될 수 있습니다.",
      "문의사항이 있으시면 사이트 운영자에게 연락해 주시기 바랍니다.",
    ],
  },
  en: {
    title: "Privacy Policy",
    body: [
      "All tools on this site run entirely in your browser. Text, images, and other data you enter are never sent to or stored on a server.",
      "This site may display ads served by Google AdSense. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to this website or other websites.",
      "Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.",
      "You may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com).",
      "This site may also use analytics tools such as Google Analytics, which may also set cookies.",
      "If you have any questions, please contact the site operator.",
    ],
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ko";
  const c = content[locale];

  return (
    <article className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">
        {c.title}
      </h1>
      {c.body.map((p, i) => (
        <p key={i} className="text-slate-600 mb-4 leading-relaxed">
          {p}
        </p>
      ))}
    </article>
  );
}

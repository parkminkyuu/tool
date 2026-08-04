import type { Locale } from "./locales";

export type Dictionary = {
  siteName: string;
  tagline: string;
  nav: {
    home: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    categoriesTitle: string;
  };
  categories: {
    text: string;
    image: string;
    calculator: string;
    developer: string;
    instagram: string;
  };
  categoryDescriptions: {
    text: string;
    image: string;
    calculator: string;
    developer: string;
    instagram: string;
  };
  footer: {
    madeWith: string;
    allTools: string;
    privacy: string;
  };
  common: {
    copy: string;
    copied: string;
    clear: string;
    download: string;
    relatedTools: string;
    backToHome: string;
    input: string;
    output: string;
    howTo: string;
    faq: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ko: {
    siteName: "툴박스",
    tagline: "설치 없이 바로 쓰는 무료 웹 도구 모음",
    nav: { home: "홈" },
    home: {
      heroTitle: "설치 없이, 회원가입 없이 바로 쓰는 무료 웹 도구",
      heroSubtitle:
        "글자수 세기부터 JSON 포맷터, 단위 변환기까지. 브라우저에서 즉시 실행되며 데이터는 서버로 전송되지 않습니다.",
      categoriesTitle: "카테고리별 도구",
    },
    categories: {
      text: "텍스트 도구",
      image: "이미지 도구",
      calculator: "계산기 · 변환기",
      developer: "개발자 도구",
      instagram: "인스타그램 도구",
    },
    categoryDescriptions: {
      text: "글자수 세기, 대소문자 변환, 중복 줄 제거 등",
      image: "이미지 압축, 리사이즈 등 브라우저에서 바로 처리",
      calculator: "단위 변환, 퍼센트 계산, BMI 계산 등",
      developer: "JSON 포맷터, Base64, URL 인코더 등",
      instagram: "인스타 폰트 생성기, 언팔 확인, 사이즈 가이드 등",
    },
    footer: {
      madeWith: "모든 도구는 브라우저에서 동작하며 입력한 데이터를 서버로 전송하지 않습니다.",
      allTools: "전체 도구 보기",
      privacy: "개인정보처리방침",
    },
    common: {
      copy: "복사",
      copied: "복사됨!",
      clear: "지우기",
      download: "다운로드",
      relatedTools: "관련 도구",
      backToHome: "홈으로",
      input: "입력",
      output: "결과",
      howTo: "사용법",
      faq: "자주 묻는 질문",
    },
  },
  en: {
    siteName: "Toolbox",
    tagline: "Free web tools you can use instantly, no install required",
    nav: { home: "Home" },
    home: {
      heroTitle: "Free browser-based tools. No signup, no install.",
      heroSubtitle:
        "From word counters to JSON formatters and unit converters — everything runs instantly in your browser and your data never leaves your device.",
      categoriesTitle: "Browse by category",
    },
    categories: {
      text: "Text Tools",
      image: "Image Tools",
      calculator: "Calculators & Converters",
      developer: "Developer Tools",
      instagram: "Instagram Tools",
    },
    categoryDescriptions: {
      text: "Word counter, case converter, remove duplicate lines, and more",
      image: "Compress and resize images directly in your browser",
      calculator: "Unit conversion, percentage calculator, BMI calculator, and more",
      developer: "JSON formatter, Base64, URL encoder, and more",
      instagram: "Font generator, unfollow checker, size guide, and more",
    },
    footer: {
      madeWith: "All tools run in your browser — your data is never sent to a server.",
      allTools: "View all tools",
      privacy: "Privacy Policy",
    },
    common: {
      copy: "Copy",
      copied: "Copied!",
      clear: "Clear",
      download: "Download",
      relatedTools: "Related tools",
      backToHome: "Back to home",
      input: "Input",
      output: "Output",
      howTo: "How to use",
      faq: "Frequently asked questions",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

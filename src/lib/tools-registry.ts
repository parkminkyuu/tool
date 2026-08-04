export type ToolCategory =
  | "instagram"
  | "text"
  | "image"
  | "calculator"
  | "developer";

export type ToolMeta = {
  slug: string;
  category: ToolCategory;
  icon: string;
  ko: { name: string; shortDesc: string; description: string };
  en: { name: string; shortDesc: string; description: string };
};

export const toolCategories: ToolCategory[] = [
  "instagram",
  "text",
  "developer",
  "calculator",
  "image",
];

export const tools: ToolMeta[] = [
  {
    slug: "instagram-font-generator",
    category: "instagram",
    icon: "𝓐",
    ko: {
      name: "인스타 폰트 생성기",
      shortDesc: "굵게, 필기체, 두들체 등 인스타 프로필/게시글용 특수문자 폰트를 만듭니다",
      description:
        "텍스트를 입력하면 굵게, 이탤릭체, 필기체, 고딕체, 동그라미체, 뒤집힌 글자 등 다양한 유니코드 특수문자 폰트로 변환해주는 도구입니다. 변환된 텍스트는 그대로 복사해서 인스타그램 프로필 소개글이나 게시글에 붙여넣을 수 있습니다.",
    },
    en: {
      name: "Instagram Font Generator",
      shortDesc: "Turn plain text into bold, cursive, and other fancy Unicode fonts",
      description:
        "Convert plain text into bold, italic, cursive, gothic, circled, upside-down, and other fancy Unicode fonts for your Instagram bio or captions. Just copy and paste — no app install needed.",
    },
  },
  {
    slug: "instagram-unfollow-checker",
    category: "instagram",
    icon: "👥",
    ko: {
      name: "인스타 언팔 확인하기",
      shortDesc: "맞팔로우 안 하는 계정을 안전하게 확인합니다 (로그인 불필요)",
      description:
        "인스타그램 공식 '정보 다운로드' 기능으로 받은 팔로워/팔로잉 목록 파일(JSON)을 업로드하면, 내가 팔로우하지만 나를 팔로우하지 않는 계정과 그 반대 목록을 브라우저에서 바로 계산해줍니다. 아이디나 비밀번호 입력이 전혀 필요 없고 파일은 서버로 전송되지 않습니다.",
    },
    en: {
      name: "Instagram Unfollow Checker",
      shortDesc: "Find accounts that don't follow you back — no login required",
      description:
        "Upload the followers/following JSON files from Instagram's official 'Download Your Information' export to instantly see who doesn't follow you back, all processed locally in your browser. No username or password required, and your files are never uploaded anywhere.",
    },
  },
  {
    slug: "instagram-size-guide",
    category: "instagram",
    icon: "📏",
    ko: {
      name: "인스타그램 사이즈 가이드",
      shortDesc: "피드, 스토리, 릴스 권장 이미지 규격과 미리보기 크롭 도구",
      description:
        "인스타그램 피드(정사각형/세로형/가로형), 스토리, 릴스, 프로필 사진의 최신 권장 해상도와 비율을 한눈에 확인하고, 이미지를 업로드해 원하는 비율로 미리 크롭 후 다운로드할 수 있는 도구입니다.",
    },
    en: {
      name: "Instagram Size Guide",
      shortDesc: "Recommended image dimensions for feed, story, and reels + crop preview",
      description:
        "Check the latest recommended dimensions and aspect ratios for Instagram feed posts (square/portrait/landscape), stories, reels, and profile pictures — then upload an image to preview a center crop and download it at the right size.",
    },
  },
  {
    slug: "word-counter",
    category: "text",
    icon: "🔤",
    ko: {
      name: "글자수 세기",
      shortDesc: "글자수, 단어수, 바이트수를 실시간으로 계산합니다",
      description:
        "텍스트를 입력하면 공백 포함/제외 글자수, 단어수, 줄 수, 바이트수를 실시간으로 계산해주는 무료 온라인 글자수 세기 도구입니다. 자기소개서, 리포트, SNS 게시글 글자수 제한을 맞출 때 유용합니다.",
    },
    en: {
      name: "Word Counter",
      shortDesc: "Count characters, words, and bytes in real time",
      description:
        "A free online word and character counter. Instantly see character count (with and without spaces), word count, line count, and byte size as you type — handy for essays, resumes, and social media character limits.",
    },
  },
  {
    slug: "case-converter",
    category: "text",
    icon: "🔠",
    ko: {
      name: "대소문자 변환기",
      shortDesc: "대문자, 소문자, 첫글자 대문자 등으로 변환합니다",
      description:
        "영문 텍스트를 대문자, 소문자, 각 단어 첫 글자 대문자(Title Case), 문장 첫 글자만 대문자로 손쉽게 변환하는 도구입니다.",
    },
    en: {
      name: "Case Converter",
      shortDesc: "Convert text to UPPERCASE, lowercase, Title Case, and more",
      description:
        "Convert English text between UPPERCASE, lowercase, Title Case, and Sentence case instantly in your browser.",
    },
  },
  {
    slug: "remove-duplicate-lines",
    category: "text",
    icon: "🧹",
    ko: {
      name: "중복 줄 / 공백 제거기",
      shortDesc: "중복된 줄, 빈 줄, 불필요한 공백을 한 번에 정리합니다",
      description:
        "여러 줄의 텍스트에서 중복된 줄을 제거하고, 빈 줄과 줄 앞뒤 공백을 정리해주는 텍스트 정리 도구입니다. 이메일 목록, 키워드 목록 정리에 유용합니다.",
    },
    en: {
      name: "Remove Duplicate Lines",
      shortDesc: "Clean up duplicate lines, blank lines, and extra whitespace",
      description:
        "Remove duplicate lines, blank lines, and trim extra whitespace from a block of text — useful for cleaning email lists, keyword lists, and CSV-like data.",
    },
  },
  {
    slug: "json-formatter",
    category: "developer",
    icon: "{ }",
    ko: {
      name: "JSON 포맷터 / 뷰어",
      shortDesc: "JSON을 예쁘게 정렬하거나 압축하고 오류를 검사합니다",
      description:
        "압축된 JSON을 읽기 쉽게 들여쓰기(Prettify)하거나, 반대로 한 줄로 압축(Minify)할 수 있는 도구입니다. 문법 오류가 있으면 오류 위치를 알려줍니다.",
    },
    en: {
      name: "JSON Formatter",
      shortDesc: "Pretty-print, minify, and validate JSON",
      description:
        "Format minified JSON into readable, indented output, or compress it into a single line. Invalid JSON is flagged with a clear error message.",
    },
  },
  {
    slug: "base64",
    category: "developer",
    icon: "⇄",
    ko: {
      name: "Base64 인코더 / 디코더",
      shortDesc: "텍스트를 Base64로 인코딩하거나 디코딩합니다",
      description:
        "텍스트를 Base64 형식으로 인코딩하거나, Base64 문자열을 원래 텍스트로 디코딩하는 무료 온라인 도구입니다.",
    },
    en: {
      name: "Base64 Encoder / Decoder",
      shortDesc: "Encode text to Base64 or decode Base64 back to text",
      description:
        "Encode plain text into Base64, or decode a Base64 string back into readable text — all processed locally in your browser.",
    },
  },
  {
    slug: "url-encoder",
    category: "developer",
    icon: "%",
    ko: {
      name: "URL 인코더 / 디코더",
      shortDesc: "URL에 사용할 수 있도록 문자열을 인코딩/디코딩합니다",
      description:
        "한글, 특수문자가 포함된 문자열을 URL에 안전하게 사용할 수 있도록 percent-encoding 하거나, 인코딩된 URL을 원래 문자열로 디코딩합니다.",
    },
    en: {
      name: "URL Encoder / Decoder",
      shortDesc: "Percent-encode or decode strings for use in URLs",
      description:
        "Percent-encode text so it's safe to use inside a URL, or decode an already-encoded URL back into readable text.",
    },
  },
  {
    slug: "unit-converter",
    category: "calculator",
    icon: "📐",
    ko: {
      name: "단위 변환기",
      shortDesc: "길이, 무게, 온도, 부피 단위를 서로 변환합니다",
      description:
        "미터-피트, 킬로그램-파운드, 섭씨-화씨 등 길이, 무게, 온도, 부피 단위를 빠르게 변환할 수 있는 온라인 단위 변환기입니다.",
    },
    en: {
      name: "Unit Converter",
      shortDesc: "Convert length, weight, temperature, and volume units",
      description:
        "Quickly convert between metric and imperial units — meters to feet, kilograms to pounds, Celsius to Fahrenheit, and more.",
    },
  },
  {
    slug: "percentage-calculator",
    category: "calculator",
    icon: "%",
    ko: {
      name: "퍼센트(%) 계산기",
      shortDesc: "할인율, 증감률, 비율을 쉽게 계산합니다",
      description:
        "전체 값에서 특정 비율이 얼마인지, 할인 후 가격, 두 값의 증감률(%)을 계산해주는 퍼센트 계산기입니다.",
    },
    en: {
      name: "Percentage Calculator",
      shortDesc: "Calculate discounts, percentage change, and ratios",
      description:
        "Calculate what percentage one number is of another, find a value after a percentage change, or compute the percentage increase/decrease between two numbers.",
    },
  },
  {
    slug: "bmi-calculator",
    category: "calculator",
    icon: "⚖️",
    ko: {
      name: "BMI 계산기",
      shortDesc: "키와 몸무게로 체질량지수(BMI)를 계산합니다",
      description:
        "키와 몸무게를 입력하면 체질량지수(BMI)를 계산하고 저체중, 정상, 과체중, 비만 등 체중 상태를 알려줍니다.",
    },
    en: {
      name: "BMI Calculator",
      shortDesc: "Calculate Body Mass Index from your height and weight",
      description:
        "Enter your height and weight to calculate your Body Mass Index (BMI) and see which weight category it falls into.",
    },
  },
  {
    slug: "image-compressor",
    category: "image",
    icon: "🖼️",
    ko: {
      name: "이미지 압축 / 리사이즈",
      shortDesc: "이미지 용량을 줄이고 크기를 조절합니다 (브라우저 처리)",
      description:
        "JPG, PNG, WebP 이미지를 브라우저에서 직접 압축하고 크기를 조절하는 도구입니다. 이미지 파일이 서버로 업로드되지 않고 내 컴퓨터에서만 처리됩니다.",
    },
    en: {
      name: "Image Compressor & Resizer",
      shortDesc: "Compress and resize images entirely in your browser",
      description:
        "Compress and resize JPG, PNG, and WebP images directly in your browser. Your images are never uploaded to a server — everything happens on your device.",
    },
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolMeta[] {
  return tools.filter((t) => t.category === category);
}

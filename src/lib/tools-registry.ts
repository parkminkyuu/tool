export type ToolCategory =
  | "instagram"
  | "text"
  | "image"
  | "calculator"
  | "developer";

export type FaqItem = { q: string; a: string };

export type ToolLocaleMeta = {
  name: string;
  shortDesc: string;
  description: string;
  howTo: string[];
  faq: FaqItem[];
};

export type ToolMeta = {
  slug: string;
  category: ToolCategory;
  icon: string;
  ko: ToolLocaleMeta;
  en: ToolLocaleMeta;
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
      howTo: [
        "입력창에 원하는 텍스트를 입력하세요.",
        "아래에 자동으로 생성된 16가지 폰트 스타일을 확인하세요.",
        "원하는 스타일 옆의 '복사' 버튼을 눌러 인스타그램 프로필이나 게시글에 붙여넣으세요.",
      ],
      faq: [
        {
          q: "이 폰트를 인스타그램에 실제로 사용할 수 있나요?",
          a: "네. 이 도구는 일반 알파벳이 아니라 유니코드에 이미 존재하는 특수문자를 조합한 것이라, 복사해서 붙여넣기만 하면 인스타그램뿐 아니라 카카오톡, 트위터(X) 등 어디에서나 그대로 표시됩니다.",
        },
        {
          q: "한글도 변환할 수 있나요?",
          a: "현재는 영문 알파벳(A-Z, a-z)과 숫자만 스타일이 적용되며, 한글과 특수기호는 원래 모양 그대로 유지됩니다.",
        },
        {
          q: "특정 기기에서 폰트가 깨져 보여요.",
          a: "일부 구형 기기나 폰트를 지원하지 않는 앱에서는 유니코드 특수문자가 네모(□)로 표시될 수 있습니다. 대부분의 최신 스마트폰과 인스타그램 앱에서는 정상적으로 보입니다.",
        },
      ],
    },
    en: {
      name: "Instagram Font Generator",
      shortDesc: "Turn plain text into bold, cursive, and other fancy Unicode fonts",
      description:
        "Convert plain text into bold, italic, cursive, gothic, circled, upside-down, and other fancy Unicode fonts for your Instagram bio or captions. Just copy and paste — no app install needed.",
      howTo: [
        "Type your text into the input box.",
        "16 fancy font styles are generated automatically below.",
        "Click 'Copy' next to the style you like and paste it into your Instagram bio or caption.",
      ],
      faq: [
        {
          q: "Will these fonts actually work on Instagram?",
          a: "Yes. These aren't custom fonts — they're existing Unicode characters that just look stylized, so they'll display correctly anywhere Unicode text works, including Instagram, Twitter/X, and most messaging apps.",
        },
        {
          q: "Does it support non-Latin characters?",
          a: "Styling currently applies to Latin letters (A-Z, a-z) and digits. Other characters are left unchanged.",
        },
        {
          q: "Why does the text show as boxes on some devices?",
          a: "A few older devices or apps with limited font support may render some Unicode symbols as boxes (□). Most modern phones and the Instagram app display them correctly.",
        },
      ],
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
      howTo: [
        "인스타그램 앱에서 '정보 다운로드'로 팔로워/팔로잉 JSON 파일을 받습니다.",
        "이 페이지에 followers_1.json과 following.json 두 파일을 각각 업로드합니다.",
        "결과 목록에서 맞팔로우하지 않는 계정을 바로 확인합니다.",
      ],
      faq: [
        {
          q: "아이디와 비밀번호를 입력해야 하나요?",
          a: "아니요. 이 도구는 로그인이 전혀 필요 없습니다. 인스타그램이 공식으로 제공하는 데이터 다운로드 파일만 업로드하면 됩니다.",
        },
        {
          q: "업로드한 파일이 서버에 저장되나요?",
          a: "저장되지 않습니다. 파일은 브라우저 내에서만 읽고 계산되며 외부로 전송되지 않습니다.",
        },
        {
          q: "결과가 실제 인스타그램 앱과 다를 수 있나요?",
          a: "네, 파일을 다운로드한 시점의 스냅샷을 기준으로 계산되므로, 다운로드 이후 팔로우 상태가 바뀌었다면 최신 파일을 다시 받아 업로드해야 정확합니다.",
        },
      ],
    },
    en: {
      name: "Instagram Unfollow Checker",
      shortDesc: "Find accounts that don't follow you back — no login required",
      description:
        "Upload the followers/following JSON files from Instagram's official 'Download Your Information' export to instantly see who doesn't follow you back, all processed locally in your browser. No username or password required, and your files are never uploaded anywhere.",
      howTo: [
        "Request 'Download your information' in the Instagram app and get the followers/following JSON files.",
        "Upload both followers_1.json and following.json on this page.",
        "Instantly see which accounts don't follow you back.",
      ],
      faq: [
        {
          q: "Do I need to enter my username or password?",
          a: "No. This tool never asks for a login — you only upload the official data export files Instagram provides.",
        },
        {
          q: "Are my uploaded files stored anywhere?",
          a: "No. Files are read and compared entirely in your browser and are never sent to a server.",
        },
        {
          q: "Could the results be out of date?",
          a: "Yes — results reflect the snapshot at the time you downloaded your data. Re-download and re-upload for the most current comparison.",
        },
      ],
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
      howTo: [
        "원하는 게시물 형식(정사각형, 세로형, 스토리 등)을 선택합니다.",
        "이미지를 업로드하면 해당 비율로 자동 크롭된 미리보기가 나타납니다.",
        "'다운로드' 버튼으로 인스타그램 권장 해상도에 맞춘 이미지를 저장합니다.",
      ],
      faq: [
        {
          q: "이미지가 서버에 업로드되나요?",
          a: "아니요. 업로드한 이미지는 브라우저 안에서만 처리되며 어디로도 전송되지 않습니다.",
        },
        {
          q: "크롭 위치를 직접 조정할 수 있나요?",
          a: "현재는 이미지 중앙을 기준으로 자동 크롭됩니다. 특정 부분을 강조하고 싶다면 원본 이미지를 미리 잘라서 업로드하는 것을 추천합니다.",
        },
        {
          q: "왜 인스타그램 가로형 게시물은 1.91:1 비율인가요?",
          a: "인스타그램 피드에 표시되는 최대 가로형 비율이 1.91:1이며, 이보다 넓은 이미지는 자동으로 크롭되어 노출됩니다.",
        },
      ],
    },
    en: {
      name: "Instagram Size Guide",
      shortDesc: "Recommended image dimensions for feed, story, and reels + crop preview",
      description:
        "Check the latest recommended dimensions and aspect ratios for Instagram feed posts (square/portrait/landscape), stories, reels, and profile pictures — then upload an image to preview a center crop and download it at the right size.",
      howTo: [
        "Choose the post format you need (square, portrait, story, etc.).",
        "Upload an image to see an automatic center-crop preview at that ratio.",
        "Click 'Download' to save the image at Instagram's recommended resolution.",
      ],
      faq: [
        {
          q: "Is my image uploaded to a server?",
          a: "No — everything is processed locally in your browser and never leaves your device.",
        },
        {
          q: "Can I choose which part of the image gets cropped?",
          a: "The tool currently center-crops automatically. If you need a specific area kept, pre-crop your source image before uploading.",
        },
        {
          q: "Why is the landscape ratio 1.91:1?",
          a: "That's the maximum landscape ratio Instagram's feed displays — wider images get cropped automatically when posted.",
        },
      ],
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
      howTo: [
        "텍스트 상자에 글이나 문장을 입력하거나 붙여넣습니다.",
        "글자수, 단어수, 줄 수, 바이트수가 실시간으로 자동 계산됩니다.",
        "글자수 제한이 있는 곳에 맞춰 텍스트를 조정합니다.",
      ],
      faq: [
        {
          q: "공백도 글자수에 포함되나요?",
          a: "공백 포함 글자수와 공백 제외 글자수를 각각 따로 보여드리므로 목적에 맞게 확인할 수 있습니다.",
        },
        {
          q: "바이트수는 왜 필요한가요?",
          a: "일부 게시판이나 시스템은 글자수가 아니라 바이트(UTF-8 기준)로 입력 제한을 두는 경우가 있어, 한글처럼 1글자가 3바이트를 차지하는 경우를 확인할 때 유용합니다.",
        },
        {
          q: "입력한 텍스트가 저장되나요?",
          a: "저장되지 않습니다. 페이지를 새로고침하면 입력한 내용은 사라지며, 서버로 전송되지도 않습니다.",
        },
      ],
    },
    en: {
      name: "Word Counter",
      shortDesc: "Count characters, words, and bytes in real time",
      description:
        "A free online word and character counter. Instantly see character count (with and without spaces), word count, line count, and byte size as you type — handy for essays, resumes, and social media character limits.",
      howTo: [
        "Type or paste your text into the box.",
        "Character, word, line, and byte counts update automatically as you type.",
        "Adjust your text to fit any character limit you're working with.",
      ],
      faq: [
        {
          q: "Does the character count include spaces?",
          a: "Both counts are shown separately — with spaces and without — so you can check whichever one you need.",
        },
        {
          q: "Why does byte count matter?",
          a: "Some forms and systems limit input by bytes (UTF-8) rather than characters, which matters for non-Latin text where one character can take up multiple bytes.",
        },
        {
          q: "Is my text saved anywhere?",
          a: "No — it's never sent to a server, and refreshing the page clears it.",
        },
      ],
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
      howTo: [
        "변환하고 싶은 영문 텍스트를 입력합니다.",
        "원하는 변환 버튼(대문자, 소문자, Title Case 등)을 클릭합니다.",
        "결과를 복사해서 원하는 곳에 붙여넣습니다.",
      ],
      faq: [
        {
          q: "한글에도 적용되나요?",
          a: "대소문자 변환은 영문 알파벳에만 적용되는 개념이라 한글에는 영향을 주지 않습니다.",
        },
        {
          q: "Title Case와 Sentence case의 차이는 무엇인가요?",
          a: "Title Case는 각 단어의 첫 글자를 대문자로, Sentence case는 문장 전체에서 첫 글자만 대문자로 바꿉니다.",
        },
        {
          q: "변환을 여러 번 적용할 수 있나요?",
          a: "네, 버튼을 순서대로 눌러 원하는 형태가 나올 때까지 계속 변환할 수 있습니다.",
        },
      ],
    },
    en: {
      name: "Case Converter",
      shortDesc: "Convert text to UPPERCASE, lowercase, Title Case, and more",
      description:
        "Convert English text between UPPERCASE, lowercase, Title Case, and Sentence case instantly in your browser.",
      howTo: [
        "Enter the English text you want to convert.",
        "Click the conversion you need — UPPERCASE, lowercase, Title Case, or Sentence case.",
        "Copy the result and paste it wherever you need it.",
      ],
      faq: [
        {
          q: "Does this work on non-English text?",
          a: "Case conversion only affects Latin letters (A-Z, a-z); other scripts are left unchanged.",
        },
        {
          q: "What's the difference between Title Case and Sentence case?",
          a: "Title Case capitalizes the first letter of every word; Sentence case capitalizes only the first letter of the whole sentence.",
        },
        {
          q: "Can I apply multiple conversions in a row?",
          a: "Yes, you can click through the buttons in any order until you get the result you want.",
        },
      ],
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
      howTo: [
        "여러 줄의 텍스트를 입력창에 붙여넣습니다.",
        "필요한 정리 옵션(중복 제거, 빈 줄 제거, 공백 제거, 정렬)을 클릭합니다.",
        "정리된 결과를 복사해서 사용합니다.",
      ],
      faq: [
        {
          q: "대소문자가 다르면 다른 줄로 취급하나요?",
          a: "네, 현재는 대소문자를 구분해서 중복을 판단합니다. 예를 들어 'Apple'과 'apple'은 서로 다른 줄로 처리됩니다.",
        },
        {
          q: "줄 순서가 바뀌나요?",
          a: "중복 제거나 공백 제거는 원래 순서를 유지하지만, '가나다순 정렬' 버튼을 누르면 알파벳/가나다 순으로 재정렬됩니다.",
        },
        {
          q: "엑셀에서 복사한 데이터도 사용할 수 있나요?",
          a: "네, 엑셀이나 구글 시트에서 한 열을 복사해 붙여넣으면 줄바꿈 기준으로 그대로 인식됩니다.",
        },
      ],
    },
    en: {
      name: "Remove Duplicate Lines",
      shortDesc: "Clean up duplicate lines, blank lines, and extra whitespace",
      description:
        "Remove duplicate lines, blank lines, and trim extra whitespace from a block of text — useful for cleaning email lists, keyword lists, and CSV-like data.",
      howTo: [
        "Paste your multi-line text into the box.",
        "Click the cleanup actions you need — remove duplicates, remove blank lines, trim whitespace, or sort.",
        "Copy the cleaned-up result.",
      ],
      faq: [
        {
          q: "Is duplicate detection case-sensitive?",
          a: "Yes, currently 'Apple' and 'apple' are treated as different lines.",
        },
        {
          q: "Does this change the line order?",
          a: "Removing duplicates or blank lines preserves the original order; only 'Sort alphabetically' reorders the lines.",
        },
        {
          q: "Can I paste data copied from Excel?",
          a: "Yes — a column copied from Excel or Google Sheets pastes in as line-separated text automatically.",
        },
      ],
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
      howTo: [
        "압축되거나 정리되지 않은 JSON을 입력창에 붙여넣습니다.",
        "'정렬(Prettify)' 또는 '압축(Minify)' 버튼을 클릭합니다.",
        "문법 오류가 있으면 오류 메시지가 표시되며, 정상이면 결과를 바로 복사할 수 있습니다.",
      ],
      faq: [
        {
          q: "잘못된 JSON을 입력하면 어떻게 되나요?",
          a: "'JSON 오류' 메시지와 함께 어떤 부분이 문제인지 브라우저의 JSON 파서가 알려주는 오류 내용을 그대로 보여줍니다.",
        },
        {
          q: "입력한 JSON이 외부로 전송되나요?",
          a: "아니요. 모든 처리는 브라우저 자체 JSON.parse 기능으로 이루어지며 서버로 전송되지 않습니다.",
        },
        {
          q: "큰 JSON 파일도 처리할 수 있나요?",
          a: "브라우저 메모리 내에서 처리되므로 일반적인 API 응답이나 설정 파일 수준의 크기는 문제없이 처리됩니다.",
        },
      ],
    },
    en: {
      name: "JSON Formatter",
      shortDesc: "Pretty-print, minify, and validate JSON",
      description:
        "Format minified JSON into readable, indented output, or compress it into a single line. Invalid JSON is flagged with a clear error message.",
      howTo: [
        "Paste your minified or messy JSON into the box.",
        "Click 'Prettify' to indent it or 'Minify' to compress it to one line.",
        "If there's a syntax error you'll see exactly what's wrong; otherwise copy the result.",
      ],
      faq: [
        {
          q: "What happens if I paste invalid JSON?",
          a: "You'll see a 'JSON Error' message with the exact error your browser's JSON parser reports, including the problem location.",
        },
        {
          q: "Is my JSON sent anywhere?",
          a: "No — everything runs through the browser's built-in JSON.parse, with nothing sent to a server.",
        },
        {
          q: "Can it handle large JSON files?",
          a: "Since it all runs in browser memory, typical API responses and config files process without issue.",
        },
      ],
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
      howTo: [
        "인코딩할 텍스트 또는 디코딩할 Base64 문자열을 입력합니다.",
        "'인코딩' 또는 '디코딩' 버튼을 클릭합니다.",
        "결과를 복사해서 사용합니다.",
      ],
      faq: [
        {
          q: "Base64는 암호화인가요?",
          a: "아닙니다. Base64는 데이터를 텍스트로 표현하는 인코딩 방식일 뿐 암호화가 아니므로, 민감한 정보를 안전하게 숨기는 용도로 사용하면 안 됩니다.",
        },
        {
          q: "한글도 인코딩할 수 있나요?",
          a: "네, UTF-8 기준으로 한글을 포함한 대부분의 문자를 인코딩/디코딩할 수 있습니다.",
        },
        {
          q: "디코딩이 안 될 때는 어떻게 하나요?",
          a: "입력한 문자열이 올바른 Base64 형식이 아니면 오류 메시지가 표시됩니다. 원본 문자열에 공백이나 줄바꿈이 섞이지 않았는지 확인해주세요.",
        },
      ],
    },
    en: {
      name: "Base64 Encoder / Decoder",
      shortDesc: "Encode text to Base64 or decode Base64 back to text",
      description:
        "Encode plain text into Base64, or decode a Base64 string back into readable text — all processed locally in your browser.",
      howTo: [
        "Enter text to encode, or a Base64 string to decode.",
        "Click 'Encode' or 'Decode'.",
        "Copy the result.",
      ],
      faq: [
        {
          q: "Is Base64 encryption?",
          a: "No — Base64 is just a way to represent data as text, not encryption. Don't use it to protect sensitive information.",
        },
        {
          q: "Does it support non-English text?",
          a: "Yes, it encodes/decodes using UTF-8, so most characters work correctly.",
        },
        {
          q: "Why does decoding fail?",
          a: "You'll get an error if the input isn't valid Base64 — check that there's no accidental whitespace or line breaks mixed into the string.",
        },
      ],
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
      howTo: [
        "인코딩하거나 디코딩할 텍스트/URL을 입력합니다.",
        "'인코딩' 또는 '디코딩' 버튼을 클릭합니다.",
        "결과를 복사해서 URL이나 쿼리 파라미터에 사용합니다.",
      ],
      faq: [
        {
          q: "URL 인코딩은 언제 필요한가요?",
          a: "한글, 공백, 특수문자가 포함된 값을 URL의 쿼리 파라미터 등으로 전달할 때 깨지지 않도록 안전한 형식으로 바꿀 때 필요합니다.",
        },
        {
          q: "전체 URL을 넣어도 되나요?",
          a: "네, 다만 인코딩 시 '://'나 '?', '&' 같은 URL 구조 기호까지 함께 인코딩되니, 쿼리 파라미터 값만 부분적으로 인코딩하고 싶다면 그 값만 따로 입력하는 것을 추천합니다.",
        },
        {
          q: "디코딩할 때 오류가 나요.",
          a: "잘못된 percent-encoding 형식(예: %가 단독으로 있는 경우)이 포함되어 있으면 디코딩할 수 없다는 오류가 표시됩니다.",
        },
      ],
    },
    en: {
      name: "URL Encoder / Decoder",
      shortDesc: "Percent-encode or decode strings for use in URLs",
      description:
        "Percent-encode text so it's safe to use inside a URL, or decode an already-encoded URL back into readable text.",
      howTo: [
        "Enter the text or URL you want to encode or decode.",
        "Click 'Encode' or 'Decode'.",
        "Copy the result for use in a URL or query parameter.",
      ],
      faq: [
        {
          q: "When do I need URL encoding?",
          a: "Whenever a value with spaces, non-ASCII characters, or special symbols needs to be safely passed as part of a URL or query parameter.",
        },
        {
          q: "Can I paste a full URL?",
          a: "Yes, but encoding will also encode structural characters like '://' and '&'. If you only want to encode a single parameter value, paste just that value.",
        },
        {
          q: "Why does decoding fail?",
          a: "You'll see an error if the input contains invalid percent-encoding, such as a stray '%' not followed by two hex digits.",
        },
      ],
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
      howTo: [
        "변환할 단위 종류(길이, 무게, 온도, 부피)를 선택합니다.",
        "값을 입력하고 변환 전/후 단위를 선택합니다.",
        "결과가 실시간으로 계산되어 표시됩니다.",
      ],
      faq: [
        {
          q: "온도 변환은 다른 단위와 계산 방식이 다른가요?",
          a: "네, 길이나 무게는 단순 배율 계산이지만 온도는 섭씨/화씨/켈빈 사이에 별도의 변환 공식이 적용됩니다.",
        },
        {
          q: "소수점은 몇 자리까지 나오나요?",
          a: "결과는 소수점 6자리까지 계산한 뒤 불필요한 0을 제거해서 보여줍니다.",
        },
        {
          q: "새로운 단위를 추가해 줄 수 있나요?",
          a: "현재는 자주 쓰이는 단위 위주로 제공하고 있으며, 필요한 단위가 있다면 추가할 수 있습니다.",
        },
      ],
    },
    en: {
      name: "Unit Converter",
      shortDesc: "Convert length, weight, temperature, and volume units",
      description:
        "Quickly convert between metric and imperial units — meters to feet, kilograms to pounds, Celsius to Fahrenheit, and more.",
      howTo: [
        "Choose the unit category — length, weight, temperature, or volume.",
        "Enter a value and select the units to convert from and to.",
        "The result updates instantly.",
      ],
      faq: [
        {
          q: "Is temperature conversion different from the others?",
          a: "Yes — length and weight use simple multiplication, while temperature uses separate formulas between Celsius, Fahrenheit, and Kelvin.",
        },
        {
          q: "How precise is the result?",
          a: "Results are calculated to 6 decimal places, then trimmed of trailing zeros.",
        },
        {
          q: "Can more units be added?",
          a: "The current set covers the most commonly used units; more can be added on request.",
        },
      ],
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
      howTo: [
        "원하는 계산 유형(비율, 값 계산, 증감률)을 선택합니다.",
        "숫자 두 개를 입력합니다.",
        "결과가 자동으로 계산되어 표시됩니다.",
      ],
      faq: [
        {
          q: "할인율 계산도 가능한가요?",
          a: "네, 'Y의 X%는 얼마인가요?' 모드를 사용하면 정가에서 할인율만큼 뺀 금액을 쉽게 계산할 수 있습니다.",
        },
        {
          q: "증감률 계산에서 음수가 나올 수 있나요?",
          a: "네, 값이 감소한 경우 음수(%)로 표시되어 감소했음을 나타냅니다.",
        },
        {
          q: "0으로 나누면 어떻게 되나요?",
          a: "기준값이 0이면 계산할 수 없으므로 결과가 표시되지 않습니다.",
        },
      ],
    },
    en: {
      name: "Percentage Calculator",
      shortDesc: "Calculate discounts, percentage change, and ratios",
      description:
        "Calculate what percentage one number is of another, find a value after a percentage change, or compute the percentage increase/decrease between two numbers.",
      howTo: [
        "Choose the calculation type — ratio, value, or percentage change.",
        "Enter your two numbers.",
        "The result is calculated automatically.",
      ],
      faq: [
        {
          q: "Can I calculate a discount?",
          a: "Yes — use the 'What is X% of Y?' mode to find the amount after applying a discount percentage.",
        },
        {
          q: "Can the percentage change be negative?",
          a: "Yes, a negative result indicates the value decreased.",
        },
        {
          q: "What happens if I divide by zero?",
          a: "If the base value is 0, no result can be calculated and none is shown.",
        },
      ],
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
      howTo: [
        "키(cm)를 입력합니다.",
        "몸무게(kg)를 입력합니다.",
        "BMI 지수와 체중 상태가 자동으로 계산되어 표시됩니다.",
      ],
      faq: [
        {
          q: "BMI가 정확한 건강 지표인가요?",
          a: "BMI는 키와 몸무게만으로 계산하는 간단한 참고 지표로, 근육량이나 체지방률은 반영하지 않습니다. 정확한 건강 상태 판단은 전문가와 상담하시길 권장합니다.",
        },
        {
          q: "한국과 해외 기준이 다른가요?",
          a: "네, 한국어 화면에서는 아시아-태평양 기준(과체중 23 이상), 영어 화면에서는 세계보건기구(WHO) 일반 기준(과체중 25 이상)을 적용합니다.",
        },
        {
          q: "입력한 키/몸무게 정보가 저장되나요?",
          a: "저장되지 않습니다. 모든 계산은 브라우저에서만 이루어집니다.",
        },
      ],
    },
    en: {
      name: "BMI Calculator",
      shortDesc: "Calculate Body Mass Index from your height and weight",
      description:
        "Enter your height and weight to calculate your Body Mass Index (BMI) and see which weight category it falls into.",
      howTo: [
        "Enter your height in cm.",
        "Enter your weight in kg.",
        "Your BMI and weight category are calculated automatically.",
      ],
      faq: [
        {
          q: "Is BMI an accurate health measure?",
          a: "BMI is a simple reference based only on height and weight — it doesn't account for muscle mass or body fat percentage. Consult a professional for an accurate health assessment.",
        },
        {
          q: "Do the categories differ by region?",
          a: "Yes — the Korean version uses the Asia-Pacific thresholds (overweight from 23), while the English version uses the standard WHO thresholds (overweight from 25).",
        },
        {
          q: "Is my height/weight data stored?",
          a: "No, all calculations happen locally in your browser.",
        },
      ],
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
      howTo: [
        "압축하고 싶은 이미지를 선택하거나 드래그합니다.",
        "품질, 최대 너비, 출력 형식을 조절합니다.",
        "결과 용량을 확인하고 다운로드합니다.",
      ],
      faq: [
        {
          q: "이미지 화질이 많이 나빠지나요?",
          a: "품질 슬라이더로 압축 정도를 직접 조절할 수 있어, 화질과 파일 크기 사이의 균형을 원하는 대로 맞출 수 있습니다.",
        },
        {
          q: "PNG를 JPG로 바꾸면 용량이 얼마나 줄어드나요?",
          a: "이미지 내용에 따라 다르지만, 사진처럼 색상이 많은 이미지는 PNG보다 JPG나 WebP로 변환했을 때 용량이 크게 줄어드는 경우가 많습니다.",
        },
        {
          q: "원본 이미지가 서버에 업로드되나요?",
          a: "아니요. 모든 압축과 리사이즈는 브라우저의 canvas 기능으로 처리되며 이미지가 외부로 전송되지 않습니다.",
        },
      ],
    },
    en: {
      name: "Image Compressor & Resizer",
      shortDesc: "Compress and resize images entirely in your browser",
      description:
        "Compress and resize JPG, PNG, and WebP images directly in your browser. Your images are never uploaded to a server — everything happens on your device.",
      howTo: [
        "Choose or drag in the image you want to compress.",
        "Adjust quality, max width, and output format.",
        "Check the resulting file size and download.",
      ],
      faq: [
        {
          q: "How much does image quality degrade?",
          a: "You control the quality slider directly, so you can balance file size against visual quality however you like.",
        },
        {
          q: "How much smaller does PNG get as JPG?",
          a: "It depends on the image, but photos with lots of colors usually shrink significantly more as JPG or WebP than as PNG.",
        },
        {
          q: "Is my original image uploaded to a server?",
          a: "No — all compression and resizing happens locally using the browser's canvas API; nothing is uploaded anywhere.",
        },
      ],
    },
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolMeta[] {
  return tools.filter((t) => t.category === category);
}

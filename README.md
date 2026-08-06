# 툴박스 (Toolbox) — 무료 웹 도구 모음

트래픽 유입과 Google AdSense 수익화를 목표로 만든 정적 웹 도구 사이트입니다.
글자수 세기, JSON 포맷터, 단위 변환기 등 자주 검색되는 실용 도구를 브라우저에서
바로 실행되는 형태로 제공합니다. 모든 도구는 클라이언트 사이드에서 동작하며
사용자 입력 데이터를 서버로 전송하지 않습니다.

- 프레임워크: Next.js (App Router, `output: "export"` 정적 빌드)
- 스타일: Tailwind CSS
- 다국어: 한국어(`/ko`), 영어(`/en`)

## 로컬 개발

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다. (루트 `/` 접속 시 `/ko`로 리다이렉트)

## 정적 빌드

```bash
npm run build
```

`out/` 디렉토리에 정적 파일이 생성됩니다. 이 폴더를 그대로 정적 호스팅에
업로드하면 됩니다 (Vercel, Netlify, GitHub Pages, Cloudflare Pages 등).

## 환경 변수

`.env.example`을 참고해 `.env.local`을 만드세요.

| 변수 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 배포될 실제 도메인 (사이트맵/canonical/OG 태그에 사용) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense 승인 후 발급되는 게시자 ID (`ca-pub-...`). 비워두면 광고 자리에 플레이스홀더 박스가 표시됩니다 |

## 새 도구 추가하는 방법

1. `src/lib/tools-registry.ts`에 슬러그/카테고리/한국어·영어 이름/설명을 추가합니다.
2. `src/components/tools/`에 도구 UI를 구현하는 클라이언트 컴포넌트를 추가합니다.
3. `src/components/tools/registry.tsx`에 슬러그 → 컴포넌트 매핑을 추가합니다.
4. `npm run build`로 정적 페이지가 정상 생성되는지 확인합니다.

라우트, 메타데이터(SEO), 사이트맵, 관련 도구 섹션은 등록된 정보를 기반으로
자동 생성됩니다.

## 매년 업데이트가 필요한 값

한국 특화 계산기 중 일부는 매년 바뀌는 법정 수치를 기본값으로 사용합니다.
연초에 아래 값을 확인해서 업데이트하세요.

- `WeeklyHolidayPayCalculator.tsx`의 시급 기본값 (매년 1월 최저임금 고시)
- `MilitaryDischargeCalculator.tsx`의 군종별 복무기간 (병역법 개정 시)
- `tools-registry.ts`의 `weekly-holiday-pay-calculator` 설명/FAQ에 적힌 연도·금액 문구

## 주가 데이터 파이프라인 (그때 샀더라면 계산기)

`investment-time-machine` 도구는 국내외 주요 종목의 월별 종가 데이터를
`src/data/stock-prices.json`에서 읽어 정적으로 렌더링합니다. 이 사이트는
서버가 없는 완전 정적 구조라, 데이터는 브라우저가 아니라 GitHub Actions에서
받아옵니다 (Yahoo Finance는 브라우저의 직접 호출(CORS)을 막아두었고, API 키가
필요한 다른 무료 API들은 클라이언트에 키를 노출하면 방문자 전체가 같은
키/한도를 공유하게 되는 문제가 있습니다).

- 데이터 수집 스크립트: `scripts/fetch-stock-data.mjs` (Yahoo Finance 공개
  차트 API 사용, Node 환경에서 실행 — 로컬에서 직접 돌리려면
  `npm run fetch-stock-data`)
- 자동화: `.github/workflows/update-stock-data.yml`이 매주 일요일(UTC 18:00,
  KST 기준 월요일 새벽)에 자동 실행되어 데이터를 갱신하고 변경 사항이 있으면
  커밋·푸시합니다. GitHub Actions 저장소 설정에서 수동 실행(`workflow_dispatch`)도
  가능합니다.
- 종목을 추가/변경하려면 `scripts/fetch-stock-data.mjs`의 `TICKERS` 배열을
  수정한 뒤 스크립트를 실행하세요 (심볼은 Yahoo Finance 표기 기준, 코스피
  종목은 `.KS` 접미사).
- `src/data/stock-prices.json`이 아직 비어 있거나(`prices: []`) 오래됐다면
  워크플로가 최소 한 번 실행될 때까지 기다리거나 수동으로 실행하세요.

## 트래픽 · SEO 체크리스트

- [x] 도구별 개별 URL + `title`/`description`/canonical/hreflang 메타데이터
- [x] 카카오톡/트위터/페이스북 공유용 OpenGraph 태그 + `opengraph-image` 동적 생성(페이지별 1200x630 이미지, 빌드 시 정적 생성)
- [x] `sitemap.xml`, `robots.txt` 자동 생성
- [x] 도구 페이지에 `SoftwareApplication` + `FAQPage` JSON-LD 구조화 데이터
- [x] 도구마다 사용법(`<h2>`)·FAQ(`<h2>`/`<h3>`) 섹션을 SSG 시점에 HTML로 출력 (얇은 콘텐츠 방지, 크롤러가 텍스트로 바로 읽음)
- [x] `next/font`(Noto Sans KR, self-hosted)로 FOUT/FOIT 방지, `next/image`로 결과 미리보기 이미지 최적화
- [x] Lighthouse 실측: 데스크톱 Performance/SEO/Accessibility/Best Practices 100점, 모바일 Performance 90점 (`/ko/tools/word-counter` 기준, 로컬 정적 서버 측정)
- [ ] 실제 도메인 연결 후 `NEXT_PUBLIC_SITE_URL` 설정
- [ ] Google Search Console 등록 및 사이트맵 제출
- [ ] 콘텐츠(도구 설명, FAQ 등) 지속적으로 보강해 검색 유입 확대

> 모바일 Performance 점수는 Lighthouse의 저사양 CPU/느린 네트워크 시뮬레이션 기준이며, 실제 CDN(예: Vercel Edge Network)에 배포하면 이보다 개선될 가능성이 높습니다.

## Google AdSense 연동 방법

AdSense는 **실제 배포된 도메인**에서만 승인 심사가 가능합니다. 아래 순서를 따르세요.

1. 사이트를 실제 도메인에 배포합니다 (Vercel/Netlify 등).
2. [Google AdSense](https://adsense.google.com)에 가입 후 사이트를 등록하고 심사를 요청합니다.
   - 콘텐츠가 충분하고, 개인정보처리방침 페이지(`/ko/privacy`, `/en/privacy`)가 있어야 승인 가능성이 높아집니다.
3. 승인 후 발급되는 게시자 ID(`ca-pub-XXXXXXXXXXXXXXXX`)를 `NEXT_PUBLIC_ADSENSE_CLIENT` 환경 변수에 설정합니다.
4. `public/ads.txt`의 주석을 해제하고 `pub-XXXXXXXXXXXXXXXX`를 실제 게시자 ID로 교체합니다.
5. 다시 빌드/배포하면 홈페이지와 각 도구 페이지의 광고 슬롯(`AdSlot` 컴포넌트)에 실제 광고가 표시됩니다.

광고 슬롯 위치는 `src/app/[locale]/page.tsx`, `src/app/[locale]/tools/[slug]/page.tsx`의
`<AdSlot />` 컴포넌트에서 조정할 수 있습니다. AdSense 정책상 클릭 유도 문구나
과도한 광고 배치는 계정 정지 사유가 되므로 [AdSense 프로그램 정책](https://support.google.com/adsense/answer/48182)을
반드시 준수하세요.

## 배포 (Vercel 예시)

```bash
npm run build
```

Vercel에 GitHub 저장소를 연결하면 `next build`가 자동 실행되고 정적 출력이 배포됩니다.
다른 정적 호스팅을 사용할 경우 `out/` 폴더를 업로드하세요.

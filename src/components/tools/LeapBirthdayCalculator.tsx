"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    birthYear: "출생연도",
    intlAge: "만 나이",
    nextRealBirthday: "다음 진짜 생일 (2월 29일)",
    ddayLabel: "디데이",
    convention: "평년 기념일 관례",
    conventionText:
      "법적으로 정해진 규정은 없지만, 평년에는 보통 2월 28일 또는 3월 1일을 생일로 기념합니다.",
    ageNote:
      "만 나이는 민법의 기간 계산 원칙에 따라 계산되며, 이 도구의 만 나이 결과는 평년에는 3월 1일에 나이가 늘어나는 것으로 계산됩니다.",
  },
  en: {
    birthYear: "Birth year",
    intlAge: "International age (man-nai)",
    nextRealBirthday: "Next real birthday (Feb 29)",
    ddayLabel: "D-day",
    convention: "Common non-leap-year observance",
    conventionText:
      "There's no single legal rule, but people born on Feb 29 usually celebrate on either Feb 28 or March 1 in non-leap years.",
    ageNote:
      "Age here follows Korean Civil Code's period-calculation principle, under which this tool treats the age as incrementing on March 1st in non-leap years.",
  },
} as const;

function isLeapYear(y: number) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

export default function LeapBirthdayCalculator({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [birthYear, setBirthYear] = useState("2000");

  const result = useMemo(() => {
    const by = parseInt(birthYear, 10);
    if (isNaN(by) || by < 1900 || by > 2100) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ty = today.getFullYear();
    const tm = today.getMonth() + 1;
    const td = today.getDate();

    // Next actual Feb 29: this year if today is on/before Feb 29 of a leap
    // year, otherwise the next leap year after this year.
    let nextLeapYear = ty;
    if (!(isLeapYear(ty) && (tm < 2 || (tm === 2 && td <= 29)))) {
      nextLeapYear = ty + 1;
      while (!isLeapYear(nextLeapYear)) nextLeapYear++;
    }
    const nextBirthday = new Date(nextLeapYear, 1, 29);
    const remainingDays = Math.round(
      (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Same "has the birthday passed this year" logic as the general age
    // calculator: since Feb only has 28 days in non-leap years, this
    // naturally resolves to the age incrementing on March 1st.
    let intlAge = ty - by;
    const hadBirthdayThisYear = tm > 2 || (tm === 2 && td >= 29);
    if (!hadBirthdayThisYear) intlAge -= 1;

    return { intlAge, nextLeapYear, remainingDays };
  }, [birthYear]);

  return (
    <div>
      <div>
        <label className="block text-xs text-slate-500 mb-1">{t.birthYear}</label>
        <input
          type="number"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          className="w-full sm:w-48 rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      {result && (
        <>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-md border border-slate-200 p-4 text-center">
              <div className="text-3xl font-extrabold text-slate-900">
                {result.intlAge}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.intlAge}</div>
            </div>
            <div className="rounded-md border border-slate-200 p-4 text-center">
              <div className="text-2xl font-extrabold text-slate-900">
                {result.nextLeapYear}.02.29
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {t.nextRealBirthday} · D-{result.remainingDays}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-slate-50 border border-slate-200 p-3">
            <div className="text-sm font-medium text-slate-700">{t.convention}</div>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              {t.conventionText}
            </p>
          </div>

          <p className="mt-4 text-xs text-slate-500 leading-relaxed">{t.ageNote}</p>
        </>
      )}
    </div>
  );
}

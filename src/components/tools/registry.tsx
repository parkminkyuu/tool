import type { ComponentType } from "react";
import type { Locale } from "@/lib/locales";
import WordCounter from "./WordCounter";
import CaseConverter from "./CaseConverter";
import LineDedupe from "./LineDedupe";
import JsonFormatter from "./JsonFormatter";
import Base64Tool from "./Base64Tool";
import UrlEncoderTool from "./UrlEncoderTool";
import UnitConverter from "./UnitConverter";
import PercentageCalculator from "./PercentageCalculator";
import BmiCalculator from "./BmiCalculator";
import ImageCompressor from "./ImageCompressor";
import InstagramFontGenerator from "./InstagramFontGenerator";
import InstagramUnfollowChecker from "./InstagramUnfollowChecker";
import InstagramSizeGuide from "./InstagramSizeGuide";
import KoreanAgeCalculator from "./KoreanAgeCalculator";
import JeonseRentConverter from "./JeonseRentConverter";
import PyeongSqmConverter from "./PyeongSqmConverter";
import MilitaryDischargeCalculator from "./MilitaryDischargeCalculator";
import WeeklyHolidayPayCalculator from "./WeeklyHolidayPayCalculator";
import SchoolGradeCalculator from "./SchoolGradeCalculator";
import LeapBirthdayCalculator from "./LeapBirthdayCalculator";
import VolumetricWeightCalculator from "./VolumetricWeightCalculator";
import ChosungConverter from "./ChosungConverter";
import AnnualLeaveDaysCalculator from "./AnnualLeaveDaysCalculator";
import InvestmentTimeMachine from "./InvestmentTimeMachine";

export const toolComponents: Record<
  string,
  ComponentType<{ locale: Locale }>
> = {
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "remove-duplicate-lines": LineDedupe,
  "json-formatter": JsonFormatter,
  base64: Base64Tool,
  "url-encoder": UrlEncoderTool,
  "unit-converter": UnitConverter,
  "percentage-calculator": PercentageCalculator,
  "bmi-calculator": BmiCalculator,
  "image-compressor": ImageCompressor,
  "instagram-font-generator": InstagramFontGenerator,
  "instagram-unfollow-checker": InstagramUnfollowChecker,
  "instagram-size-guide": InstagramSizeGuide,
  "korean-age-calculator": KoreanAgeCalculator,
  "jeonse-rent-converter": JeonseRentConverter,
  "pyeong-sqm-converter": PyeongSqmConverter,
  "military-discharge-calculator": MilitaryDischargeCalculator,
  "weekly-holiday-pay-calculator": WeeklyHolidayPayCalculator,
  "school-grade-calculator": SchoolGradeCalculator,
  "leap-birthday-calculator": LeapBirthdayCalculator,
  "volumetric-weight-calculator": VolumetricWeightCalculator,
  "chosung-converter": ChosungConverter,
  "annual-leave-days-calculator": AnnualLeaveDaysCalculator,
  "investment-time-machine": InvestmentTimeMachine,
};

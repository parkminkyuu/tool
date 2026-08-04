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
};

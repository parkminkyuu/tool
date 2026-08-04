"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export default function AdSlot({
  slot,
  className = "",
  format = "auto",
}: {
  slot: string;
  className?: string;
  format?: string;
}) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!adsenseClient || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // adsbygoogle script not yet loaded; ignore
    }
  }, []);

  if (!adsenseClient) {
    return (
      <div
        className={`flex items-center justify-center border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400 rounded-md min-h-24 ${className}`}
        aria-hidden
      >
        Ad Placeholder
      </div>
    );
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={adsenseClient}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}

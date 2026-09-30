"use client";
import React from "react";
import { SECTIONS_TICKER } from "@/lib/site";

export default function Ticker() {
  const items = [...SECTIONS_TICKER, ...SECTIONS_TICKER];
  return (
    <div className="relative z-10 -mt-px overflow-hidden border-y border-white/10 bg-navy py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-[13px] font-medium tracking-[0.2em] text-white/70">
              РАЗДЕЛ <span className="text-amber">{s}</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

import React from "react";

/**
 * Знак «Раздел Проект»: стопка слоёв — разделы проектной документации.
 * Векторный, поэтому одинаково чёткий в шапке, в подвале и на ретине.
 * light=true — для тёмного фона, light=false — для светлого.
 */
export default function Logo({
  light = true,
  className = "",
  size = "md",
}: {
  light?: boolean;
  className?: string;
  size?: "sm" | "md";
}) {
  const gold = light ? "#edbf55" : "#9b7126";
  const ink = light ? "#ffffff" : "#101a33";
  const mark = size === "sm" ? 34 : 42;

  return (
    <span className={"inline-flex items-center gap-2.5 " + className}>
      <svg width={mark} height={mark} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="1" y="1" width="38" height="38" rx="11" stroke={gold} strokeWidth="1.5" opacity="0.55" />
        {/* верхний раздел — заполненный */}
        <path d="M20 8.2 31.4 14.4 20 20.6 8.6 14.4 20 8.2Z" fill={gold} />
        {/* следующие разделы — контуром */}
        <path d="M8.6 19.6 20 25.8 31.4 19.6" stroke={ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        <path d="M8.6 24.8 20 31 31.4 24.8" stroke={ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={"font-display font-bold tracking-[0.015em] " + (size === "sm" ? "text-[15px]" : "text-[18px]")}
          style={{ color: ink }}
        >
          РАЗДЕЛ
        </span>
        <span
          className={"mt-[5px] font-semibold uppercase " + (size === "sm" ? "text-[9px]" : "text-[10px]")}
          style={{ color: gold, letterSpacing: size === "sm" ? "0.26em" : "0.305em" }}
        >
          Проект
        </span>
      </span>
    </span>
  );
}

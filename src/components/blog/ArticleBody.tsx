import React from "react";
import { Lightbulb, Quote } from "lucide-react";
import type { Block } from "@/lib/posts";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i} className="mb-5 text-[17px] leading-[1.75] text-[#2b3140]">
                {b.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)} className="font-display mb-4 mt-12 scroll-mt-28 text-[24px] font-semibold leading-tight text-ink md:text-[28px]">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="font-display mb-3 mt-8 text-[19px] font-semibold leading-tight text-ink">
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="mb-6 space-y-2.5">
                {b.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-[16px] leading-relaxed text-[#2b3140]">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mb-6 space-y-3">
                {b.items.map((it, n) => (
                  <li key={it} className="flex items-start gap-3 text-[16px] leading-relaxed text-[#2b3140]">
                    <span className="font-display mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-[12px] font-bold text-amber">
                      {n + 1}
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="mb-8 overflow-x-auto rounded-2xl border border-black/5">
                <table className="w-full min-w-[560px] text-left text-[14px]">
                  <thead className="bg-navy text-white">
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} className="px-4 py-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, ri) => (
                      <tr key={ri} className={ri % 2 ? "bg-paper" : "bg-white"}>
                        {r.map((c, ci) => (
                          <td key={ci} className={"px-4 py-3 align-top text-[#2b3140] " + (ci === 0 ? "font-semibold text-ink" : "")}>
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "tip":
            return (
              <div key={i} className="mb-8 flex gap-4 rounded-2xl border border-amber/30 bg-amber/10 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber text-navy">
                  <Lightbulb size={18} />
                </div>
                <div>
                  {b.title && <div className="text-[14px] font-bold text-ink">{b.title}</div>}
                  <p className="mt-1 text-[15px] leading-relaxed text-[#2b3140]">{b.text}</p>
                </div>
              </div>
            );
          case "quote":
            return (
              <blockquote key={i} className="mb-8 rounded-2xl border-l-4 border-amber bg-paper p-6">
                <Quote size={20} className="text-amber" />
                <p className="font-display mt-3 text-[18px] font-medium leading-snug text-ink">{b.text}</p>
                {b.who && <div className="mt-3 text-[13px] text-muted">— {b.who}</div>}
              </blockquote>
            );
        }
      })}
    </div>
  );
}

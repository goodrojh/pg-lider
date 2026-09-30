"use client";
import React from "react";
import { MessageCircle, Phone, ListOrdered } from "lucide-react";
import { SITE, asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";

export default function ArticleAside({ toc, title }: { toc: { id: string; text: string }[]; title: string }) {
  const { open } = useLead();
  return (
    <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
      {toc.length > 0 && (
        <nav className="rounded-2xl border border-black/5 bg-paper p-5">
          <div className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-muted">
            <ListOrdered size={14} className="text-amber-dark" /> Содержание
          </div>
          <ol className="space-y-2">
            {toc.map((h) => (
              <li key={h.id}>
                <a href={"#" + h.id} className="block text-[13px] leading-snug text-[#3b4150] transition hover:text-ink">
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="relative overflow-hidden rounded-2xl bg-navy p-5 text-white blueprint-grid">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber/30 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <img loading="lazy" decoding="async" src={asset("/img/logo.png")} alt="ГИП" className="h-12 w-12 rounded-full border-2 border-white/20 bg-white object-contain p-1.5" />
          <div>
            <div className="text-[14px] font-bold">ГИП проектной группы «ЛИДЕР»</div>
            <div className="text-[12px] text-white/60">Главный инженер проекта</div>
          </div>
        </div>
        <p className="relative mt-4 text-[14px] leading-relaxed text-white/75">
          Есть вопрос по вашему объекту? Отвечу по телефону за 15 минут — бесплатно.
        </p>
        <button
          onClick={() =>
            open({
              intent: "article-aside",
              title: "Вопрос ГИПу по статье",
              subtitle: `«${title}» — задайте вопрос, перезвоню и отвечу.`,
              fields: ["name", "phone", "comment"],
              submitLabel: "Задать вопрос",
            })
          }
          className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-amber px-4 py-3 text-[14px] font-bold text-navy transition hover:bg-amber-dark"
        >
          <MessageCircle size={16} /> Задать вопрос
        </button>
        <a href={SITE.phoneHref} className="relative mt-3 flex items-center justify-center gap-2 text-[14px] font-semibold text-white/85">
          <Phone size={14} className="text-amber" /> {SITE.phone}
        </a>
      </div>
    </aside>
  );
}

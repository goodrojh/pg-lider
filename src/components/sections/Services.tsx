"use client";
import React from "react";
import { motion } from "framer-motion";
import { Building2, ClipboardCheck, MapPinned, Workflow, Landmark, BadgeCheck, ArrowUpRight, Check, BookOpen } from "lucide-react";
import Link from "next/link";
import { SERVICES, type ServiceId } from "@/lib/site";
import { postsForService } from "@/lib/posts";
import { useLead } from "@/components/ui/ModalProvider";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS = [Building2, ClipboardCheck, MapPinned, Workflow, Landmark, BadgeCheck];

export default function Services() {
  const { open } = useLead();
  return (
    <section id="services" className="relative w-full bg-paper px-4 py-[90px] md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          align="left"
          title="Что мы делаем"
          text="Четыре основных направления и два сопутствующих. Смету и график по вашему объекту присылаем за 24 часа после получения исходных данных."
          action={
            <button
              onClick={() =>
                open({
                  intent: "services-all",
                  title: "Не нашли свою задачу?",
                  subtitle: "Опишите объект в двух словах — скажем, беремся ли, и сколько это стоит.",
                  fields: ["name", "phone", "comment"],
                  submitLabel: "Отправить задачу",
                })
              }
              className="shrink-0 rounded-full bg-navy px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-navy-2"
            >
              Другая задача →
            </button>
          }
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i];
            const related = postsForService(s.id as ServiceId);
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_2px_12px_rgba(10,22,40,0.04)] transition-all hover:shadow-[0_16px_40px_rgba(10,22,40,0.10)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-amber/35 via-amber/15 to-amber/5 text-amber-dark ring-1 ring-amber/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    <Icon size={26} strokeWidth={1.6} />
                  </div>
                  <span className="rounded-full bg-paper px-3 py-1 text-[11px] font-bold text-muted">{s.term}</span>
                </div>
                <h3 className="font-display mt-5 text-[19px] font-semibold leading-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-[13px] text-gray-700">
                      <Check size={14} className="mt-0.5 shrink-0 text-amber-dark" strokeWidth={3} />
                      {it}
                    </li>
                  ))}
                </ul>
                {related.length > 0 && (
                  <div className="mt-5 rounded-2xl bg-paper p-4">
                    <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                      <BookOpen size={13} className="text-amber-dark" /> Полезно почитать
                    </div>
                    <ul className="space-y-2">
                      {related.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}/`}
                            className="group/link flex items-start gap-2 text-[13px] font-medium leading-snug text-ink transition hover:text-amber-dark"
                          >
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber" />
                            <span className="underline-offset-4 group-hover/link:underline">{post.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-5">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">Стоимость</div>
                    <div className="font-display text-[17px] font-semibold text-ink">{s.price}</div>
                  </div>
                  <button
                    onClick={() =>
                      open({
                        intent: "service-" + s.id,
                        title: s.title,
                        subtitle: "Рассчитаем стоимость и срок именно по этой услуге. Перезвонит профильный инженер.",
                        fields: ["name", "phone", "area", "comment"],
                        submitLabel: "Рассчитать стоимость",
                        prefill: { comment: "Интересует: " + s.title },
                      })
                    }
                    className="flex items-center gap-1.5 rounded-full bg-amber px-4 py-2.5 text-[13px] font-bold text-navy transition group-hover:bg-amber-dark"
                  >
                    Рассчитать <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

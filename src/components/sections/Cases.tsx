"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Award } from "lucide-react";
import { CASES, asset, type CaseTag } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";
import SectionHeading from "@/components/ui/SectionHeading";

const TAGS: ("Все" | CaseTag)[] = ["Все", "Культурное наследие", "Промышленные", "Жилые", "Общественные", "Торговые"];
const STEP = 8;

export default function Cases() {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("Все");
  const [shown, setShown] = useState(STEP);
  const { open } = useLead();

  const filtered = tag === "Все" ? CASES : CASES.filter((c) => c.tag === tag);
  const list = filtered.slice(0, shown);
  const hidden = filtered.length - list.length;

  const pick = (t: (typeof TAGS)[number]) => {
    setTag(t);
    setShown(STEP);
  };

  return (
    <section id="cases" className="relative w-full overflow-hidden bg-navy px-4 py-[80px] text-white blueprint-grid md:px-6 md:py-[110px]">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-amber/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px]">
        <SectionHeading
          align="left"
          dark
          title="Объекты, которые мы спроектировали"
          text={`${CASES.length} объектов из портфолио: заказчик, годы работ и результат по каждому. Полный реестр — по запросу.`}
          action={
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => pick(t)}
                  className={
                    "rounded-full px-4 py-2 text-[13px] font-semibold transition " +
                    (tag === t ? "bg-amber text-navy" : "border border-white/15 bg-white/5 text-white/75 hover:bg-white/10")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          }
        />

        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.article
                layout
                key={c.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/5"
              >
                <div className="relative h-[160px] shrink-0 overflow-hidden">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={asset(c.image)}
                    alt={c.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-navy/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md">
                    {c.tag}
                  </span>
                  <span className="absolute bottom-2.5 left-2.5 right-2.5 line-clamp-2 rounded-lg bg-navy/85 px-2 py-1.5 text-[10.5px] font-semibold leading-tight text-amber backdrop-blur-sm">
                    <Award size={11} className="mr-1 inline align-[-1px]" />
                    {c.result}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-[15px] font-bold leading-snug">{c.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-[12px] leading-snug text-white/55">{c.type}</p>

                  <div className="mt-auto flex items-end justify-between gap-2 border-t border-white/10 pt-3">
                    <div className="min-w-0">
                      <div className="truncate text-[12px] font-semibold text-white/85" title={c.client}>
                        {c.client}
                      </div>
                      <div className="text-[11px] text-white/45">{c.years}</div>
                    </div>
                    <button
                      onClick={() =>
                        open({
                          intent: "case-" + c.id,
                          title: "Похожий объект? Рассчитаем по аналогии",
                          subtitle: `Опираемся на опыт по объекту «${c.title}»: скажем срок и цену для вашего объекта уже на первом звонке.`,
                          fields: ["name", "phone", "comment"],
                          submitLabel: "Рассчитать похожий объект",
                          prefill: { comment: "Похоже на объект: " + c.title },
                        })
                      }
                      aria-label="Рассчитать похожий объект"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-amber transition hover:bg-amber hover:text-navy"
                    >
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {hidden > 0 && (
            <button
              onClick={() => setShown((n) => n + STEP)}
              className="w-full rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Показать ещё {hidden > STEP ? STEP : hidden}
            </button>
          )}
          <button
            onClick={() =>
              open({
                intent: "cases-portfolio",
                title: "Получить полное портфолио",
                subtitle: "Презентация компании: объекты по типам, состав работ, годы и заказчики — включая объекты, которых нет на сайте.",
                fields: ["name", "phone", "email"],
                submitLabel: "Прислать портфолио",
              })
            }
            className="w-full rounded-full bg-amber px-8 py-3.5 text-[15px] font-bold text-navy transition hover:bg-amber-dark sm:w-auto"
          >
            Получить полное портфолио
          </button>
        </div>
      </div>
    </section>
  );
}

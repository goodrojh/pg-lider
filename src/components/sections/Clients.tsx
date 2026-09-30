"use client";
import React from "react";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { PARTNERS, CASES } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLead } from "@/components/ui/ModalProvider";

/** Заказчики из портфолио — по направлениям */
const GROUPS = [
  {
    title: "Промышленность и оборона",
    items: [
      "ПАО «Техприбор» (КРЭТ, Ростех)",
      "ПАО «Яковлев»",
      "АО «ВПК „НПО машиностроения“»",
      "АО «Муромский стрелочный завод»",
      "АО «Карболит»",
      "ФГУП «Авиакомплект»",
      "ООО «НИИЖБ СК»",
    ],
  },
  {
    title: "Государственные учреждения",
    items: [
      "ФГБУ «Санаторий „Марьино“» УДП Президента РФ",
      "ФГБУ «НМИЦ ТПМ» Минздрава России",
      "ФГБУН Институт философии РАН",
      "РГУ нефти и газа им. И.М. Губкина",
      "МГМСУ им. А.И. Евдокимова",
      "Департамент здравоохранения Москвы",
      "Свято-Троицкая Сергиева Лавра",
    ],
  },
  {
    title: "Девелопмент, ритейл, агропром",
    items: [
      "ГК «Русагро»",
      "ООО «СЗ Меридиан»",
      "ООО «ИНОВА» / ООО «Прогресс»",
      "ООО «ИВС-Монтажстрой»",
      "ООО «Морион М»",
      "ООО СК «Перспектива» (ТЦ Moscow Mall)",
      "ООО «ВТБ Арена»",
    ],
  },
];

export default function Clients() {
  const { open } = useLead();
  const heritage = CASES.filter((c) => c.tag === "Культурное наследие").length;

  return (
    <section id="clients" className="w-full bg-white px-4 py-[80px] md:px-6 md:py-[110px]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Нам доверяют"
          text="Сотрудничаем с ведущими компаниями в области девелопмента, ритейла, строительства и промышленного производства, а также с государственными учреждениями и учреждениями культуры."
        />

        {/* Ключевые партнёры */}
        <div className="mb-10 overflow-hidden rounded-[28px] bg-navy p-6 text-white blueprint-grid md:p-8">
          <div className="mb-5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-amber">
            <Handshake size={15} /> Ключевые партнёры
          </div>
          <div className="flex flex-wrap gap-2.5">
            {PARTNERS.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-[14px] font-semibold text-white/90"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Заказчики по направлениям */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08 }}
              className="rounded-[28px] border border-black/5 bg-paper p-6"
            >
              <h3 className="font-display text-[18px] font-semibold text-ink">{g.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[14px] leading-snug text-gray-700">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[24px] border border-black/5 bg-paper p-6 md:flex-row">
          <p className="text-[15px] leading-relaxed text-muted">
            Среди объектов — {heritage} памятников архитектуры федерального и регионального значения, включая объект
            ЮНЕСКО. Полный реестр объектов и контакты для рекомендаций даём по запросу.
          </p>
          <button
            onClick={() =>
              open({
                intent: "clients-references",
                title: "Запросить рекомендации и реестр объектов",
                subtitle: "Пришлём полный список объектов с заказчиками и годами работ, а также контакты для рекомендаций.",
                fields: ["name", "phone", "email"],
                submitLabel: "Запросить",
              })
            }
            className="shrink-0 rounded-full bg-navy px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-navy-2"
          >
            Запросить рекомендации
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useLead } from "@/components/ui/ModalProvider";
import SectionHeading from "@/components/ui/SectionHeading";

const ROWS = [
  { q: "Смета и график", us: "По разделам, за 24 часа", them: "«От 1 500 ₽», после встречи" },
  { q: "Экспертиза", us: "Гарантия в договоре, замечания снимаем сами", them: "«Поможем ответить» за доп. плату" },
  { q: "Коллизии между разделами", us: "Проверка в BIM до выпуска", them: "Находят на стройке" },
  { q: "Сдача работ", us: "Каждые 14 дней, поэтапно", them: "Всё «в конце срока»" },
  { q: "Связь", us: "ГИП по телефону, ответ в течение часа", them: "Менеджер, «передам инженеру»" },
  { q: "Срыв срока", us: "Неустойка 0,1% в день", them: "Без ответственности" },
  { q: "Согласования с сетевыми", us: "Ведём сами по доверенности", them: "«Это на стороне заказчика»" },
];

export default function Compare() {
  const { open } = useLead();
  return (
    <section className="w-full bg-white px-4 py-[80px] md:px-6 md:py-[110px]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Чем мы отличаемся от «обычного проектного бюро»"
          text="Задайте эти семь вопросов любому подрядчику до подписания договора. Ответы многое расскажут."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[28px] border border-black/5 shadow-[0_16px_50px_rgba(10,22,40,0.08)]"
        >
          <div className="hidden grid-cols-[1.2fr_1.4fr_1.2fr] bg-navy text-white md:grid">
            <div className="px-6 py-5 text-[12px] font-bold uppercase tracking-wider text-white/60">Критерий</div>
            <div className="bg-amber px-6 py-5 text-[13px] font-bold uppercase tracking-wider text-navy">ИСМ</div>
            <div className="px-6 py-5 text-[12px] font-bold uppercase tracking-wider text-white/60">Обычное бюро</div>
          </div>
          {ROWS.map((r, i) => (
            <motion.div
              key={r.q}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={"grid grid-cols-1 md:grid-cols-[1.2fr_1.4fr_1.2fr] " + (i % 2 ? "bg-paper" : "bg-white")}
            >
              <div className="px-6 pt-5 text-[13px] font-bold uppercase tracking-wide text-muted md:py-5 md:text-[14px] md:normal-case md:tracking-normal md:text-ink">
                {r.q}
              </div>
              <div className="flex items-start gap-3 px-6 py-3 text-[15px] font-semibold text-ink md:bg-amber/10 md:py-5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber text-navy">
                  <Check size={12} strokeWidth={3} />
                </span>
                {r.us}
              </div>
              <div className="flex items-start gap-3 px-6 pb-5 text-[14px] text-muted md:py-5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                  <X size={12} strokeWidth={3} />
                </span>
                {r.them}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() =>
              open({
                intent: "compare-contract",
                title: "Получить шаблон договора с гарантиями",
                subtitle: "Пришлём типовой договор с пунктами о неустойке, экспертизе и поэтапной сдаче — сравните с вашим текущим подрядчиком.",
                fields: ["name", "phone", "email"],
                submitLabel: "Прислать договор",
              })
            }
            className="rounded-full bg-navy px-8 py-4 text-[15px] font-semibold text-white transition hover:bg-navy-2"
          >
            Получить шаблон договора с гарантиями
          </button>
        </div>
      </div>
    </section>
  );
}

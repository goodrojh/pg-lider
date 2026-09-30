"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FileCheck2, Ruler, Check, Layers3, CalendarCheck2, AlertTriangle, ShieldCheck } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";
import SectionHeading from "@/components/ui/SectionHeading";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

const GANTT = [
  { name: "АР", start: 0, len: 30, color: "bg-amber" },
  { name: "КР", start: 10, len: 35, color: "bg-cyan" },
  { name: "ОВ / ВК", start: 25, len: 30, color: "bg-blue" },
  { name: "ЭОМ / СС", start: 30, len: 30, color: "bg-amber" },
  { name: "Экспертиза", start: 62, len: 38, color: "bg-navy" },
];

export default function Features() {
  const { open } = useLead();
  return (
    <section id="features" className="relative w-full overflow-hidden bg-white px-4 py-[90px] md:px-6 md:py-[140px]">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-amber/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-y-1/2 rounded-full bg-cyan/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <SectionHeading
          title="Почему заказчики возвращаются"
          text="С 2018 года команда выполнила более 150 крупных проектов — от производственных корпусов оборонных предприятий до реставрации памятников федерального значения. Вот что за этим стоит."
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-5 md:grid-cols-2"
      >
        {/* CARD 1 — full cycle */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="group relative flex min-h-[460px] flex-col gap-10 overflow-hidden rounded-[32px] border border-gray-200 p-6"
        >
          <div className="absolute inset-0 z-0">
            <img loading="lazy" decoding="async"
              src={asset("/img/office.webp")}
              alt="Инженеры проверяют разделы проекта"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/30 to-navy/80" />
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-[26px] font-semibold leading-[1.1] tracking-tight text-white drop-shadow-lg md:text-4xl">
              Один подрядчик <br />
              <span className="italic text-amber">от изысканий до ввода</span>
            </h3>
            <p className="mt-3 max-w-[450px] text-[15px] leading-relaxed text-white/90 drop-shadow-md">
              Изыскания, обследование, проектирование, экспертиза, авторский надзор и ввод в эксплуатацию — в одном
              договоре. Один ГИП отвечает за объект целиком.
            </p>
          </div>
          <div className="relative z-10 mt-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { icon: FileCheck2, t: "Стадия П", d: "Полный состав по ПП №87. Экспертиза и разрешение на строительство." },
              { icon: Ruler, t: "Стадия Р", d: "Чертежи, узлы, спецификации. По ним реально строят без вопросов." },
            ].map((c) => (
              <div
                key={c.t}
                className="group/item flex flex-col gap-4 rounded-[24px] border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all hover:bg-white/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md transition-transform group-hover/item:scale-110">
                  <c.icon className="h-6 w-6 text-amber" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white">{c.t}</span>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/75">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CARD 2 — expertise first time */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="relative flex min-h-[460px] flex-col overflow-hidden rounded-[32px] border border-gray-200 bg-white p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber/15 via-paper to-cyan/10" />
          <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-amber/20 blur-[80px]" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-cyan/20 blur-[60px]" />

          <div className="relative z-10 flex w-full flex-1 select-none flex-col items-center justify-center py-6">
            <div className="w-full max-w-[300px] rounded-[24px] border border-white/70 bg-white/50 p-6 shadow-2xl shadow-amber/10 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Замечания экспертизы</span>
                <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-bold text-white">Заход 1</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Раздел КР", n: 0 },
                  { label: "Разделы ИОС", n: 0 },
                  { label: "Раздел ПБ", n: 0 },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.12 }}
                    className="flex items-center justify-between rounded-xl border border-white/60 bg-white/85 p-3 shadow-sm"
                  >
                    <span className="text-xs font-medium text-gray-700">{item.label}</span>
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                      <Check size={12} strokeWidth={3} /> {item.n} замечаний
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="mt-6 flex items-center gap-3 rounded-full border border-white bg-amber p-2 pr-4 shadow-lg shadow-amber/25"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy">
                  <ShieldCheck className="h-4 w-4 text-amber" />
                </div>
                <span className="text-[11px] font-bold text-navy">Положительное заключение</span>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-6">
            <h3 className="font-display text-[20px] font-semibold text-ink">Главгосэкспертиза — наша обычная работа</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Проекты ПАО «Техприбор», ПАО «Яковлев» и курорта «Сопка Горячая» на Камчатке прошли ФАУ «Главгосэкспертиза
              России» с положительным заключением. Замечания снимаем сами.
            </p>
          </div>
        </motion.div>

        {/* CARD 3 — BIM video */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="flex flex-col overflow-hidden rounded-[32px] border border-gray-200 bg-white"
        >
          <div className="relative h-72 overflow-hidden border-b border-gray-200 bg-navy">
            <video autoPlay muted loop playsInline poster={asset("/img/step2.webp")} className="absolute inset-0 h-full w-full object-cover">
              <source src={asset("/video/bim.mp4")} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md"
            >
              <AlertTriangle size={12} className="text-amber" /> Коллизий найдено: 214
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-amber px-3 py-1.5 text-[11px] font-bold text-navy shadow-lg"
            >
              <Check size={12} strokeWidth={3} /> Устранено до стройки: 214
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md"
            >
              <Layers3 className="h-7 w-7 text-cyan" />
            </motion.div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-[20px] font-semibold text-ink">BIM там, где это экономит деньги</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Рабочую документацию жилых домов в «Академическом» и ТРЦ «Усадьба Горбунова» вели в BIM: коллизии между
              разделами находим до выпуска документации, а не на площадке.
            </p>
          </div>
        </motion.div>

        {/* CARD 4 — schedule */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="flex flex-col overflow-hidden rounded-[32px] border border-gray-200 bg-white"
        >
          <div className="relative flex h-72 flex-col items-center justify-center border-b border-gray-200 bg-paper p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-amber/10 via-white to-cyan/10" />
            <div className="relative z-10 flex h-full w-full flex-col gap-3 rounded-2xl border border-white/80 bg-white/70 p-5 shadow-2xl shadow-navy/5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber/15">
                    <CalendarCheck2 className="h-4 w-4 text-amber-dark" />
                  </div>
                  <span className="text-[11px] font-bold text-ink">График по разделам · 100 дней</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">в срок</span>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-2">
                {GANTT.map((g, i) => (
                  <div key={g.name} className="flex items-center gap-2">
                    <span className="w-[62px] shrink-0 text-[10px] font-semibold text-gray-500">{g.name}</span>
                    <div className="relative h-4 flex-1 rounded-full bg-black/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: g.len + "%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                        style={{ left: g.start + "%" }}
                        className={"absolute top-0 h-4 rounded-full " + g.color}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-black/5 pt-3 text-[10px] text-gray-500">
                <span>Промежуточная сдача каждые 14 дней</span>
                <span className="font-bold text-ink">Неустойка 0,1%/день</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-[20px] font-semibold text-ink">График, привязанный к вашей стройке</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              В коммерческом предложении — сроки по каждому разделу. Сдаём поэтапно, чтобы вы видели прогресс, а не
              ждали весь комплект «в конце».
            </p>
            <button
              onClick={() =>
                open({
                  intent: "features-schedule",
                  title: "Получить график и смету по разделам",
                  subtitle: "Пришлём КП с разбивкой по разделам и датами сдачи каждого этапа.",
                  fields: ["name", "phone", "objectType", "area"],
                })
              }
              className="mt-4 text-[14px] font-bold text-ink underline-offset-4 hover:underline"
            >
              Получить график по моему объекту ↗
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

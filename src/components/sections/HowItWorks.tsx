"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MapPinned, FileText, ClipboardCheck, Layers3, ScanSearch, CalendarClock, Stamp, HardHat, Eye } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";
import SectionHeading from "@/components/ui/SectionHeading";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
};

type Step = {
  n: string;
  term: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  items: { icon: LucideIcon; t: string; d: string }[];
};

const STEPS: Step[] = [
  {
    n: "01",
    term: "5–15 дней",
    title: "Исходные данные и изыскания",
    text: "Проверяем ГПЗУ, ТУ, ограничения участка. Делаем топосъёмку и геологию. Составляем ТЗ так, чтобы экспертиза потом не вернула проект.",
    image: "/img/step1.webp",
    alt: "Инженер на участке под застройку",
    items: [
      { icon: MapPinned, t: "Топосъёмка и геология", d: "Аккредитованные партнёры под нашим контролем" },
      { icon: FileText, t: "ГПЗУ и технические условия", d: "Проверяем комплектность и сроки действия" },
      { icon: ClipboardCheck, t: "Техническое задание", d: "Составим вместе за 2–3 дня, бесплатно" },
    ],
  },
  {
    n: "02",
    term: "30–100 дней",
    title: "Проектирование в BIM",
    text: "Все разделы в одной модели, проверка коллизий, промежуточные сдачи каждые 2 недели. Вы видите не «процесс идёт», а готовые разделы.",
    image: "/img/step2.webp",
    alt: "BIM-модель здания на мониторе",
    items: [
      { icon: Layers3, t: "АР, КР, ОВ, ВК, ЭОМ, СС", d: "Все разделы своими инженерами" },
      { icon: ScanSearch, t: "Проверка коллизий", d: "Navisworks до выпуска документации" },
      { icon: CalendarClock, t: "Сдача каждые 14 дней", d: "Поэтапно, по актам, с отчётом" },
    ],
  },
  {
    n: "03",
    term: "30–45 дней",
    title: "Экспертиза и стройка",
    text: "Сами загружаем комплект, сами отвечаем на замечания. Получаете заключение и разрешение. Дальше — авторский надзор до ввода объекта.",
    image: "/img/step3.webp",
    alt: "Тома проектной документации",
    items: [
      { icon: Stamp, t: "Положительное заключение", d: "Замечания снимаем за 3 дня за свой счёт" },
      { icon: HardHat, t: "Разрешение на строительство", d: "Комплект РД передаём подрядчику" },
      { icon: Eye, t: "Авторский надзор", d: "Инженер на площадке до ввода" },
    ],
  },
];

const TIMELINE = [
  { d: "День 1", t: "Звонок ГИПа, сбор исходных данных" },
  { d: "День 2", t: "КП: смета по разделам + график" },
  { d: "День 3–5", t: "Договор, ТЗ, старт изысканий" },
  { d: "Неделя 2+", t: "Проектирование, сдача каждые 14 дней" },
  { d: "Финал", t: "Экспертиза до положительного заключения" },
  { d: "Стройка", t: "Авторский надзор до ввода" },
];

export default function HowItWorks() {
  const { open } = useLead();
  return (
    <section id="process" className="relative w-full overflow-hidden bg-white px-4 py-[90px] md:px-6 md:py-[120px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 -top-24 hidden h-96 w-96 rounded-full bg-amber/10 blur-3xl md:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-24 -right-24 hidden h-96 w-96 rounded-full bg-cyan/10 blur-3xl md:block"
        />
      </div>

      <div className="relative z-10">
        <SectionHeading
          title="От пустого участка до разрешения на строительство — три этапа"
          text="Каждый этап заканчивается конкретным результатом на руках у заказчика, а не «процессом»."
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto mb-16 grid max-w-[1400px] grid-cols-1 gap-8 md:grid-cols-3"
      >
        {STEPS.map((s) => (
          <motion.div key={s.n} variants={stepVariants} className="group flex cursor-default flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              <img loading="lazy" decoding="async"
                src={asset(s.image)}
                alt={s.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-[34px] font-semibold leading-none text-amber">{s.n}</span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{s.term}</span>
            </div>
            <h3 className="font-display mt-3 text-2xl font-semibold leading-tight text-ink md:min-h-[3.6rem]">{s.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted">{s.text}</p>

            <div className="mt-auto flex flex-col pt-5">
            <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-paper">
              {s.items.map((it) => (
                <div key={it.t} className="flex items-start gap-3 px-4 py-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-amber-dark shadow-sm">
                    <it.icon size={15} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-ink">{it.t}</div>
                    <div className="text-[12px] text-muted">{it.d}</div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* TIMELINE */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto mb-12 max-w-[1400px] overflow-hidden rounded-[28px] bg-navy p-6 text-white blueprint-grid md:p-8"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber/20 blur-3xl" />
        <div className="relative grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {TIMELINE.map((t, i) => (
            <div key={t.d} className="relative">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber text-[12px] font-bold text-navy">{i + 1}</span>
                <span className="hidden h-px flex-1 bg-white/15 lg:block" />
              </div>
              <div className="font-display text-[14px] font-semibold text-amber">{t.d}</div>
              <div className="mt-1 text-[13px] leading-snug text-white/75">{t.t}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            open({
              intent: "process-start",
              title: "Запустить проект за 2 дня",
              subtitle: "Завтра — звонок ГИПа и список исходных данных, послезавтра — КП с графиком.",
              fields: ["name", "phone", "objectType", "file"],
              submitLabel: "Запустить проект",
            })
          }
          className="w-full rounded-full bg-amber px-10 py-4 text-sm font-bold uppercase tracking-widest text-navy shadow-xl shadow-amber/25 transition-all hover:shadow-2xl sm:w-auto"
        >
          Запустить проект
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            open({
              intent: "process-audit",
              title: "Бесплатный аудит вашего проекта",
              subtitle: "Есть проект от другого бюро? Проверим на замечания экспертизы и коллизии — бесплатно, за 2 дня.",
              fields: ["name", "phone", "email", "file"],
              submitLabel: "Отправить на аудит",
              note: "Аудит бесплатный. Результат — список рисков по разделам в PDF.",
            })
          }
          className="w-full rounded-full border border-gray-200 bg-white px-10 py-4 text-sm font-bold uppercase tracking-widest text-ink shadow-lg transition-all hover:shadow-xl sm:w-auto"
        >
          Аудит готового проекта
        </motion.button>
      </motion.div>
    </section>
  );
}

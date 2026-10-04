"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";
import Header from "@/components/ui/Header";

const STATS = [
  { value: "150", label: "крупных проектов с 2018 года", suffix: "+" },
  { value: "45", label: "инженеров-проектировщиков", suffix: "+" },
  { value: "3", label: "офиса: Москва, Брянск, Орёл", suffix: "" },
  { value: "24", label: "часа до сметы и графика", suffix: "ч" },
];

export default function Hero() {
  const { open } = useLead();

  const openMain = () =>
    open({
      intent: "hero-estimate",
      title: "Получить смету и график за 24 часа",
      subtitle: "Заполните 3 поля — ГИП перезвонит, уточнит исходные данные и пришлёт КП с разбивкой по разделам.",
      fields: ["name", "phone", "objectType", "area", "file"],
      submitLabel: "Получить смету за 24 часа",
    });

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col bg-navy lg:min-h-[108vh]">
      <img
        src={asset("/img/hero.webp")}
        alt="Жилой комплекс, спроектированный ПГ «ЛИДЕР»"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/80 via-navy/50 to-navy" />

      <Header />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-16 pt-[140px] text-center md:pt-[170px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-display max-w-6xl text-[42px] font-semibold leading-[1.04] tracking-[-0.025em] text-white sm:text-[58px] md:text-[74px] lg:text-[92px]"
        >
          Проектируем всё —
          <br className="hidden sm:block" /> от заводского цеха
          <br className="hidden sm:block" /> <span className="text-amber">до памятника ЮНЕСКО</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-7 max-w-[720px] text-[16px] leading-relaxed text-white/85 md:text-lg"
        >
          150 крупных объектов с 2018 года: производственные корпуса Ростеха и ПАО «Яковлев», жилые кварталы,
          поликлиники, Троице-Сергиева Лавра. Проектирование, обследование, изыскания и сопровождение Главгосэкспертизы.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-8 flex w-full max-w-md flex-col items-center gap-3 sm:w-auto sm:max-w-none sm:flex-row"
        >
          <button
            onClick={openMain}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-amber px-8 py-4 text-base font-bold text-navy shadow-[0_8px_32px_rgba(237,191,85,0.45)] transition-all hover:scale-105 hover:bg-amber-dark active:scale-95 sm:w-auto"
          >
            Получить смету за 24 часа
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() =>
              open({
                intent: "hero-gip",
                title: "Задать вопрос ГИПу",
                subtitle: "Главный инженер проекта ответит по телефону: реально ли, сколько стоит и что нужно для старта.",
                fields: ["name", "phone", "comment"],
                submitLabel: "Связаться с ГИПом",
              })
            }
            className="w-full rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-lg transition-all hover:bg-white/20 sm:w-auto"
          >
            Спросить ГИПа
          </button>
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-[13px] text-white/60"
        >
          Расчёт бесплатный · перезвоним за 15 минут · без обязательств
        </motion.span>

        {/* STATS */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
          initial="hidden"
          animate="show"
          className="mt-14 grid w-full max-w-5xl grid-cols-2 gap-3 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left backdrop-blur-md"
            >
              <div className="font-display text-[30px] font-semibold leading-none text-white md:text-[36px]">
                {s.value}
                <span className="text-amber">{s.suffix}</span>
              </div>
              <div className="mt-1.5 text-[12px] font-medium text-white/60 md:text-[13px]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

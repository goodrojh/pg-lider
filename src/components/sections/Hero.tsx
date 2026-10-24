"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";
import Header from "@/components/ui/Header";
import HeroLeadForm from "@/components/ui/HeroLeadForm";

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
        alt="Жилой комплекс, спроектированный компанией «Раздел Проект»"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/80 via-navy/50 to-navy" />

      <Header />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-1 items-center px-5 pb-14 pt-[120px] md:px-8 md:pb-16 md:pt-[150px]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-9 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-x-14 lg:gap-y-9 xl:gap-x-20">
          {/* заголовок и описание */}
          <div className="flex flex-col items-center text-center lg:col-start-1 lg:row-start-1 lg:items-start lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-display text-[38px] font-semibold leading-[1.04] tracking-[-0.025em] text-white sm:text-[52px] lg:text-[58px] xl:text-[68px]"
            >
              Проектируем всё — от заводского цеха{" "}
              <span className="text-amber">до памятника ЮНЕСКО</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-6 max-w-[640px] text-[15.5px] leading-relaxed text-white/85 md:text-[17px]"
            >
              150 крупных объектов с 2018 года: производственные корпуса Ростеха и ПАО «Яковлев», жилые кварталы,
              поликлиники, Троице-Сергиева Лавра. Проектирование, обследование, изыскания и сопровождение
              Главгосэкспертизы.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={openMain}
              className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white underline-offset-4 transition hover:text-amber hover:underline"
            >
              Нужна подробная смета с разбивкой по разделам
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>

          {/* форма: справа на больших экранах, сразу под текстом на телефоне */}
          <div className="flex w-full justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-end lg:self-center">
            <HeroLeadForm />
          </div>

          {/* цифры */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.55 } } }}
            initial="hidden"
            animate="show"
            className="mx-auto grid w-full max-w-[640px] grid-cols-2 gap-3 lg:col-start-1 lg:row-start-2 lg:mx-0 lg:max-w-none xl:grid-cols-4"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left backdrop-blur-md"
              >
                <div className="font-display text-[28px] font-semibold leading-none text-white md:text-[32px]">
                  {s.value}
                  <span className="text-amber">{s.suffix}</span>
                </div>
                <div className="mt-1.5 text-[12px] font-medium text-white/60 md:text-[12.5px]">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Award, Briefcase, GraduationCap } from "lucide-react";
import { SITE, asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";

const QUESTIONS = [
  "Можно ли на этом участке построить то, что я хочу?",
  "Что делать, если здание — объект культурного наследия?",
  "Пройдёт ли проект Главгосэкспертизу и сколько это займёт?",
  "Что дешевле: реконструкция или новое строительство?",
];

export default function Expert() {
  const { open } = useLead();
  const ask = (q?: string) =>
    open({
      intent: "expert-question",
      title: "Вопрос главному инженеру проекта",
      subtitle: "Главный инженер проекта перезвонит лично. 20 минут разговора обычно экономят заказчику месяц.",
      fields: ["name", "phone", "comment"],
      submitLabel: "Задать вопрос ГИПу",
      prefill: q ? { comment: q } : undefined,
      note: "Консультация бесплатная. Никаких «менеджеров» — сразу инженер.",
    });

  return (
    <section className="w-full bg-white px-4 py-[80px] md:px-6 md:py-[110px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-[420px]"
        >
          <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
            <img loading="lazy" decoding="async" src={asset("/img/case-lavra.webp")} alt="Троице-Сергиева Лавра — объект культурного наследия ЮНЕСКО" className="aspect-[3/4] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="font-display text-[22px] font-semibold">Главный инженер проекта</div>
              <div className="text-[13px] text-white/75">Ведёт объект от технического задания до ввода</div>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 top-6 flex items-center gap-2 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md md:-right-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[12px] font-bold text-ink">Сейчас на связи</span>
          </motion.div>
          <div className="absolute -left-3 bottom-24 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md md:-left-8">
            <div className="text-[11px] uppercase tracking-wider text-muted">Ответ по телефону</div>
            <div className="font-display text-[22px] font-semibold text-ink">15 мин</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.01em] text-ink md:text-[46px]">
            Поговорите с инженером, а не с менеджером по продажам
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted md:text-lg">
            Перед договором вы общаетесь с тем, кто будет вести ваш объект. ГИП скажет честно: реально ли, сколько
            стоит и где спрятаны риски. Даже если после разговора вы выберете другого подрядчика.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { icon: GraduationCap, t: "Инженер-строитель, ПГС" },
              { icon: Award, t: "Опыт Главгосэкспертизы" },
              { icon: Briefcase, t: "Промышленные, жилые, ОКН" },
            ].map((b) => (
              <span key={b.t} className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-[12px] font-semibold text-ink">
                <b.icon size={13} className="text-amber-dark" /> {b.t}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <div className="mb-3 text-[12px] font-bold uppercase tracking-wider text-muted">С чем чаще всего приходят</div>
            <div className="flex flex-col gap-2">
              {QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => ask(q)}
                  className="group flex items-center justify-between rounded-2xl border border-black/5 bg-paper px-4 py-3 text-left text-[14px] font-medium text-ink transition hover:border-amber hover:bg-white"
                >
                  {q}
                  <MessageCircle size={16} className="shrink-0 text-muted transition group-hover:text-amber-dark" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => ask()} className="flex items-center justify-center gap-2 rounded-full bg-amber px-7 py-4 text-[15px] font-bold text-navy transition hover:bg-amber-dark">
              <MessageCircle size={18} /> Задать свой вопрос
            </button>
            <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 rounded-full border border-black/10 px-7 py-4 text-[15px] font-semibold text-ink transition hover:bg-paper">
              <Phone size={18} className="text-amber-dark" /> {SITE.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

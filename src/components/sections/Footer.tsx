"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { SITE, NAV, SERVICES, OFFICES, MADE_BY, asset } from "@/lib/site";
import Logo from "@/components/ui/Logo";
import Messengers from "@/components/ui/Messengers";
import { formatPhone, isPhoneComplete, submitLead } from "@/lib/lead";
import { useLead } from "@/components/ui/ModalProvider";

export default function Footer() {
  const { open } = useLead();
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneComplete(phone)) return;
    try {
      await submitLead({ intent: "footer-callback", phone });
    } catch {}
    setDone(true);
  };

  return (
    <section className="w-full bg-white">
      <div className="relative m-2 flex min-h-[760px] flex-col overflow-hidden rounded-[20px] md:m-3">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${asset("/img/case-usadba-gorbunova.webp")}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-navy/70" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-20 text-center md:px-20">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[36px] font-semibold leading-[1.02] tracking-[-0.02em] text-white md:text-[76px]"
          >
            Смета по разделам —<br />
            <span className="text-amber">за 24 часа.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 max-w-[520px] text-[15px] text-white/80 md:text-lg"
          >
            Оставьте телефон — ГИП перезвонит за 15 минут, уточнит исходные данные и завтра вы получите КП.
          </motion.p>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 flex h-16 w-full max-w-[520px] overflow-hidden rounded-full border border-white/25 bg-white/15 backdrop-blur-md"
          >
            {done ? (
              <div className="flex flex-1 items-center justify-center gap-2 text-[15px] font-semibold text-white">
                <CheckCircle2 size={18} className="text-amber" /> Принято! Перезвоним за 15 минут.
              </div>
            ) : (
              <>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="min-w-0 flex-1 border-none bg-transparent px-6 text-[15px] text-white outline-none placeholder:text-white/60"
                />
                <button type="submit" className="flex h-full items-center gap-2 whitespace-nowrap rounded-full bg-amber px-5 text-[13px] font-bold tracking-[0.08em] text-navy transition-colors hover:bg-amber-dark md:px-8">
                  <Send size={14} /> <span className="hidden sm:inline">ПЕРЕЗВОНИТЕ</span>
                </button>
              </>
            )}
          </motion.form>
          <span className="mt-3 text-[12px] text-white/55">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 mx-3 mb-3 rounded-[24px] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl md:mx-5 md:mb-5 md:p-10"
        >
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="md:w-[30%]">
              <Logo />
              <p className="mt-3 max-w-[280px] text-[13px] leading-relaxed text-white/60">
                Архитектурно-строительное проектирование, техническое обследование зданий, инженерные изыскания,
                реставрация объектов культурного наследия и ведение объекта до ввода в эксплуатацию.
              </p>
              <div className="mt-4 flex flex-col gap-2 text-[13px] text-white/75">
                <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-white"><Phone size={14} className="text-amber" /> {SITE.phone}</a>
                <a href={"mailto:" + SITE.email} className="flex items-center gap-2 hover:text-white"><Mail size={14} className="text-amber" /> {SITE.email}</a>
                <span className="flex items-center gap-2"><MapPin size={14} className="text-amber" /> {SITE.address}</span>
                <span className="flex items-center gap-2"><Clock size={14} className="text-amber" /> {SITE.hours}</span>
              </div>
              <Messengers size={20} className="mt-4" />
            </div>

            <div>
              <h4 className="mb-4 text-[13px] font-semibold text-white">Услуги</h4>
              <ul className="space-y-2">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <a href={asset("/") + "#services"} className="text-[13px] text-white/60 transition-colors hover:text-white">{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[13px] font-semibold text-white">Навигация</h4>
              <ul className="space-y-2">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href.startsWith("/") ? n.href : asset("/") + n.href} className="text-[13px] text-white/60 transition-colors hover:text-white">{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[13px] font-semibold text-white">Офисы</h4>
              <ul className="space-y-2">
                {OFFICES.map((o) => (
                  <li key={o.city} className="text-[13px] text-white/60">
                    <span className="font-semibold text-white/85">{o.city}</span>
                    <br />
                    <span className="text-[12px]">{o.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5 text-[12px] leading-relaxed text-white/45">
            ООО «ПГ „ЛИДЕР“» · архитектурно-строительное проектирование, техническое обследование, инженерные изыскания,
            сохранение объектов культурного наследия · {SITE.address}
          </div>

          <div className="mt-4 flex flex-col items-center justify-between gap-4 md:flex-row">
            <a
              href={MADE_BY.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] font-medium text-white/60 transition hover:border-amber/50 hover:bg-white/10 hover:text-white"
            >
              Сайт создан компанией <span className="font-semibold text-amber">{MADE_BY.name}</span>
            </a>
            <span className="text-[12px] text-white/40">© 2018–{new Date().getFullYear()} Проектная группа «ЛИДЕР». Все права защищены.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

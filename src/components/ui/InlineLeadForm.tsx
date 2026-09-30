"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { formatPhone, isPhoneComplete, submitLead } from "@/lib/lead";

/** Встроенная (не модальная) форма — для конца статей и других мест, где форма должна быть частью страницы. */
export default function InlineLeadForm({
  intent,
  title,
  subtitle,
  button = "Отправить",
  context,
}: {
  intent: string;
  title: string;
  subtitle?: string;
  button?: string;
  context?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneComplete(phone)) {
      setError("Введите телефон полностью — по нему перезвонит ГИП.");
      return;
    }
    setError("");
    setSending(true);
    try {
      await submitLead({ intent, name, phone, comment, context: context ?? "" });
      setDone(true);
    } catch {
      setError("Не удалось отправить. Позвоните нам: " + SITE.phone);
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-white/50 focus:border-amber focus:bg-white/15";

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-navy p-6 text-white blueprint-grid md:p-10">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber/25 blur-3xl" />
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="font-display text-[26px] font-semibold leading-tight md:text-[32px]">{title}</h3>
          {subtitle && <p className="mt-3 text-[15px] leading-relaxed text-white/70">{subtitle}</p>}
          <div className="mt-6 flex flex-col gap-2 text-[14px] text-white/70">
            <span>· Перезвоним за 15 минут в рабочее время</span>
            <span>· Отвечает инженер, а не менеджер</span>
            <span>· Бесплатно и без обязательств</span>
          </div>
          <a href={SITE.phoneHref} className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-white">
            <Phone size={16} className="text-amber" /> {SITE.phone}
          </a>
        </div>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-[20px] border border-white/10 bg-white/5 p-8 text-center"
          >
            <CheckCircle2 size={44} className="text-amber" />
            <div className="font-display mt-4 text-[22px] font-semibold">Заявка принята</div>
            <p className="mt-2 text-[14px] text-white/70">ГИП перезвонит в течение 15 минут ({SITE.hours}).</p>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <input className={inputCls} placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            <input
              className={inputCls}
              placeholder="+7 (___) ___-__-__"
              inputMode="tel"
              required
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              autoComplete="tel"
            />
            <textarea
              className={inputCls + " min-h-[88px] resize-y"}
              placeholder="Коротко о задаче или вопросе"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {error && <p className="text-[13px] text-red-300">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-4 text-[15px] font-bold text-navy transition hover:bg-amber-dark disabled:opacity-60"
            >
              {sending ? "Отправляем…" : button}
              {!sending && <Send size={16} />}
            </button>
            <p className="text-center text-[12px] text-white/50">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
          </form>
        )}
      </div>
    </div>
  );
}

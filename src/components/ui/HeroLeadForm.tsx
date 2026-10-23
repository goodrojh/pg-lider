"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { formatPhone, isPhoneComplete, submitLead } from "@/lib/lead";
import ConsentCheckbox from "@/components/ui/ConsentCheckbox";

/** Короткая форма на первом экране: имя, телефон, пара слов об объекте. */
export default function HeroLeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [object, setObject] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneComplete(phone)) {
      setError("Введите телефон полностью — по нему перезвонит ГИП.");
      return;
    }
    if (!consent) {
      setError("Отметьте согласие на обработку персональных данных.");
      return;
    }
    setError("");
    setSending(true);
    try {
      await submitLead({ intent: "hero-form", name, phone, comment: object, consent: "да" });
      setDone(true);
    } catch {
      setError("Не удалось отправить. Позвоните нам: " + SITE.phone);
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-white/55 focus:border-amber focus:bg-white/15";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="mt-9 w-full max-w-[940px] rounded-[22px] border border-white/20 bg-navy/55 p-4 text-left backdrop-blur-xl sm:p-5"
    >
      {done ? (
        <div className="flex flex-col items-center gap-3 px-2 py-6 text-center sm:flex-row sm:justify-center sm:gap-5 sm:py-5 sm:text-left">
          <CheckCircle2 size={38} className="shrink-0 text-amber" />
          <div>
            <div className="font-display text-[19px] font-semibold text-white">Заявка принята</div>
            <p className="mt-1 text-[14px] text-white/70">
              ГИП перезвонит в течение 15 минут в рабочее время ({SITE.hours}).
            </p>
          </div>
          <a
            href={SITE.phoneHref}
            className="mt-1 inline-flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-white/20 sm:ml-2 sm:mt-0"
          >
            <Phone size={15} /> {SITE.phone}
          </a>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.5fr_auto]">
            <input
              className={field}
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <input
              className={field}
              placeholder="+7 (___) ___-__-__"
              inputMode="tel"
              required
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              autoComplete="tel"
            />
            <input
              className={field}
              placeholder="Коротко об объекте"
              value={object}
              onChange={(e) => setObject(e.target.value)}
            />
            <button
              type="submit"
              disabled={sending || !consent}
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-amber px-7 py-3.5 text-[15px] font-bold text-navy transition hover:bg-amber-dark disabled:opacity-50 lg:px-8"
            >
              {sending ? "Отправляем…" : "Получить расчёт"}
              {!sending && <Send size={16} />}
            </button>
          </div>

          <div className="mt-3.5 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <ConsentCheckbox id="consent-hero" checked={consent} onChange={setConsent} dark />
            <span className="shrink-0 text-[12px] text-white/55">
              Бесплатно · перезвоним за 15 минут · без обязательств
            </span>
          </div>

          {error && <p className="mt-2.5 text-[13px] text-red-300">{error}</p>}
        </form>
      )}
    </motion.div>
  );
}

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Phone, Check } from "lucide-react";
import { SITE } from "@/lib/site";
import { formatPhone, isPhoneComplete, submitLead } from "@/lib/lead";
import ConsentCheckbox from "@/components/ui/ConsentCheckbox";
import { useLead } from "@/components/ui/ModalProvider";

const BENEFITS = ["Расчёт бесплатный", "Перезвоним за 15 минут", "Без обязательств"];

/** Крупная форма-карточка на первом экране: имя, телефон, пара слов об объекте. */
export default function HeroLeadForm() {
  const { open } = useLead();
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
    "w-full rounded-xl border border-black/10 bg-paper px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-gray-400 focus:border-amber focus:bg-white focus:ring-4 focus:ring-amber/15";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
      className="w-full max-w-[460px] lg:ml-auto"
    >
      <div className="overflow-hidden rounded-[26px] bg-white shadow-[0_24px_70px_rgba(8,14,32,0.45)]">
        {/* шапка карточки */}
        <div className="relative overflow-hidden bg-navy px-6 pb-5 pt-6 blueprint-grid">
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber/30 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-navy">
              Смета за 24 часа
            </span>
            <h2 className="font-display mt-3 text-[25px] font-semibold leading-tight text-white">
              Рассчитаем ваш проект
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">
              Три поля — и ГИП перезвонит, уточнит исходные данные и пришлёт КП с разбивкой по разделам.
            </p>
          </div>
        </div>

        <div className="px-6 py-6">
          {done ? (
            <div className="flex flex-col items-center py-4 text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-amber/15 text-amber"
              >
                <CheckCircle2 size={36} />
              </motion.div>
              <h3 className="font-display mt-4 text-[20px] font-semibold text-ink">Заявка принята</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                ГИП перезвонит в течение 15 минут в рабочее время ({SITE.hours}). Если срочно — звоните прямо сейчас.
              </p>
              <a
                href={SITE.phoneHref}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-navy-2"
              >
                <Phone size={15} /> {SITE.phone}
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
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
              <textarea
                className={field + " min-h-[88px] resize-y"}
                placeholder="Коротко об объекте: что проектируем, где, какая площадь"
                value={object}
                onChange={(e) => setObject(e.target.value)}
              />

              {error && <p className="text-[13px] text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={sending || !consent}
                className="group mt-1 flex items-center justify-center gap-2 rounded-xl bg-amber px-6 py-4 text-[16px] font-bold text-navy shadow-[0_10px_28px_rgba(237,191,85,0.4)] transition-all hover:bg-amber-dark disabled:opacity-50 disabled:shadow-none"
              >
                {sending ? "Отправляем…" : "Получить смету за 24 часа"}
                {!sending && <Send size={16} className="transition-transform group-hover:translate-x-0.5" />}
              </button>

              <ConsentCheckbox id="consent-hero" checked={consent} onChange={setConsent} />

              <ul className="mt-1 flex flex-col gap-1.5 border-t border-black/[0.07] pt-3.5">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[13px] text-muted">
                    <Check size={14} className="shrink-0 text-amber-dark" strokeWidth={3} />
                    {b}
                  </li>
                ))}
              </ul>
            </form>
          )}
        </div>
      </div>

      {!done && (
        <div className="mt-4 text-center text-[13px] text-white/60 lg:text-right">
          Не готовы оставлять телефон?{" "}
          <button
            onClick={() =>
              open({
                intent: "hero-gip",
                title: "Задать вопрос ГИПу",
                subtitle:
                  "Главный инженер проекта ответит по телефону: реально ли, сколько стоит и что нужно для старта.",
                fields: ["name", "phone", "comment"],
                submitLabel: "Связаться с ГИПом",
              })
            }
            className="font-semibold text-white underline underline-offset-4 transition hover:text-amber"
          >
            Просто спросите ГИПа
          </button>
        </div>
      )}
    </motion.div>
  );
}

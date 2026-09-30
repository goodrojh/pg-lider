"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, Send, CheckCircle2, Paperclip } from "lucide-react";
import { SITE } from "@/lib/site";
import { formatPhone, isPhoneComplete, submitLead } from "@/lib/lead";

export type FieldKey = "name" | "phone" | "email" | "objectType" | "area" | "comment" | "file";

export type LeadConfig = {
  intent: string;
  title: string;
  subtitle?: string;
  fields?: FieldKey[];
  submitLabel?: string;
  note?: string;
  prefill?: Partial<Record<FieldKey, string>>;
  accent?: "amber" | "cyan";
};

type Ctx = { open: (cfg: LeadConfig) => void; close: () => void };
const ModalCtx = createContext<Ctx | null>(null);

export function useLead() {
  const ctx = useContext(ModalCtx);
  if (!ctx) throw new Error("useLead must be used inside ModalProvider");
  return ctx;
}

const OBJECT_TYPES = [
  "Промышленное здание / склад",
  "Жилой дом / ЖК",
  "Общественное здание",
  "Внутренние инженерные сети",
  "Наружные сети / подключение",
  "Котельная / ИТП",
  "Реконструкция",
  "Другое",
];

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [cfg, setCfg] = useState<LeadConfig | null>(null);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const open = useCallback((c: LeadConfig) => {
    setCfg(c);
    setDone(false);
    setError("");
    setFileName("");
    setValues({ ...(c.prefill ?? {}) });
  }, []);
  const close = useCallback(() => setCfg(null), []);

  useEffect(() => {
    if (!cfg) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cfg, close]);

  const api = useMemo(() => ({ open, close }), [open, close]);
  const fields: FieldKey[] = cfg?.fields ?? ["name", "phone"];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfg) return;
    if (!isPhoneComplete(values.phone ?? "")) {
      setError("Введите телефон полностью — по нему перезвонит ГИП.");
      return;
    }
    setError("");
    setSending(true);
    try {
      await submitLead({ intent: cfg.intent, file: fileName, ...values });
      setDone(true);
    } catch {
      setError("Не удалось отправить. Позвоните нам: " + SITE.phone);
    } finally {
      setSending(false);
    }
  };

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));
  const inputCls =
    "w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/15 placeholder:text-gray-400";

  return (
    <ModalCtx.Provider value={api}>
      {children}
      <AnimatePresence>
        {cfg && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/70 backdrop-blur-sm p-0 sm:items-center sm:p-6"
            onClick={close}
          >
            <motion.div
              key="panel"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[520px] max-h-[92vh] overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]"
            >
              <div className="relative overflow-hidden rounded-t-[28px] bg-navy px-6 pt-6 pb-7 text-white blueprint-grid">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber/30 blur-3xl" />
                <button
                  onClick={close}
                  aria-label="Закрыть"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
                >
                  <X size={18} />
                </button>
                <h3 className="font-display mt-4 text-[22px] font-semibold leading-tight sm:text-[26px]">{cfg.title}</h3>
                {cfg.subtitle && <p className="mt-2 text-[14px] leading-relaxed text-white/70">{cfg.subtitle}</p>}
              </div>

              <div className="px-6 py-6">
                {done ? (
                  <div className="flex flex-col items-center py-6 text-center">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-amber/15 text-amber"
                    >
                      <CheckCircle2 size={44} />
                    </motion.div>
                    <h4 className="font-display mt-5 text-[22px] font-semibold text-ink">Заявка принята</h4>
                    <p className="mt-2 max-w-[340px] text-[15px] text-muted">
                      ГИП перезвонит в течение 15 минут в рабочее время ({SITE.hours}). Если срочно — звоните прямо сейчас.
                    </p>
                    <a
                      href={SITE.phoneHref}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-navy-2"
                    >
                      <Phone size={16} /> {SITE.phone}
                    </a>
                    <button onClick={close} className="mt-3 text-[14px] text-muted underline-offset-4 hover:underline">
                      Закрыть
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    {fields.includes("name") && (
                      <input
                        className={inputCls}
                        placeholder="Ваше имя"
                        value={values.name ?? ""}
                        onChange={(e) => set("name", e.target.value)}
                        autoComplete="name"
                      />
                    )}
                    {fields.includes("phone") && (
                      <input
                        className={inputCls}
                        placeholder="+7 (___) ___-__-__"
                        inputMode="tel"
                        required
                        value={values.phone ?? ""}
                        onChange={(e) => set("phone", formatPhone(e.target.value))}
                        autoComplete="tel"
                      />
                    )}
                    {fields.includes("email") && (
                      <input
                        className={inputCls}
                        placeholder="E-mail для сметы"
                        type="email"
                        value={values.email ?? ""}
                        onChange={(e) => set("email", e.target.value)}
                        autoComplete="email"
                      />
                    )}
                    {fields.includes("objectType") && (
                      <select
                        className={inputCls + " appearance-none"}
                        value={values.objectType ?? ""}
                        onChange={(e) => set("objectType", e.target.value)}
                      >
                        <option value="">Тип объекта</option>
                        {OBJECT_TYPES.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    )}
                    {fields.includes("area") && (
                      <input
                        className={inputCls}
                        placeholder="Площадь, м² (примерно)"
                        inputMode="numeric"
                        value={values.area ?? ""}
                        onChange={(e) => set("area", e.target.value)}
                      />
                    )}
                    {fields.includes("comment") && (
                      <textarea
                        className={inputCls + " min-h-[92px] resize-y"}
                        placeholder="Коротко о задаче: что, где, какие сроки"
                        value={values.comment ?? ""}
                        onChange={(e) => set("comment", e.target.value)}
                      />
                    )}
                    {fields.includes("file") && (
                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-black/15 bg-paper px-4 py-3.5 text-[14px] text-muted transition hover:border-amber">
                        <Paperclip size={16} className="shrink-0 text-amber" />
                        <span className="truncate">{fileName || "Прикрепить ТЗ, ГПЗУ или эскиз (pdf, dwg, jpg)"}</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.dwg,.jpg,.jpeg,.png,.doc,.docx,.xlsx"
                          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                        />
                      </label>
                    )}
                    {error && <p className="text-[13px] text-red-600">{error}</p>}
                    <button
                      type="submit"
                      disabled={sending}
                      className="mt-1 flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-4 text-[15px] font-bold text-navy transition hover:bg-amber-dark disabled:opacity-60"
                    >
                      {sending ? "Отправляем…" : cfg.submitLabel ?? "Получить расчёт"}
                      {!sending && <Send size={16} />}
                    </button>
                    <p className="text-center text-[12px] leading-relaxed text-muted">
                      {cfg.note ?? "Перезвоним за 15 минут в рабочее время. Никакого спама — только ответ по вашей задаче."}
                    </p>
                    <div className="mt-1 flex items-center justify-center gap-2 text-[13px] text-muted">
                      Или сразу:
                      <a href={SITE.phoneHref} className="font-semibold text-ink underline-offset-4 hover:underline">
                        {SITE.phone}
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalCtx.Provider>
  );
}

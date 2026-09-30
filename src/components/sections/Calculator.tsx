"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator as CalcIcon, Sparkles, Info } from "lucide-react";
import { useLead } from "@/components/ui/ModalProvider";
import SectionHeading from "@/components/ui/SectionHeading";

const TYPES = [
  { id: "industrial", label: "Промышленное / склад", rate: 350, days: 0.006 },
  { id: "residential", label: "Жилой дом / ЖК", rate: 420, days: 0.005 },
  { id: "public", label: "Общественное здание", rate: 480, days: 0.007 },
  { id: "networks", label: "Только инженерные сети", rate: 120, days: 0.004 },
];

const STAGES = [
  { id: "p", label: "Стадия П", k: 0.55 },
  { id: "r", label: "Стадия Р", k: 0.6 },
  { id: "pr", label: "П + Р", k: 1 },
  { id: "full", label: "Под ключ", k: 1.25, hint: "изыскания + П + Р + экспертиза + надзор" },
];

const EXTRAS = [
  { id: "survey", label: "Инженерные изыскания", fixed: 180000 },
  { id: "external", label: "Наружные сети и ТУ", fixed: 260000 },
  { id: "bim", label: "BIM-модель LOD 300", pct: 0.08 },
];

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n / 1000) * 1000);

export default function Calculator() {
  const { open } = useLead();
  const [type, setType] = useState(TYPES[0]);
  const [area, setArea] = useState(5000);
  const [stage, setStage] = useState(STAGES[2]);
  const [extras, setExtras] = useState<string[]>([]);

  const calc = useMemo(() => {
    let base = type.rate * area * stage.k;
    // объёмная скидка
    if (area > 10000) base *= 0.92;
    if (area > 25000) base *= 0.9;
    let extra = 0;
    for (const e of EXTRAS) {
      if (!extras.includes(e.id)) continue;
      if (stage.id === "full" && e.id === "survey") continue;
      extra += e.fixed ?? base * (e.pct ?? 0);
    }
    const total = Math.max(base + extra, 85000);
    const days = Math.max(14, Math.round(area * type.days * stage.k) + 20);
    return { low: total * 0.9, high: total * 1.15, days, perM2: total / area };
  }, [type, area, stage, extras]);

  const toggle = (id: string) => setExtras((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const summary = `${type.label}, ${area} м², ${stage.label}${extras.length ? ", доп.: " + extras.map((id) => EXTRAS.find((e) => e.id === id)?.label).join(", ") : ""}. Ориентир: ${fmt(calc.low)}–${fmt(calc.high)} ₽, ~${calc.days} дн.`;

  return (
    <section id="calculator" className="w-full bg-paper px-4 py-[80px] md:px-6 md:py-[110px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          title="Прикиньте бюджет за 30 секунд"
          text="Ориентировочный расчёт по нашим средним ставкам. Точную смету с разбивкой по разделам пришлём за 24 часа."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_16px_50px_rgba(10,22,40,0.08)] lg:grid-cols-[1.4fr_1fr]"
        >
          <div className="flex flex-col gap-7 p-6 md:p-8">
            <div>
              <div className="mb-3 text-[12px] font-bold uppercase tracking-wider text-muted">1. Тип объекта</div>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t)}
                    className={
                      "rounded-full px-4 py-2.5 text-[13px] font-semibold transition " +
                      (type.id === t.id ? "bg-navy text-white" : "border border-black/10 bg-white text-ink hover:border-amber")
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-wider text-muted">2. Площадь</span>
                <span className="font-display text-[18px] font-semibold text-ink">{new Intl.NumberFormat("ru-RU").format(area)} м²</span>
              </div>
              <input type="range" min={500} max={50000} step={500} value={area} onChange={(e) => setArea(Number(e.target.value))} className="w-full" />
              <div className="mt-1 flex justify-between text-[11px] text-muted">
                <span>500</span>
                <span>10 000</span>
                <span>25 000</span>
                <span>50 000</span>
              </div>
            </div>

            <div>
              <div className="mb-3 text-[12px] font-bold uppercase tracking-wider text-muted">3. Состав работ</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {STAGES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStage(s)}
                    className={
                      "rounded-2xl px-3 py-3 text-left transition " +
                      (stage.id === s.id ? "bg-amber text-navy" : "border border-black/10 bg-white text-ink hover:border-amber")
                    }
                  >
                    <div className="text-[13px] font-bold">{s.label}</div>
                    {s.hint && <div className="mt-0.5 text-[10px] leading-tight opacity-70">{s.hint}</div>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[12px] font-bold uppercase tracking-wider text-muted">4. Дополнительно</div>
              <div className="flex flex-wrap gap-2">
                {EXTRAS.map((e) => {
                  const on = extras.includes(e.id);
                  return (
                    <button
                      key={e.id}
                      onClick={() => toggle(e.id)}
                      className={
                        "flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition " +
                        (on ? "bg-cyan/15 text-blue ring-1 ring-cyan" : "border border-black/10 bg-white text-ink hover:border-cyan")
                      }
                    >
                      <span className={"h-2 w-2 rounded-full " + (on ? "bg-cyan" : "bg-gray-300")} /> {e.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden bg-navy p-6 text-white blueprint-grid md:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber/25 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-white/60">
                <CalcIcon size={14} className="text-amber" /> Ориентировочно
              </div>
              <motion.div key={calc.low} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-display mt-4 text-[30px] font-semibold leading-none md:text-[38px]">
                {fmt(calc.low)} – {fmt(calc.high)} ₽
              </motion.div>
              <div className="mt-2 text-[14px] text-white/70">≈ {Math.round(calc.perM2)} ₽/м² · срок ~{calc.days} дней</div>

              <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-[13px] text-white/80">
                <div className="flex justify-between"><span>Объект</span><span className="font-semibold text-white">{type.label}</span></div>
                <div className="flex justify-between"><span>Площадь</span><span className="font-semibold text-white">{new Intl.NumberFormat("ru-RU").format(area)} м²</span></div>
                <div className="flex justify-between"><span>Состав</span><span className="font-semibold text-white">{stage.label}</span></div>
                {area > 10000 && (
                  <div className="flex items-center gap-1.5 pt-1 text-[12px] text-amber"><Sparkles size={12} /> Объёмная скидка применена</div>
                )}
              </div>
              <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-relaxed text-white/50">
                <Info size={12} className="mt-0.5 shrink-0" /> Расчёт не является офертой. Итоговая стоимость зависит от исходных данных и состава разделов.
              </p>
            </div>
            <button
              onClick={() =>
                open({
                  intent: "calculator",
                  title: "Получить точную смету",
                  subtitle: "Ваши параметры уже в заявке. ГИП уточнит детали и пришлёт смету по разделам за 24 часа.",
                  fields: ["name", "phone", "email", "comment"],
                  submitLabel: "Получить точную смету",
                  prefill: { comment: summary },
                })
              }
              className="relative mt-6 w-full rounded-full bg-amber px-6 py-4 text-[15px] font-bold text-navy transition hover:bg-amber-dark"
            >
              Получить точную смету за 24 часа
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

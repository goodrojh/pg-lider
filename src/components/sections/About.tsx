"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Users, Building2 } from "lucide-react";
import { OFFICES, asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";

const NUMBERS = [
  { v: 2018, label: "год начала работы команды", raw: true },
  { v: 150, label: "крупных проектов реализовано", suffix: "+" },
  { v: 45, label: "инженеров-проектировщиков в штате", suffix: "+" },
  { v: 3, label: "офиса: Москва, Брянск, Орёл" },
  { v: 20, label: "разделов проектной документации" },
  { v: 12, label: "объектов культурного наследия" },
  { v: 24, label: "часа до сметы и графика", suffix: "ч" },
  { v: 9, label: "федеральных групп среди заказчиков" },
];

const TEAM = ["Архитекторы", "Конструкторы", "ОВ · ВК", "ЭОМ · СС", "Сметчики", "BIM-координаторы", "Обследование", "Реставраторы"];

function Counter({ to, suffix = "", raw = false }: { to: number; suffix?: string; raw?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView || raw) return;
    const start = performance.now();
    const dur = 1400;
    let id: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to * e);
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to, raw]);
  return (
    <span ref={ref}>
      {raw ? to : Math.round(val)}
      <span className="text-amber">{suffix}</span>
    </span>
  );
}

export default function About() {
  const { open } = useLead();
  return (
    <section id="about" className="w-full bg-paper px-4 py-[80px] md:px-6 md:py-[110px]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.01em] text-ink md:text-[46px]">
              Проектная группа «ЛИДЕР»
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted md:text-lg">
              Команда специалистов в области обследования зданий и сооружений, архитектурно-строительного проектирования,
              энергетического аудита и комплексного тендерного сопровождения проектных и строительных организаций.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted md:text-lg">
              С 2018 года специалистами группы реализовано более 150 крупных проектов в промышленном и гражданском
              строительстве и коммерческой недвижимости. С 2019 года открыт филиал в Брянске, с 2023 года — в Орле.
              Сегодня в штате более 45 квалифицированных инженеров-проектировщиков.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {OFFICES.map((o) => (
                <div key={o.city} className="rounded-2xl border border-black/5 bg-white p-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-amber-dark" />
                    <span className="font-display text-[17px] font-semibold text-ink">{o.city}</span>
                  </div>
                  <div className="mt-1 text-[12px] leading-snug text-muted">{o.note}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  open({
                    intent: "about-presentation",
                    title: "Получить презентацию компании",
                    subtitle: "Портфолио с объектами, составом работ и заказчиками — включая объекты, которых нет на сайте.",
                    fields: ["name", "phone", "email"],
                    submitLabel: "Прислать презентацию",
                  })
                }
                className="rounded-full bg-navy px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-navy-2"
              >
                Получить презентацию
              </button>
              <a
                href="#cases"
                className="rounded-full border border-black/10 bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition hover:border-amber"
              >
                Смотреть объекты
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[32px] shadow-2xl"
          >
            <img
              loading="lazy"
              decoding="async"
              src={asset("/img/case-meridian.webp")}
              alt="Жилой комплекс, спроектированный проектной группой ЛИДЕР"
              className="aspect-[16/11] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-amber">
                <Users size={14} /> Специалисты в штате
              </div>
              <div className="flex flex-wrap gap-2">
                {TEAM.map((t) => (
                  <span key={t} className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {NUMBERS.map((n) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[24px] border border-black/5 bg-white p-5"
            >
              <div className="font-display text-[30px] font-semibold leading-none text-ink md:text-[38px]">
                <Counter to={n.v} suffix={n.suffix} raw={n.raw} />
              </div>
              <div className="mt-2 text-[13px] text-muted">{n.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-[24px] border border-black/5 bg-white p-6">
          <Building2 size={20} className="mt-0.5 shrink-0 text-amber-dark" />
          <p className="text-[15px] leading-relaxed text-muted">
            Помимо проектирования помогаем подобрать экспертную организацию и сопровождаем негосударственную экспертизу
            проектно-сметной документации, согласовываем проектные решения в надзорных и согласующих инстанциях.
          </p>
        </div>
      </div>
    </section>
  );
}

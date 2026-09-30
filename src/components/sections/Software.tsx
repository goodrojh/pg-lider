"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SOFTWARE } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";
import SectionHeading from "@/components/ui/SectionHeading";

const all = [...SOFTWARE, ...SOFTWARE];

export default function Software() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollPos = useRef<number>(0);
  const { open } = useLead();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // На тач-устройствах автопрокрутка через rAF даёт рывки — оставляем ручной свайп.
    if (window.matchMedia("(hover: none), (max-width: 767px)").matches) return;
    let id: number;
    const tick = () => {
      if (!isHovered) {
        scrollPos.current += 0.5;
        if (scrollPos.current >= el.scrollWidth / 2) scrollPos.current = 0;
        el.scrollLeft = scrollPos.current;
      } else {
        scrollPos.current = el.scrollLeft;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isHovered]);

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-[80px] md:px-6 md:py-[110px]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          align="left"
          title="Работаем в вашем ПО"
          text="Отдаём модель и чертежи в том формате, в котором работает ваш подрядчик и служба эксплуатации. Российское ПО — да."
          action={
            <button
              onClick={() =>
                open({
                  intent: "software-bim",
                  title: "Нужна BIM-модель для эксплуатации?",
                  subtitle: "Расскажите, в чём работает ваша служба эксплуатации — предложим формат и уровень детализации.",
                  fields: ["name", "phone", "comment"],
                  submitLabel: "Обсудить BIM",
                })
              }
              className="rounded-full border border-navy bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-2"
            >
              Обсудить BIM-требования
            </button>
          }
        />

        <div className="relative">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-white via-white/80 to-transparent md:w-32" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-white via-white/80 to-transparent md:w-32" />
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            className="no-scrollbar flex cursor-grab flex-row gap-4 overflow-x-auto pb-4 active:cursor-grabbing"
          >
            {all.map((item, index) => (
              <motion.div
                key={item.name + "-" + index}
                whileHover={{ y: -4 }}
                className="flex min-w-[200px] flex-col gap-3 rounded-[14px] border border-[#eaeaeb] bg-paper p-6 transition-all duration-200 hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:min-w-[240px]"
              >
                <div className="font-display flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-[14px] font-bold text-amber">
                  {item.short}
                </div>
                <h3 className="text-[15px] font-bold text-ink">{item.name}</h3>
                <p className="text-[13px] leading-[1.5] text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

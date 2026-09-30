"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";
import SectionHeading from "@/components/ui/SectionHeading";

const plans = [
  {
    name: "Стадия П",
    tagline: "Для экспертизы и разрешения на строительство.",
    price: "Смета за 24 ч",
    unit: "",
    isPopular: false,
    features: ["ПОЛНЫЙ СОСТАВ ПО ПП №87", "ПРОВЕРКА ИСХОДНЫХ ДАННЫХ", "СОПРОВОЖДЕНИЕ ЭКСПЕРТИЗЫ", "ОТВЕТЫ НА ЗАМЕЧАНИЯ ЭКСПЕРТОВ", "ГИП НА СВЯЗИ", "ПОЭТАПНАЯ СДАЧА"],
  },
  {
    name: "П + Р",
    tagline: "Проект, по которому строят.",
    price: "Смета за 24 ч",
    unit: "",
    isPopular: true,
    features: ["ВСЁ ИЗ «СТАДИЯ П»", "РАБОЧАЯ ДОКУМЕНТАЦИЯ ВСЕХ РАЗДЕЛОВ", "BIM-МОДЕЛЬ И ПРОВЕРКА КОЛЛИЗИЙ", "СПЕЦИФИКАЦИИ И ВЕДОМОСТИ", "СМЕТНАЯ ДОКУМЕНТАЦИЯ", "СОПРОВОЖДЕНИЕ ДО ЗАКЛЮЧЕНИЯ"],
  },
  {
    name: "Под ключ",
    tagline: "От анализа участка до ввода объекта.",
    price: "Индивидуально",
    unit: "",
    isPopular: false,
    features: ["ВСЁ ИЗ «П + Р»", "ИНЖЕНЕРНЫЕ ИЗЫСКАНИЯ И ОБСЛЕДОВАНИЕ", "ТЭО УЧАСТКА, АГО И АГР", "ИРД И СОГЛАСОВАНИЯ В ИНСТАНЦИЯХ", "АВТОРСКИЙ НАДЗОР", "ВВОД В ЭКСПЛУАТАЦИЮ"],
  },
];

function DotGridIcon() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-1 w-1 rounded-full bg-white" />
      ))}
    </div>
  );
}

export default function Pricing() {
  const { open } = useLead();
  return (
    <section id="pricing" className="relative w-full overflow-hidden bg-white px-0 py-16 md:py-24">
      <div className="relative z-10 px-4 md:px-6">
        <SectionHeading
          title="Три формата работы"
          text="Работаем поэтапно, оплата по актам за принятые этапы. Точная смета по разделам — в течение суток после получения исходных данных."
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative mx-3 max-w-[1480px] overflow-hidden rounded-[20px] shadow-2xl md:mx-6 xl:mx-auto"
      >
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async" src={asset("/img/case-podolsk.webp")} alt="Многофункциональный комплекс в Подольске" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-navy/40" />
        </div>

        <div className="relative z-10 m-3 overflow-hidden rounded-[12px] border border-white/20 bg-white/45 backdrop-blur-xl md:m-[40px]">
          <div className="grid grid-cols-1 divide-y divide-black/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                className={"flex flex-col px-6 py-8 md:px-8 md:py-10 " + (plan.isPopular ? "bg-white/50" : "")}
              >
                <div className="border-b border-black/10 pb-8">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-display text-2xl font-semibold text-ink">{plan.name}</h3>
                    {plan.isPopular && (
                      <span className="inline-flex items-center bg-amber px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy">
                        Выбирают чаще
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ink/80">{plan.tagline}</p>
                  <div className="mt-8 flex items-baseline gap-1">
                    <span className={"font-display font-semibold leading-none text-ink " + (plan.unit ? "text-[34px] md:text-5xl" : "text-[28px] md:text-[38px]")}>{plan.price}</span>
                    {plan.unit && <span className="ml-1 text-xs font-medium uppercase tracking-[0.1em] text-muted">{plan.unit}</span>}
                  </div>
                  <button
                    onClick={() =>
                      open({
                        intent: "pricing-" + plan.name,
                        title: `Рассчитать «${plan.name}» для моего объекта`,
                        subtitle: "Пришлём смету с разбивкой по разделам и графиком. Бесплатно, за 24 часа.",
                        fields: ["name", "phone", "objectType", "area"],
                        submitLabel: "Получить смету",
                        prefill: { comment: "Формат: " + plan.name },
                      })
                    }
                    className="group mt-6 flex w-full items-center justify-between rounded-full bg-navy p-1.5 text-white transition-colors hover:bg-navy-2"
                  >
                    <span className="flex-1 px-5 py-3 text-left text-sm font-medium">Рассчитать по объекту</span>
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber transition-colors group-hover:bg-amber-dark">
                      <DotGridIcon />
                    </span>
                  </button>
                </div>
                <div className="flex flex-col gap-3 pt-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border border-black/10 bg-black/5">
                        <Check className="h-2.5 w-2.5 stroke-[2.5] text-black" />
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

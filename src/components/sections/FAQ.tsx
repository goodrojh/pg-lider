"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X, DraftingCompass, BadgeCheck, Landmark } from "lucide-react";
import { FAQ as DATA, asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";
import SectionHeading from "@/components/ui/SectionHeading";

const tabs = [
  { id: "design", label: "Проектирование", icon: <DraftingCompass size={16} /> },
  { id: "heritage", label: "Культурное наследие", icon: <Landmark size={16} /> },
  { id: "expertise", label: "Экспертиза и сроки", icon: <BadgeCheck size={16} /> },
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("design");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { open } = useLead();

  return (
    <section id="faq" className="w-full bg-white px-4 py-[80px] md:px-6 md:py-[110px]">
      <div className="mx-auto max-w-[900px]">
        <SectionHeading
          title="Вопросы перед договором"
          text="То, что спрашивают заказчики на первом звонке. Не нашли ответ — спросите ГИПа."
          className="!mb-8 md:!mb-10"
        />

        <div className="no-scrollbar mb-[32px] flex justify-start gap-[8px] overflow-x-auto border-b border-[#efefee] md:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpenIndex(0);
              }}
              className={
                "inline-flex cursor-pointer items-center gap-[8px] whitespace-nowrap border-b-2 px-[16px] py-[10px] text-[14px] transition-all md:px-[20px] md:text-[15px] " +
                (activeTab === tab.id ? "border-amber font-[600] text-amber-dark" : "border-transparent font-[500] text-muted")
              }
            >
              <span className={activeTab === tab.id ? "text-amber-dark" : "text-muted"}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {DATA[activeTab].map((item, index) => (
            <div key={item.q} className="border-b border-[#efefee] py-[18px]">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="group flex w-full cursor-pointer items-center justify-between gap-4 text-left">
                <span className="text-[16px] font-[600] text-ink">{item.q}</span>
                <span className="shrink-0 text-muted transition-transform duration-300">
                  {openIndex === index ? <X size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key={"a-" + index}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-[4px] pt-[12px] text-[15px] leading-[1.7] text-[#5b5f68]">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-[48px] flex flex-col items-center justify-between gap-6 rounded-[20px] bg-paper p-[24px] md:flex-row md:p-[32px]">
          <div className="flex items-center">
            <img loading="lazy" decoding="async" src={asset("/img/logo.png")} alt="ГИП" className="h-[52px] w-[52px] rounded-full border-2 border-white bg-white object-contain p-1.5 shadow" />
            <div className="ml-[16px]">
              <p className="text-[15px] font-[600] text-ink">Остались вопросы?</p>
              <p className="text-[14px] text-muted">ГИП ответит по телефону за 15 минут</p>
            </div>
          </div>
          <button
            onClick={() =>
              open({
                intent: "faq-question",
                title: "Задать вопрос ГИПу",
                subtitle: "Напишите вопрос — перезвоним и ответим. Без «оставьте заявку, мы вам перезвоним через неделю».",
                fields: ["name", "phone", "comment"],
                submitLabel: "Задать вопрос",
              })
            }
            className="group relative flex items-center gap-3 overflow-hidden rounded-[16px] bg-navy px-[24px] py-[14px] text-[15px] font-[600] text-white transition-all hover:bg-navy-2"
          >
            <span className="relative z-10">Задать вопрос</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform group-hover:translate-x-1">
              <path d="M7 7v6a2 2 0 0 0 2 2h9" />
              <path d="m15 11 4 4-4 4" />
            </svg>
            <div className="pointer-events-none absolute bottom-[-10px] left-1/2 h-[20px] w-[120%] -translate-x-1/2 bg-[radial-gradient(circle,rgba(216,171,87,0.55),rgba(53,194,230,0.2),transparent_70%)] opacity-80 blur-[15px] transition-opacity group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </section>
  );
}

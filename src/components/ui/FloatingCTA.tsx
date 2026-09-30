"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, FileText, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";

export default function FloatingCTA() {
  const { open } = useLead();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop: floating call button */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-[80] hidden flex-col items-end gap-3 md:flex"
          >
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy shadow-xl transition hover:scale-105"
            >
              <MessageCircle size={20} />
            </a>
            <button
              onClick={() =>
                open({
                  intent: "floating-callback",
                  title: "Перезвоним за 15 минут",
                  subtitle: "Оставьте номер — ГИП свяжется и ответит на вопросы по вашему объекту.",
                  fields: ["name", "phone"],
                  submitLabel: "Жду звонка",
                })
              }
              className="pulse-ring relative flex h-14 items-center gap-2 rounded-full bg-amber pl-5 pr-6 text-[15px] font-bold text-navy shadow-[0_8px_32px_rgba(245,165,36,0.45)] transition hover:bg-amber-dark"
            >
              <Phone size={18} /> Заказать звонок
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: sticky bottom bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed bottom-0 left-0 right-0 z-[80] flex gap-2 border-t border-black/5 bg-white/90 p-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
          >
            <a href={SITE.phoneHref} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-navy py-3.5 text-[14px] font-bold text-white">
              <Phone size={16} className="text-amber" /> Позвонить
            </a>
            <button
              onClick={() =>
                open({
                  intent: "mobile-bar-estimate",
                  title: "Смета за 24 часа",
                  subtitle: "Три поля — и завтра у вас КП с разбивкой по разделам.",
                  fields: ["phone", "objectType", "area"],
                  submitLabel: "Получить смету",
                })
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-amber py-3.5 text-[14px] font-bold text-navy"
            >
              <FileText size={16} /> Смета за 24 ч
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

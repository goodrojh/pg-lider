"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/site";

const KEY = "rp-cookie-consent";
type Choice = "all" | "necessary";

/** Прочитать сохранённый выбор. Приватный режим может запретить доступ к хранилищу. */
export function cookieChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Уведомление об использовании cookie.
 *
 * Технически необходимые cookie работают всегда, аналитические подключаются
 * только после явного согласия — см. Analytics.tsx, который слушает событие
 * «rp-cookie-consent».
 */
export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!cookieChoice()) {
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (choice: Choice) => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* хранилище недоступно — решение действует только на эту сессию */
    }
    window.dispatchEvent(new CustomEvent(KEY, { detail: choice }));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          role="dialog"
          aria-label="Использование cookie"
          className="fixed inset-x-0 bottom-0 z-[95] px-3 pb-3 sm:px-5 sm:pb-5"
        >
          <div className="mx-auto flex max-w-[1100px] flex-col gap-4 rounded-2xl border border-white/10 bg-navy/95 p-4 text-white shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:p-5">
            <p className="text-[13px] leading-relaxed text-white/75">
              Мы используем cookie: технически необходимые — чтобы сайт и формы работали,
              аналитические — чтобы понимать, какие страницы полезны. Аналитические включаются
              только с вашего согласия. Подробнее в{" "}
              <a
                href={asset("/politika-konfidencialnosti/")}
                className="font-medium text-amber underline underline-offset-2"
              >
                политике обработки данных
              </a>
              .
            </p>
            <div className="flex shrink-0 gap-2.5">
              <button
                onClick={() => decide("necessary")}
                className="flex-1 whitespace-nowrap rounded-full border border-white/20 px-4 py-2.5 text-[13px] font-medium text-white/80 transition hover:bg-white/10 sm:flex-none"
              >
                Только необходимые
              </button>
              <button
                onClick={() => decide("all")}
                className="flex-1 whitespace-nowrap rounded-full bg-amber px-5 py-2.5 text-[13px] font-bold text-navy transition hover:bg-amber-dark sm:flex-none"
              >
                Принять все
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

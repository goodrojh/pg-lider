"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { NAV, SITE, asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";
import Logo from "@/components/ui/Logo";

/**
 * Общая шапка. На главной ссылки якорные (#services), на внутренних страницах — /#services.
 * solid=true — тёмный фон сразу (для страниц без hero-видео).
 */
export default function Header({ solid = false }: { solid?: boolean }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open } = useLead();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = (h: string) => (solid ? asset("/") + h : h);
  const dark = solid || scrolled;

  const callback = () =>
    open({
      intent: "nav-callback",
      title: "Заказать звонок",
      subtitle: "Перезвоним за 15 минут. Скажите, о каком объекте речь — подключим профильного инженера.",
      fields: ["name", "phone"],
      submitLabel: "Жду звонка",
    });

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={"fixed left-0 right-0 top-0 z-50 px-3 transition-all md:px-6 " + (scrolled ? "pt-2 md:pt-3" : "pt-3 md:pt-5")}
      >
        <div
          className={
            "mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-white/10 p-[8px] pl-4 backdrop-blur-xl transition-colors " +
            (dark ? "bg-navy/85" : "bg-navy/70 md:bg-white/5")
          }
        >
          <a href={solid ? asset("/") : "#"} className="flex shrink-0 items-center">
            <Logo />
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={href(item.href)}
                className="group relative text-[14px] font-medium text-white/70 transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-amber transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 px-3 py-2 text-[14px] font-semibold text-white/85 transition hover:text-white md:flex"
            >
              <Phone size={15} className="text-amber" /> {SITE.phone}
            </a>
            <button
              onClick={callback}
              className="hidden rounded-full bg-amber px-5 py-2.5 text-[14px] font-bold text-navy transition-all hover:scale-105 hover:bg-amber-dark active:scale-95 md:block"
            >
              Заказать звонок
            </button>
            <a href={SITE.phoneHref} aria-label="Позвонить" className="flex h-10 w-10 items-center justify-center rounded-full bg-amber text-navy md:hidden">
              <Phone size={18} />
            </a>
            <button
              onClick={() => setMenu(true)}
              aria-label="Меню"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col bg-navy/95 p-5 backdrop-blur-xl blueprint-grid"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setMenu(false)} aria-label="Закрыть" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                <X size={20} />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-1">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={href(item.href)}
                  onClick={() => setMenu(false)}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display rounded-2xl px-3 py-3 text-[22px] font-medium text-white/90 hover:bg-white/5"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-4 text-[16px] font-semibold text-white">
                <Phone size={18} className="text-amber" /> {SITE.phone}
              </a>
              <button
                onClick={() => {
                  setMenu(false);
                  callback();
                }}
                className="rounded-full bg-amber py-4 text-[16px] font-bold text-navy"
              >
                Заказать звонок
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

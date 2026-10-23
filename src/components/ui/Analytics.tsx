"use client";
import { useEffect } from "react";
import { cookieChoice } from "@/components/ui/CookieBanner";
import { SITE } from "@/lib/site";

/**
 * Яндекс.Метрика. Счётчик загружается только после согласия на аналитические
 * cookie — до этого ни один внешний скрипт не подключается и данные не уходят.
 *
 * Номер счётчика задаётся в SITE.metrikaId (src/lib/site.ts). Пока он пуст,
 * компонент не делает ничего.
 */
export default function Analytics() {
  useEffect(() => {
    const id = SITE.metrikaId;
    if (!id) return;

    let started = false;
    const start = () => {
      if (started || document.getElementById("ym-script")) return;
      started = true;

      type YM = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
      const w = window as unknown as Record<string, YM | undefined>;
      const ym: YM =
        w.ym ??
        Object.assign(
          function (...args: unknown[]) {
            (ym.a = ym.a || []).push(args);
          } as YM,
          { a: [] as unknown[][] }
        );
      ym.l = Date.now();
      w.ym = ym;

      const s = document.createElement("script");
      s.id = "ym-script";
      s.async = true;
      s.src = "https://mc.yandex.ru/metrika/tag.js";
      document.head.appendChild(s);

      ym(id, "init", {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    };

    if (cookieChoice() === "all") start();

    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "all") start();
    };
    window.addEventListener("rp-cookie-consent", onConsent);
    return () => window.removeEventListener("rp-cookie-consent", onConsent);
  }, []);

  return null;
}

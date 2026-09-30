"use client";
import { useEffect } from "react";

/** При открытии страницы (SPA-переход) прокручивает к началу мгновенно, не мешая якорям (#...). */
export default function ScrollTop() {
  useEffect(() => {
    if (window.location.hash) return;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    // вернуть плавную прокрутку для якорей после кадра
    requestAnimationFrame(() => {
      html.style.scrollBehavior = prev;
    });
  }, []);
  return null;
}

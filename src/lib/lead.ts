import { SITE } from "@/lib/site";

export function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  let n = d;
  if (n[0] === "8") n = "7" + n.slice(1);
  if (n[0] !== "7") n = "7" + n;
  const p = n.slice(1);
  let out = "+7";
  if (p.length > 0) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

export function isPhoneComplete(v: string) {
  return v.replace(/\D/g, "").length >= 11;
}

/**
 * Отправляет заявку на SITE.formEndpoint (веб-приложение Google Apps Script — см. /crm).
 * Content-Type намеренно text/plain: так браузер не делает preflight-запрос,
 * который Apps Script не умеет обрабатывать. Тело всё равно приходит JSON-строкой.
 * Без endpoint — демо-режим (успех через 0.7 с).
 */
export async function submitLead(payload: Record<string, string>) {
  if (!SITE.formEndpoint) {
    console.warn(
      "[ЛИДЕР] Заявка НЕ отправлена: не заполнен formEndpoint в src/lib/site.ts. " +
        "Вставьте URL веб-приложения Google Apps Script (инструкция — в папке /crm).",
      payload
    );
    await new Promise((r) => setTimeout(r, 700));
    return;
  }
  const body = JSON.stringify({
    page: typeof location !== "undefined" ? location.href : "",
    sentAt: new Date().toISOString(),
    ...payload,
  });
  const init: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body,
  };
  try {
    await fetch(SITE.formEndpoint, init);
  } catch {
    // Если ответ заблокирован политикой CORS — отправляем «вслепую»,
    // заявка всё равно доходит до таблицы.
    await fetch(SITE.formEndpoint, { ...init, mode: "no-cors" });
  }
}

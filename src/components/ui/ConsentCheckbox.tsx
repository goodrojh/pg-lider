"use client";
import React from "react";
import { Check } from "lucide-react";
import { asset } from "@/lib/site";

/**
 * Галочка согласия на обработку персональных данных.
 *
 * По 152-ФЗ согласие должно быть конкретным и выражаться активным действием,
 * поэтому поле не предзаполнено, а кнопка отправки без него неактивна.
 */
export default function ConsentCheckbox({
  checked,
  onChange,
  dark = false,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  /** Вариант для тёмного фона (подвал, секции на navy) */
  dark?: boolean;
  id: string;
}) {
  const label = dark ? "text-white/60" : "text-muted";
  const link = dark ? "text-white/85 hover:text-amber" : "text-ink hover:text-amber-dark";
  const box = checked
    ? "border-amber bg-amber text-navy"
    : dark
      ? "border-white/35 bg-white/5 text-transparent"
      : "border-black/20 bg-white text-transparent";

  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 text-left">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={`mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition peer-focus-visible:ring-4 peer-focus-visible:ring-amber/30 ${box}`}
      >
        <Check size={13} strokeWidth={3.5} />
      </span>
      <span className={`text-[12px] leading-[1.55] ${label}`}>
        Я согласен на{" "}
        <a
          href={asset("/soglasie-na-obrabotku/")}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`underline underline-offset-2 transition ${link}`}
        >
          обработку персональных данных
        </a>{" "}
        и ознакомлен с{" "}
        <a
          href={asset("/politika-konfidencialnosti/")}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`underline underline-offset-2 transition ${link}`}
        >
          политикой их обработки
        </a>
      </span>
    </label>
  );
}

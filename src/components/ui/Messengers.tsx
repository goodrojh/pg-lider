"use client";
import React from "react";
import { SITE, asset } from "@/lib/site";
import { useLead } from "@/components/ui/ModalProvider";

function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#26A5E4" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#fff" />
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.015 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path
        fill="#fff"
        d="M33.2 14.7A12.9 12.9 0 0 0 24 11c-7.2 0-13 5.8-13 13 0 2.3.6 4.5 1.7 6.4L11 37l6.8-1.8a13 13 0 0 0 6.2 1.6c7.2 0 13-5.8 13-13 0-3.5-1.3-6.7-3.8-9.1zM24 34.6c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4 1 1.1-3.9-.3-.4a10.8 10.8 0 0 1-1.6-5.7c0-6 4.8-10.8 10.8-10.8 2.9 0 5.6 1.1 7.6 3.2a10.7 10.7 0 0 1 3.2 7.6c0 6-4.9 10.7-11 10.7zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6-.1-.2-.7-1.7-1-2.4-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8s1.2 3.3 1.3 3.5c.2.2 2.3 3.6 5.7 5 2.1.9 2.9 1 3.9.8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"
      />
    </svg>
  );
}

function MaxIcon({ size = 20 }: { size?: number }) {
  return (
    <img
      src={asset("/img/msg/max.png")}
      alt="MAX"
      width={size}
      height={size}
      className="rounded-[7px]"
      style={{ width: size, height: size }}
    />
  );
}

/** Кнопки мессенджеров. Ссылки берутся из SITE.messengers; пустая ссылка → открываем форму. */
export default function Messengers({ size = 20, className = "" }: { size?: number; className?: string }) {
  const { open } = useLead();
  const items = [
    { key: "max", label: "MAX", href: SITE.messengers.max, icon: <MaxIcon size={size} /> },
    { key: "telegram", label: "Telegram", href: SITE.messengers.telegram, icon: <TelegramIcon size={size} /> },
    { key: "whatsapp", label: "WhatsApp", href: SITE.messengers.whatsapp, icon: <WhatsAppIcon size={size} /> },
  ];

  const box =
    "flex items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:scale-110 hover:bg-white/20 active:scale-95";
  const boxStyle = { width: size + 18, height: size + 18 };

  return (
    <div className={"flex items-center gap-1.5 " + className}>
      {items.map((m) =>
        m.href ? (
          <a key={m.key} href={m.href} target="_blank" rel="noreferrer" aria-label={m.label} title={m.label} className={box} style={boxStyle}>
            {m.icon}
          </a>
        ) : (
          <button
            key={m.key}
            aria-label={m.label}
            title={`Написать в ${m.label}`}
            onClick={() =>
              open({
                intent: "messenger-" + m.key,
                title: `Написать в ${m.label}`,
                subtitle: `Оставьте номер — напишем вам в ${m.label} и ответим на вопросы по объекту.`,
                fields: ["name", "phone", "comment"],
                submitLabel: `Написать в ${m.label}`,
              })
            }
            className={box}
            style={boxStyle}
          >
            {m.icon}
          </button>
        )
      )}
    </div>
  );
}

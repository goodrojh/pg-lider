"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * Единый заголовок секции: одинаковые размеры, отступы и выравнивание по всему сайту.
 * align="center" — для секций без действия справа; "left" — когда справа стоит кнопка (action).
 */
export default function SectionHeading({
  title,
  text,
  align = "center",
  action,
  dark = false,
  className = "",
}: {
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: "center" | "left";
  action?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={
        "mb-12 md:mb-16 " +
        (centered ? "mx-auto max-w-4xl text-center " : "flex flex-col gap-6 md:flex-row md:items-end md:justify-between ") +
        className
      }
    >
      <div className={centered ? "" : "max-w-2xl"}>
        <h2 className={"font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.01em] md:text-[46px] " + (dark ? "text-white" : "text-ink")}>
          {title}
        </h2>
        {text && (
          <p className={"mt-4 text-[16px] leading-relaxed md:mt-5 md:text-lg " + (dark ? "text-white/70" : "text-muted") + (centered ? " mx-auto max-w-2xl" : "")}>
            {text}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}

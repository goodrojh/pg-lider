import React from "react";
import { asset } from "@/lib/site";

/** Фирменный знак ПГ «ЛИДЕР» из презентации компании. */
export default function Logo({ light = true, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={"inline-flex items-center " + className}>
      <img
        src={asset(light ? "/img/logo-white.png" : "/img/logo.png")}
        alt="Проектная группа ЛИДЕР"
        width={160}
        height={80}
        className="h-[40px] w-auto md:h-[48px]"
      />
    </span>
  );
}

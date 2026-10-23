import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/ui/Header";
import ScrollTop from "@/components/ui/ScrollTop";
import Footer from "@/components/sections/Footer";
import { LEGAL } from "@/lib/legal";

/** Общая обёртка для правовых страниц: шапка, крошки, типографика текста. */
export default function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white">
      <ScrollTop />
      <Header solid />

      <section className="relative overflow-hidden bg-navy px-4 pb-14 pt-[120px] text-white blueprint-grid md:px-6 md:pb-16 md:pt-[150px]">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber/20 blur-[120px]" />
        <div className="relative mx-auto max-w-[900px]">
          <nav className="flex items-center gap-1.5 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white">Главная</Link>
            <ChevronRight size={14} />
            <span className="text-amber">Правовая информация</span>
          </nav>
          <h1 className="font-display mt-6 text-[28px] font-semibold leading-[1.1] tracking-[-0.01em] md:text-[42px]">
            {title}
          </h1>
          {intro && <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-white/75 md:text-base">{intro}</p>}
          <p className="mt-6 text-[13px] text-white/50">Редакция от {LEGAL.docsDate}</p>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-16">
        <article className="legal-doc mx-auto max-w-[900px]">{children}</article>
      </section>

      <Footer />
    </main>
  );
}

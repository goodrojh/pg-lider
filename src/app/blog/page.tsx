import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/ui/Header";
import ScrollTop from "@/components/ui/ScrollTop";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import InlineLeadForm from "@/components/ui/InlineLeadForm";
import PostGrid from "@/components/blog/PostGrid";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Статьи для заказчика проектирования — ПГ «ЛИДЕР»",
  description: "Экспертиза, ТУ, BIM, состав документации, стоимость проектирования — практические материалы от инженеров проектной группы «ЛИДЕР».",
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-white">
      <ScrollTop />
      <Header solid />
      <section className="relative overflow-hidden bg-navy px-4 pb-16 pt-[120px] text-white blueprint-grid md:px-6 md:pb-20 md:pt-[150px]">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber/20 blur-[120px]" />
        <div className="relative mx-auto max-w-[1400px]">
          <nav className="flex items-center gap-1.5 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white">Главная</Link>
            <ChevronRight size={14} />
            <span className="text-amber">Статьи</span>
          </nav>
          <h1 className="font-display mt-6 max-w-4xl text-[32px] font-semibold leading-[1.08] tracking-[-0.01em] md:text-[52px]">
            Полезное для заказчика, а не «новости компании»
          </h1>
          <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-white/75 md:text-lg">
            {POSTS.length} материалов о том, как пройти экспертизу с первого раза, не потерять месяцы на ТУ и не переплатить за проект.
            Пишут инженеры, которые ведут объекты, а не копирайтеры.
          </p>
        </div>
      </section>

      <section className="bg-paper px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <PostGrid />
        </div>
      </section>

      <section className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <InlineLeadForm
            intent="blog-index"
            title="Не нашли ответ на свой вопрос?"
            subtitle="Спросите ГИПа напрямую. Если вопрос интересный — напишем по нему статью, а вам ответим сразу."
            button="Задать вопрос ГИПу"
          />
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ChevronRight, Calendar } from "lucide-react";
import { POSTS, getPost, formatDate } from "@/lib/posts";
import { asset } from "@/lib/site";
import Header from "@/components/ui/Header";
import ScrollTop from "@/components/ui/ScrollTop";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import InlineLeadForm from "@/components/ui/InlineLeadForm";
import ArticleBody, { slugify } from "@/components/blog/ArticleBody";
import ArticleAside from "@/components/blog/ArticleAside";
import PostCard from "@/components/blog/PostCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — ПГ «ЛИДЕР»`,
    description: post.desc,
    openGraph: { title: post.title, description: post.desc, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = post.body.filter((b) => b.t === "h2").map((b) => ({ id: slugify(b.text), text: b.text }));
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <ScrollTop />
      <Header solid />

      {/* HERO BAND */}
      <section className="relative overflow-hidden bg-navy px-4 pb-24 pt-[120px] text-white blueprint-grid md:px-6 md:pb-32 md:pt-[150px]">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber/20 blur-[120px]" />
        <div className="relative mx-auto max-w-[1400px]">
          <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white">Главная</Link>
            <ChevronRight size={14} />
            <Link href="/blog/" className="hover:text-white">Статьи</Link>
            <ChevronRight size={14} />
            <span className="text-amber">{post.tag}</span>
          </nav>
          <h1 className="font-display mt-6 max-w-4xl text-[30px] font-semibold leading-[1.1] tracking-[-0.01em] md:text-[48px]">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-white/75 md:text-lg">{post.desc}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-[13px] text-white/60">
            <span className="inline-flex items-center gap-1.5"><Calendar size={14} className="text-amber" /> {formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-amber" /> {post.readTime} мин чтения</span>
            <span>Авторы: инженеры ПГ «ЛИДЕР»</span>
          </div>
        </div>
      </section>

      {/* COVER */}
      <div className="px-4 md:px-6">
        <div className="mx-auto -mt-16 max-w-[1400px] md:-mt-20">
          <div className="overflow-hidden rounded-[28px] shadow-2xl">
            <img src={asset(post.image)} alt={post.title} className="h-[240px] w-full object-cover md:h-[460px]" />
          </div>
        </div>
      </div>

      {/* BODY */}
      <section className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,780px)_320px] lg:justify-between">
          <article>
            <ArticleBody blocks={post.body} />
            <div className="mt-14">
              <InlineLeadForm intent={"article-" + post.slug} title={post.cta.title} subtitle={post.cta.subtitle} button={post.cta.button} context={post.title} />
            </div>
          </article>
          <ArticleAside toc={toc} title={post.title} />
        </div>
      </section>

      {/* MORE */}
      <section className="bg-paper px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-[28px] font-semibold leading-tight text-ink md:text-[36px]">Читайте также</h2>
            <Link href="/blog/" className="text-[15px] font-semibold text-ink underline-offset-4 hover:underline">
              Все статьи →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {others.map((p) => (
              <PostCard key={p.slug} post={p} compact />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </main>
  );
}

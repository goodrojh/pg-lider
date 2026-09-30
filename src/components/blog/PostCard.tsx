import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { asset } from "@/lib/site";
import { formatDate, type Post } from "@/lib/posts";

export default function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group flex flex-col rounded-[20px] border border-black/5 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(10,22,40,0.10)]"
    >
      <div className={"w-full overflow-hidden rounded-[14px] " + (compact ? "h-[170px]" : "h-[220px]")}>
        <img loading="lazy" decoding="async" src={asset(post.image)} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-center gap-3 text-[12px] text-muted">
        <span className="font-semibold text-amber-dark">{post.tag}</span>
        <span>·</span>
        <span>{formatDate(post.date)}</span>
        <span className="ml-auto inline-flex items-center gap-1">
          <Clock size={12} /> {post.readTime} мин
        </span>
      </div>
      <h3 className="mt-2.5 text-[17px] font-bold leading-[1.35] text-ink group-hover:underline group-hover:decoration-amber group-hover:underline-offset-4">
        {post.title}
      </h3>
      {!compact && <p className="mt-2 line-clamp-3 text-[14px] leading-[1.6] text-muted">{post.desc}</p>}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-semibold text-ink">
        Читать <span className="text-[16px] leading-none transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

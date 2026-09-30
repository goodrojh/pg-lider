"use client";
import React from "react";
import { POSTS } from "@/lib/posts";
import PostGrid from "@/components/blog/PostGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Blog() {
  return (
    <section id="blog" className="w-full bg-paper px-4 py-[80px] md:px-6 md:py-[110px]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Полезное для заказчика, а не «новости компании»"
          text={`${POSTS.length} материалов от инженеров: экспертиза, ТУ, BIM, состав документации, стоимость. Каждая статья открывается и читается прямо на сайте, а под каждой услугой выше — подборка по направлению.`}
        />
        <PostGrid center initial={12} />
      </div>
    </section>
  );
}

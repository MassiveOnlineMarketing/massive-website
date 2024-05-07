import React from "react";

import { BlogPost } from "@/payload/payload-types";
import { cn } from "@/lib/utils";

import BlogCard from "@/website/blog/blog-card";
import { Heading } from "@/components/ui/typography/typography";

const RenderRelatedPosts = (posts: any, containerStyles?: string) => {
  // console.log('posts', posts);

  return (
    <>
      <Heading level="h2" size="2xl">
        {DATA.heading}
      </Heading>
      <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-[#D1D5DB]/0 via-50% via-[#D1D5DB] to-[#D1D5DB]/0"></div>
      <div
        className={cn(
          "mt-6 flex gap-3  overflow-auto snap-mandatory snap-x scroll-px-4",
          containerStyles,
        )}
      >
        {posts.relatedPosts.map((post: BlogPost) => {
          return (
            <BlogCard
              key={post.id}
              {...post}
              containerStyles="min-w-[300px] xs390:min-w-[320px] md:min-w-[400px] max-w-[450px] snap-start "
            />
          );
        })}
      </div>
    </>
  );
};

export default RenderRelatedPosts;

const DATA = {
  heading: "Aanbevolen Artikelen",
};

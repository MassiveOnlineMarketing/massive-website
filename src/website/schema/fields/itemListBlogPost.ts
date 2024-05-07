import { BlogPost, Writer } from "@/payload/payload-types";
import { BASE_URL } from "../../../../routes";
import authorField from "./author";
import { stringToArray } from "@/lib/utils";

export default function itemListElementBlogPosts(blogPosts: BlogPost[]) {
  const schema = blogPosts.map((post: BlogPost, index: number) => {
    const schemaItem = {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        url: `${BASE_URL}/blog/${post.slug}`,
        headline: post.title,
        description: post.meta?.description,
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        publisher: {
          "@type": "Organization",
          name: "Massive Online Marketing",
        },
        image: {
          "@type": "ImageObject",
          // @ts-ignore
          url: `${BASE_URL}${post.heroImage.url}`,
          // @ts-ignore
          width: post.heroImage.width,
          // @ts-ignore
          height: post.heroImage.height,
        },
      },
    };

    if (post.writers && post.writers.length > 0) {
      // @ts-ignore
      schemaItem["item"] = {
        ...schemaItem["item"],
        // @ts-ignore
        author: authorField(post.writers),
      };
    }

    if (post.keywords) {
      const keywordsArray = stringToArray(post.keywords);

      // @ts-ignore
      schemaItem["item"] = {
        ...schemaItem["item"],
        // @ts-ignore
        keywords: keywordsArray,
      };
    }

    return schemaItem;
  });

  return schema;
}

import { BlogPost } from "@/payload/payload-types";
import itemListElementBlogPosts from "../fields/itemListBlogPost";

export default function BlogCollectionPage(blogPosts: BlogPost[]) {
  const schema = {
    "@type": "CollectionPage",
    mainEntity: {
      "@type": "ItemList",
    },
  };

  schema["mainEntity"] = {
    ...schema["mainEntity"],
    // @ts-ignore
    itemListElement: itemListElementBlogPosts(blogPosts),
  };

  return schema;
}

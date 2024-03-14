import { BlogPost, Writer } from "@/payload/payload-types";
import { BASE_URL } from "../../../../routes";

export default function blogPostMentionField(relatedPosts: BlogPost[]) {
    return relatedPosts.map((post: BlogPost) => {
        return {
            "@type": "BlogPosting",
            "url": `${BASE_URL}/blog/${post.slug}`,
            "inLanguage": "nl-NL",
            "headline": post.title,
            "description": post.meta?.description,
            "datePublished": post.createdAt,
            "dateModified": post.updatedAt,
            "author": post.writers?.map((author: Writer | string) => {
                if (typeof author === 'string') {
                    // Handle the string case
                    return {
                        "@type": "Person",
                        "name": author
                    }
                } else {
                    // Handle the Writer case
                    return {
                        "@type": "Person",
                        "name": author.fullName
                    }
                }
            }),
            "publisher": {
                "@type": "Organization",
                "name": "Massive Online Marketing"
            },
            "image": {
                "@type": "ImageObject",
                // @ts-ignore
                "url": `${BASE_URL}${post.heroImage.url}`,
                // @ts-ignore
                "width": post.heroImage.width,
                // @ts-ignore
                "height": post.heroImage.height
            }
        }
    });
}
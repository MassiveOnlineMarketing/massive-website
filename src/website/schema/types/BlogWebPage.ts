import { BlogPost } from "@/payload/payload-types"
import { BASE_URL } from "../../../../routes"

import blogPostMentionField from "../fields/blogPostMentions"
import authorField from "../fields/author"
import organizationSchema from "../fields/organization"
import { stringToArray } from "@/lib/utils"

export default function BlogWebPage(blogData: BlogPost) {
    // console.log('blogData', blogData)
    const schema = {
        "@type": "WebPage",
        "inLanguage": "nl-NL",
        "mainEntity": {
            "@type": "BlogPosting",
            "headline": blogData.title,
            "description": blogData.meta?.description,
            "image": {
                "@type": "ImageObject",
                // @ts-ignore
                "url": `${BASE_URL}${blogData.heroImage.url}`,
                // @ts-ignore
                "width": blogData.heroImage.width,
                // @ts-ignore
                "height": blogData.heroImage.height
            },
            "datePublished": blogData.createdAt,
            "dateModified": blogData.updatedAt,
            "url": `${BASE_URL}/blog/${blogData.slug}`,
        },
    }

    if (blogData.relatedPosts && blogData.relatedPosts.length > 0) {
        // @ts-ignore
        schema["mentions"] = blogPostMentionField(blogData.relatedPosts)
    }

    if (blogData.writers && blogData.writers.length > 0) {
        // @ts-ignore
        schema["mainEntity"] = {
            ...schema["mainEntity"],
            // @ts-ignore
            author: authorField(blogData.writers)
        }
    }

    if (blogData.keywords) {
        const keywordsArray = stringToArray(blogData.keywords)
        // @ts-ignore
        schema["mainEntity"] = {
            ...schema["mainEntity"],
            // @ts-ignore
            keywords: keywordsArray
        }
    }

    schema["mainEntity"] = {
        ...schema["mainEntity"],
        // @ts-ignore
        "publisher": organizationSchema()
    }


    return schema
};
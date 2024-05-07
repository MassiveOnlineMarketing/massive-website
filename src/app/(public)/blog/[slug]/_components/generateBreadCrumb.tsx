import React from "react";
import Link from "next/link";
import { BASE_URL } from "../../../../../../routes";

import { BlogPost, Category, Tag } from "@/payload/payload-types";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Script from "next/script";

const GenerateBreadCrumb = ({ blogPost }: { blogPost: BlogPost }) => {
  const categoryObj = blogPost.categories as Category;
  const tagObj = blogPost.tags as Tag;

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className=" mx-auto flex flex-row gap-1 items-center  text-sm leading-5 font-normal text-gray-400"
      >
        <Link className="hidden md:block" href={`${BASE_URL}`}>
          Massive Online Marketing
        </Link>
        <span className="hidden md:block">
          {" "}
          <ChevronRightIcon className="w-4 h-4 mr-1" />{" "}
        </span>
        <Link href={`${BASE_URL}/blog`}>Blogs</Link>
        <span>
          {" "}
          <ChevronRightIcon className="w-4 h-4 mr-1" />{" "}
        </span>
        <Link
          href={`${BASE_URL}/blog/categorie/${categoryObj.slug}`}
          className={tagObj?.title ? "" : "text-gray-500"}
        >
          {categoryObj.title}
        </Link>
        {tagObj?.title && (
          <>
            <span>
              {" "}
              <ChevronRightIcon className="w-4 h-4 mr-1" />{" "}
            </span>
            <Link
              href={`${BASE_URL}/blog/categorie/${categoryObj.slug}`}
              className="text-gray-500"
            >
              {tagObj.title}
            </Link>
          </>
        )}
      </nav>
      <Script id="breadcrumb-schema" type="application/ld+json">
        {`
                    ${JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "BreadcrumbList",
                      itemListElement: [
                        {
                          "@type": "ListItem",
                          position: 1,
                          name: "Massive Online Marketing",
                          item: BASE_URL,
                        },
                        {
                          "@type": "ListItem",
                          position: 2,
                          name: "Blogs",
                          item: `${BASE_URL}/blog`,
                        },
                        {
                          "@type": "ListItem",
                          position: 3,
                          name: categoryObj.title,
                          item: `${BASE_URL}/blog/categorie/${categoryObj.slug}`,
                        },
                        tagObj?.title && {
                          "@type": "ListItem",
                          position: 4,
                          name: tagObj.title,
                          item: `${BASE_URL}/blog/categorie/${categoryObj.slug}/${tagObj.slug}`,
                        },
                      ],
                    })}
                `}
      </Script>
    </>
  );
};

export default GenerateBreadCrumb;

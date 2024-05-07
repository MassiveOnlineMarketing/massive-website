import React from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Script from "next/script";

// Utils
import { PAYLOAD_BACKEND_URL } from "../../../../../routes";
import { formatDate } from "@/lib/utils";

// Payload
import { BlogPost, Writer } from "@/payload/payload-types";
import { generateMeta } from "@/payload/utils/generateMetaData";
import RenderBlocks from "@/payload/utils/RenderBlocks";
import { fetchBlogPostById } from "@/payload/api/fetch-blog-post-by-slug";
import GenerateBreadCrumb from "./_components/generateBreadCrumb";

// Components
import { Heading, Paragraph } from "@/components/ui/typography/typography";
import RenderRelatedPosts from "./_components/renderRelatedPosts";
import { NavbarWithTopbar } from "@/website/partials/navbar-with-topbar";
import AuthorsCard from "./_components/authors-card";
import NiewsbriefSignupBar from "@/website/features/contact/niewsbrief-signup-bar-blog";
import Footer from "@/website/partials/footer";
import { ProgressBar } from "./_components/progres-bar";

// Styles
import container from "@/styles/styles";
import { BottomBackground } from "./_assets";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { BookOpenIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

// Schema
import generateSchema from "@/website/schema/generate-schema";
import axios from "axios";

// type pageProps = {
//     params: {
//         slug: string
//     }
// }

export default async function BlogPage({ params: { slug = "home" } }) {
  console.log("page", slug);

  let blogData = null;
  try {
    const response = await fetchBlogPostById(slug);
    blogData = response.props.page;
  } catch (error) {
    console.error("error", error);
    redirect("/404");
  }

  if (!blogData) {
    redirect("/404");
  }
  // console.log('blogData', blogData)

  const publishedAt = formatDate(blogData.publishedAt);
  const authors: Writer[] = blogData.writers;
  // console.log('authors', blogData)

  const schema = generateSchema("BlogWebPage", blogData);

  return (
    <div className=" bg-white lg:bg-gradient-to-r from-[#f2f2ff] via-16% via-[#f8f8ff] via-50% via-[#fff] via-84% via-[#f8f8ff] to-[#f2f2ff]">
      <NavbarWithTopbar />
      <ProgressBar />
      <main className={`pt-[70px] md:pt-[140px] pb-40`}>
        <div className={`${container.maxWidthGutter} relative z-10`}>
          <section className={`py-12 flex text-center flex-col gap-6`}>
            <GenerateBreadCrumb blogPost={blogData} />
            <Heading level="h1" size="5xl">
              {blogData.title}
            </Heading>

            <div className="mx-auto md:flex md:items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="mb-2 md:mb-0 flex gap-2 items-center justify-center">
                <PencilSquareIcon className="w-5 h-5" />
                <p aria-label="author">
                  {authors.map((author) => author.fullName).join(" & ")}
                </p>
              </div>
              <div
                aria-label="separator"
                className="md:block w-[6px] h-[6px] bg-gray-500 rounded-full hidden"
              ></div>
              <div className="justify-center flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <time aria-label="published date" dateTime={publishedAt}>
                    {publishedAt}
                  </time>
                </div>
                <div
                  aria-label="separator"
                  className="w-[6px] h-[6px] bg-gray-500 rounded-full"
                ></div>
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5" aria-label="book icon" />
                  <p aria-label="reading time">{blogData.timeToRead} minuten</p>
                </div>
              </div>
            </div>
          </section>

          <Image
            className="mx-auto max-w-[800px] w-full rounded-2xl"
            priority={true}
            src={`${PAYLOAD_BACKEND_URL}${blogData.heroImage.url}`}
            alt={blogData.heroImage.alt}
            width={blogData.heroImage.width}
            height={blogData.heroImage.height}
          />

          <article className={`mt-[44px] max-w-[800px] mx-auto`}>
            <RenderBlocks layout={blogData.layout} />
          </article>

          <AuthorsCard
            authors={authors}
            containerStyles=" pt-[70px] md:mt-[140px]"
          />
        </div>

        <section
          className={`text-center relative w-full pt-[70px] md:mt-[140px]`}
        >
          <div className={`  ${container.maxWidthGutter}`}>
            <Heading
              level="h2"
              size="5xl"
              colorScheme="gray-700"
              className="text-center z-10"
            >
              {NIEWUSBRIEF.heading}
            </Heading>
            <Paragraph colorScheme="gray-500" className="mt-2 z-10">
              {NIEWUSBRIEF.paragraph}
            </Paragraph>

            <NiewsbriefSignupBar containerStyles="mt-[30px] max-w-[550px] w-full relative z-10" />
          </div>
          <BottomBackground className="absolute bottom-0 w-full" />
        </section>

        <section className={`${container.maxWidthGutter} mt-[70px]`}>
          {blogData.relatedPosts && (
            <RenderRelatedPosts relatedPosts={blogData.relatedPosts} />
          )}
        </section>
      </main>

      <Footer />

      <Script type="application/ld+json" id="blog-post-schema">
        {JSON.stringify(schema)}
      </Script>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const response = await axios(
      `${process.env.PAYLOAD_BACKEND_URL}/api/blog-posts?limit=1000`,
    );
    const pages: BlogPost[] = response.data.docs;
    return pages
      .filter((page) => page.visable === true)
      .map((page) => page.slug);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params: { slug = "home" } }) {
  let page: BlogPost | null = null;

  try {
    const response = await fetchBlogPostById(slug);
    page = response.props.page;
    // console.log('response', response)
  } catch (error) {
    console.error("error", error);

    revalidatePath("/blog");
  }

  if (page) {
    return generateMeta({ doc: page });
  }
}

const NIEWUSBRIEF = {
  heading: "Schrijf je in voor onze nieuwsbrief",
  paragraph:
    "Blijf op de hoogte binnen de Online Marketing en meer door je in teschrijven in onze nieuwsbrief",
};

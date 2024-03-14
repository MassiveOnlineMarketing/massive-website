import React from 'react'
import Script from 'next/script'

import { fetchBlogPosts } from '@/payload/api/fetch-blog-posts'
import { BlogPost } from '@/payload/payload-types'

import Footer from '@/website/partials/footer'
import { Heading, Paragraph } from '@/components/ui/typography/typography'
import { NavbarWithTopbar } from '@/website/partials/navbar-with-topbar'

import RenderPosts from './_components/renderPosts'
import Navigation from './_components/navigation'
import Pagination from './_components/pagination'

import container from '@/styles/styles'

import generateSchema from '@/website/schema/generate-schema'
import { BASE_URL } from '../../../../routes'

type pageProps = {
    searchParams: {
        page: string
    }
}

export default async function page({ searchParams }: pageProps) {
    const currentPageNumber = parseInt(searchParams.page);
    const pageNumber = isNaN(currentPageNumber) ? 1 : currentPageNumber;


    let blogPosts: BlogPost[] = []
    let pagination = {
        numberOfPages: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0,
    }

    try {
        const response = await fetchBlogPosts({ limit: 27, page: pageNumber })
        // console.log('response', response.props);
        blogPosts = response.props.page.docs
        pagination = {
            numberOfPages: response.props.page.totalPages,
            hasPrevPage: response.props.page.hasPrevPage,
            hasNextPage: response.props.page.hasNextPage,
            prevPage: response.props.page.prevPage,
            nextPage: response.props.page.nextPage,
        }
    } catch (error) {
        console.error(error)
    }

    const schema = generateSchema('BlogCollectionPage', blogPosts)

    return (
        <>
            <NavbarWithTopbar />
            <div className='bg-primary-50'>
                <main className='pb-[100px]'>
                    <div className={`${container.maxWidthGutter} pt-[60px] md:pt-[140px]`}>
                        <div className='pt-12 pb-5'>
                            <Heading level='h1' size='5xl' >Blog</Heading>

                            <Paragraph size='lg' className='mt-6'>Welkom bij Massive Online Marketing, dé plek waar de grenzen van digitaal zakendoen voortdurend worden verlegd. Onze nieuwste blogcollectie duikt diep in de essentiële facetten van online marketing die elke ondernemer en marketeer moet kennen. Of je nu een doorgewinterde professional bent of net begint, onze inzichten in Design, Social Media, Webshops, Websites, SEO en Marketing strategieën zullen je gereedschapskist voor online succes aanzienlijk verrijken.</Paragraph>

                        </div>

                        <Navigation isCategory currentHighlight='blog' />

                        <section className='h-fit'>
                            <RenderPosts posts={blogPosts} />
                        </section>

                        <Pagination pagination={pagination} currentPageNumber={pageNumber} />
                    </div>
                </main>


            <Footer />
            </div>

            <Script type="application/ld+json" id={`blog-collection-home`}>
                {JSON.stringify(schema)}
            </Script>
        </>
    )
}


export async function generateMetadata({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const currentPageNumber = parseInt(searchParams.page);
    const pageNumber = isNaN(currentPageNumber) ? 1 : currentPageNumber;
    const canonicalUrl = `${BASE_URL}/blog?page=${pageNumber}`;

    return {
        title: 'Blog',
        description: 'De blog dfjh sdahjgfklasdhf hds jkafhf dasljkfh asdhjf sajkhdf sajdklhfjashf',
        alternates: {
            canonical: canonicalUrl,
        },
    };
}
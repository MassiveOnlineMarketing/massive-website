import { fetchBlogPostByCatagories } from '@/payload/api/fetch-blog-post-by-catagorie'
import { fetchCategoryInformation } from '@/payload/api/fetch-category-id'
import { BlogPost, Category, Tag } from '@/payload/payload-types'
import React from 'react'
import Navigation from '../../_components/navigation'
import { fetchCategories } from '@/payload/api/fetch-categories'
import { fetchTagsByCategoryId } from '@/payload/api/fetch-tags-by-category'
import { NavbarWithTopbar } from '@/website/partials/navbar-with-topbar'
import container from '@/styles/styles'
import RenderPosts from '../../_components/renderPosts'
import Pagination from '../../_components/pagination'
import Script from 'next/script'
import generateSchema from '@/website/schema/generate-schema'
import { Heading, Paragraph } from '@/components/ui/typography/typography'
import Footer from '@/website/partials/footer'
import { generateMeta } from '@/payload/utils/generateMetaData'

type pageProps = {
    params: {
        slug: string
    },
    searchParams: {
        page: string
    }
}

export default async function page({ params, searchParams }: pageProps) {
    // console.log('params', params)
    const currentPageNumber = parseInt(searchParams.page)
    const pageNumber = isNaN(currentPageNumber) ? 1 : currentPageNumber
    // console.log('currentPageNumber', pageNumber)

    let category: Category | null = null

    try {
        const response = await fetchCategoryInformation(params.slug)
        // console.log('response', response)
        category = response.docs[0]
    } catch (error) {
        console.error('error', error)
    }



    let blogPosts: BlogPost[] = []
    let pagination = {
        numberOfPages: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0,
    }

    try {
        // @ts-ignore
        const response = await fetchBlogPostByCatagories(category.id, { limit: 27, page: pageNumber })
        blogPosts = response.props.page.data.docs.filter((post: BlogPost) => post.visable === true)
        pagination = {
            numberOfPages: response.props.page.data.totalPages,
            hasPrevPage: response.props.page.data.hasPrevPage,
            hasNextPage: response.props.page.data.hasNextPage,
            prevPage: response.props.page.data.prevPage,
            nextPage: response.props.page.data.nextPage,
        }

        // loop over the blogPosts and get the tags
        // for (let i = 0; i < response.props.page.data.docs.length; i++) {
        //     if (response.props.page.data.docs[i].tags) {
        //         tags.push(response.props.page.data.docs[i].tags)
        //     }
        // }

    } catch (error) {
        console.error('error', error)
    }


    let categories: Category[] = []

    try {
        const response = await fetchCategories()
        categories = response.docs
    } catch (error) {
        console.error('error', error)
    }


    let tags: Tag[] = []

    try {
        // @ts-ignore
        const response = await fetchTagsByCategoryId(category.id)
        tags = response.props.tags
    } catch (error) {
        console.error('error', error)
    }

    const schema = generateSchema('BlogCollectionPage', blogPosts)



    if (!category) {
        return <div>Category not found</div>
    }

    return (
        <>
            <NavbarWithTopbar />

            <div className='bg-primary-50'>
                <main className='pb-[100px]'>
                    <div className={`${container.maxWidthGutter} pt-[60px] md:pt-[140px]`}>
                        <div className='pt-12 md:pt-0 pb-5 max-w-[750px]'>
                            <Heading level='h1' size='5xl' >{category.contentTitle}</Heading>
                            <Paragraph size='lg' className='mt-6'>{category.contentDescription}</Paragraph>
                        </div>

                        <Navigation isCategory currentHighlight={params.slug} />

                        <section className='h-fit'>
                            <RenderPosts posts={blogPosts} />
                        </section>

                        <Pagination pagination={pagination} currentPageNumber={pageNumber} />
                    </div>
                </main>


                <Footer />
            </div>

            <Script type="application/ld+json" id={`blog-collection-catagory-${params.slug}`}>
                {JSON.stringify(schema)}
            </Script>

        </>
    )
}


export async function generateMetadata({ params, searchParams }: pageProps) {
    const currentPageNumber = parseInt(searchParams.page)
    const pageNumber = isNaN(currentPageNumber) ? 1 : currentPageNumber
    const canonicalUrl = `${process.env.PAYLOAD_BACKEND_URL}/blog/categorie/${params.slug}?page=${pageNumber}`

    let category: Category | null = null

    try {
        const response = await fetchCategoryInformation(params.slug)
        category = response.docs[0]
    } catch (error) {
        console.error('error', error)
    }

    let metaSchema = {}
    if (category) {
        const response = generateMeta({ doc: category })

        metaSchema = response
    }

    // @ts-ignore
    metaSchema.alternates = {
        canonical: canonicalUrl,
    };
    
    return metaSchema;
}
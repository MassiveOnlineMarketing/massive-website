const fs = require('fs');
const axios = require('axios');
const xml2js = require('xml2js');
require('dotenv').config();

async function generateSitemap() {
    const categories = await axios(`${process.env.PAYLOAD_BACKEND_URL}/api/categories`);
    const categoryPaths = categories.data.docs.map((category) => `/blog/categorie/${category.slug}`);

    const tags = await axios(`${process.env.PAYLOAD_BACKEND_URL}/api/tags`);
    const tagPaths = []

    tags.data.docs.map((tag) => {
        tagPaths.push(`/blog/categorie/${tag.categories.slug}/${tag.slug}`)
    })

    const postPaths = []
    const page = 1 
    const getPosts = async function (page) {

        const posts = await axios(`${process.env.PAYLOAD_BACKEND_URL}/api/blog-posts?limit=10&page=${page}`)

        if (posts.data.docs.length > 0) {
            posts.data.docs.map((post) => {
                if (post.visable === true){
                    return postPaths.push(`/blog/${post.slug}`)
                } else {
                    return null
                }
            })
        }

        if (posts.data.nextPage !== null) {
            page++
            await getPosts(page);
        }
    }

    await getPosts(page);


    const allPaths = categoryPaths.concat(tagPaths, postPaths, categoryPaths)

    const builder = new xml2js.Builder({ headless: true});
    let xml = builder.buildObject({
        urlset: {
            $: {
                xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
            },
            url: allPaths.map(path => ({
                loc: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${path}`,
                lastmod: new Date().toISOString(),
                changefreq: 'daily',
                priority: 0.7
            }))
        }
    });
    
    xml = '<?xml version="1.0" encoding="UTF-8"?>' + xml;

    fs.writeFileSync('./public/sitemap-blog.xml', xml);

    console.log('Blog Sitemap Generated');
}

generateSitemap();
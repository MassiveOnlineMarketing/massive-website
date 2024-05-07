/** @type {import('next-sitemap').IConfig} */
const axios = require("axios");
require("dotenv").config();

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  // exclude: ['/protected-page', '/awesome/secret-page'],
  // alternateRefs: [
  //   {
  //     href: 'https://es.example.com',
  //     hreflang: 'es',
  //   },
  //   {
  //     href: 'https://fr.example.com',
  //     hreflang: 'fr',
  //   },
  // ],
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      // alternateRefs: config.alternateRefs ?? [],
    };
  },
  //   additionalPaths: async (config) => {
  //     const categories = await axios(`${process.env.PAYLOAD_BACKEND_URL}/api/categories`);
  //     const categoryPaths = categories.data.docs.map((category) => `/blog/categorie/${category.slug}`);
  //     console.log('categoryPaths', categoryPaths);

  //     return categoryPaths.map(path => {
  //         console.log('path', path);
  //         return config.transform(config, { loc: path });
  //     });
  // },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app/", "/auth/", "/api/"],
      },
      // {
      //   userAgent: 'test-bot',
      //   allow: ['/path', '/path-2'],
      // },
      // {
      //   userAgent: 'black-listed-bot',
      //   disallow: ['/sub-path-1', '/path-2'],
      // },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sitemap-blog.xml`,
    ],
  },
};

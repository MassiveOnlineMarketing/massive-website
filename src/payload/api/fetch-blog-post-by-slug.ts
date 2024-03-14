import axios from "axios";

export const fetchBlogPostById = async (slug: string) => {
    
    const pageReq = await axios(`${process.env.PAYLOAD_BACKEND_URL}/api/blog-posts?where[slug][equals]=${slug}`);

    // console.log('pageReq', pageReq.data);
    let pageData = pageReq.data.docs[0];

    return {
        props: {
            page: pageData
        }
    }
}
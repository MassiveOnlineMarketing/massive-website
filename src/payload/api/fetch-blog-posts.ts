import axios from "axios";


export const fetchBlogPosts = async ({ limit = 12, page = 1 }: { limit?: number, page?: number } = {}) => {
    
    const pageReq = await axios(`${process.env.PAYLOAD_BACKEND_URL}/api/blog-posts?limit=${limit}&page=${page}`);

    // console.log('pageReq', pageReq.data);
    let pageData = pageReq.data;

    return {
        props: {
            page: pageData
        }
    }
}
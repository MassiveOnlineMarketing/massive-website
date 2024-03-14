import axios from "axios";

export const fetchCategoryInformation = async (slug: string) => {
    
    const pageReq = await axios(`${process.env.PAYLOAD_BACKEND_URL}/api/categories?where[slug][equals]=${slug}`);

    // console.log('pageReq', pageReq.data);

    return pageReq.data
}
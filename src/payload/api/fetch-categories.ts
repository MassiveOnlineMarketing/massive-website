import axios from "axios";

export const fetchCategories = async () => {
    
    const pageReq = await axios(`${process.env.PAYLOAD_BACKEND_URL}/api/categories`);

    // console.log('pageReq', pageReq.data);
    

    return pageReq.data;
}
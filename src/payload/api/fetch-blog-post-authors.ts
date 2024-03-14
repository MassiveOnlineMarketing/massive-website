import axios from "axios";

export const fetchBlogPostAuthors = async ({ ids }: {ids: string | string[]}) => {

    console.log('ids', ids[0]);

    console.log(`${process.env.PAYLOAD_BACKEND_URL}/api/writes/${ids[0]}`)

    const authorsReq = await fetch(`${process.env.PAYLOAD_BACKEND_URL}/api/writes/${ids[0]}`);

    console.log('authorsReq', authorsReq);
    // let authors = authorsReq.data.docs;

    // return {
    //     props: {
    //         authors: authors 
    //     }
    // }
}
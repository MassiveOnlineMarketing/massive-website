import axios from "axios";

/**
 * Fetches blog posts by categories.
 * @param id - The ID of the category.
 * @param options - Optional parameters for pagination (limit and page).
 * @returns An object with the fetched blog post data.
 */
export const fetchBlogPostByCatagories = async (
  id: string,
  {
    limit = 2,
    page = 1,
  }: {
    limit?: number;
    page?: number;
  } = {},
) => {
  const response = await axios(
    `${process.env.PAYLOAD_BACKEND_URL}/api/blog-posts?where[categories][in][]=${id}&limit=${limit}&page=${page}`,
  );

  let pageData = response;

  return {
    props: {
      page: pageData,
    },
  };
};

import axios from "axios";

export const fetchTagsByCategoryId = async (categoryId: string) => {
  const response = await axios.get(
    `${process.env.PAYLOAD_BACKEND_URL}/api/tags?where[categories][equals]=${categoryId}`,
  );

  const tags = response.data.docs;

  return {
    props: {
      tags,
    },
  };
};

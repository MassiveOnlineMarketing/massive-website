import axios from "axios";

export const fetchConnectedSites = async (refreshToken: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/get_sites?refresh_token=${refreshToken}`;
    const res = await axios(url);

    // console.log('res', res)
    return res.data.siteEntry;
  } catch (error) {
    console.error(error);
  }
};

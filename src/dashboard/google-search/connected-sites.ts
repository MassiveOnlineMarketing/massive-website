import axios from "axios"


export const fetchConnectedSites = async (refreshToken: string) => {
    const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/get_sites?refresh_token=${refreshToken}`
    console.log(url)    
    const res = await axios(url)
    
    return res.data.siteEntry
}
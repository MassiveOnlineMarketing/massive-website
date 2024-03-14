// @ts-nocheck

import { BASE_URL } from "../../../../routes"

export default function organizationSchema() {
    const schema = {
        "@type": "Organization",
        "name": "Massive Online Marketing",
        "alternateName": "Massive",
        "url": BASE_URL,
        "logo": `${BASE_URL}/massivelogo`,
        "sameAs": BASE_URL,
        "sameAs": "https://www.facebook.com/profile.php?id=61553379522027",
        "sameAs": "https://www.instagram.com/massiveonlinemarketing",
        "sameAs": "https://www.linkedin.com/company/massiveonlinemarketing",
    }

    return schema
}
import { BASE_URL } from "../../../../routes"

export default function webSiteSchema() {
    const schema = {
        "@type": "WebSite",
        "name": "Massive Online Marketing",
        "alternateName": "Massive",
        "url": BASE_URL,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${BASE_URL}/?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        },
        "inLanguage": "nl-NL"
    }

    return schema
}
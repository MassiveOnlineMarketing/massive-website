import { Offer } from "../types/Service";

export default function offerCatalog(data: Offer[], name: string) {
    const schema = {
        "@type": "OfferCatalog",
        "name": name,
        "itemListElement": data.map((offer, index) => {
            let offerObject = {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Product",
                    "name": offer.name,
                    "description": offer.description,
                }
            };

            if (offer.sameAs) {
                // @ts-ignore
                offerObject.itemOffered.sameAs = offer.sameAs;
            }

            return offerObject;
        })
    }

    return schema;
}
import offerCatalog from "../fields/offerCatalog"
import organizationSchema from "../fields/organization"

type BaseService = {
    name: string
    serviceType: string
    description: string
    seviceCategory: string
}

type ServiceWithOffers = {
    offers: Offer[];
    serviceOutput?: never;
}

type ServiceWithOutput = {
    offers?: never;
    serviceOutput: string[];
}


export type Service = ServiceWithOffers & BaseService | ServiceWithOutput & BaseService

export type Offer = {
    name: string
    description: string
    sameAs?: string
}


export default function ServiceSchema(data: Service) {
    let schema = {
        "@type": "Service",
        "serviceType": data.serviceType,
        "description": data.description,
        "category": data.seviceCategory,
    }

    // @ts-ignore
    schema['provider'] = organizationSchema()

    if (Array.isArray(data.offers)) {
        // @ts-ignore
        schema["hasOfferCatalog"] = offerCatalog(data.offers, data.name)
    } else {
        schema = {
            ...schema,
            // @ts-ignore
            serviceOutput: data.serviceOutput
        }
    }

    return schema
}
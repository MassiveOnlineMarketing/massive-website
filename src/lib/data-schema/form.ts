import { z } from 'zod';

export const formSchema = z.object({

    // favoriteFoods: z.array(z.enum(['pizza doos', 'burger broodje', 'sushi', 'sate'])).optional(),
    // radioOption: z.enum(['option1', 'option2', 'option3']).optional(), // replace with your options

    heeftWebsite: z.enum(['Ja', 'Nee']).optional().nullable(),
    websiteURL: z.string().optional().nullable(),

    // Website
    dienst: z.enum(['Web Design & Development', 'eCommerce en Webwinkel oplossingen', 'SEO (Zoekmachineoptimalizatie)', 'Advertentie beheer', 'Online strategie ontwikkeling', 'Geen van de bovenstaande']).optional().nullable(), 
    websiteFunctionaliteit: z.array(z.enum(['Responsief ontwerp', 'Contact/ Reserveringssysteem', 'Online betalingen', 'CMS (Content Management Systeem)', 'Een andere reden'])).optional().nullable(),
    otherReasonWebsiteFunctionaliteit: z.string().optional().nullable(),

    // eCommerce
    webshopFunctionaliteit: z.array(z.enum(['Shopify', 'WooCommerce', 'Magento', 'Aangepaste oplossing'])).optional().nullable(),
    otherReasonWebshopFunctionaliteit: z.string().optional().nullable(),
    webshopProducten: z.enum(['Minder dan 50', '50 tot 200', '200 tot 1000', 'Meer dan 1000']).optional().nullable(),

    // SEO
    heeftEerderSEOGeinvesteerd: z.enum(['Ja', 'Nee']).optional().nullable(),
    seoDoelen: z.array(z.enum(['Verhogen van organische zoekrangschikking', 'Lokale zoekpresentie versterken', 'Verhogen van organisch verkeer', 'Contentoptimalisatie', 'Technische SEO-audit/reparaties', 'Andere reden'])).optional().nullable(),
    otherReasonSeoDoelen: z.string().optional().nullable(),
    belangerijksteZoekwoorden: z.string().optional().nullable(),

    // SEA
    heeftEerderGeadverteerd: z.enum(['Ja', 'Nee']).optional().nullable(),
    onlineAdvertentiesPlatformen: z.array(z.enum(['Google', 'Facebook', 'Instagram', 'LinkedIn', 'Andere platform'])).optional().nullable(),
    otherReasonOnlineAdvertentiesPlatformen: z.string().optional().nullable(),

    // Online Strategie
    strategieUitdaging: z.string().optional().nullable(),
    onlineMarketingKanalen: z.array(z.enum(['SEO (Zoekmachineoptimalizatie)', 'E-mailmarketing', 'Sociale media', 'PPC-advertenties', 'Contentmarketing', 'Anders'])).optional().nullable(),    
    otherReasonOnlineMarketingKanalen: z.string().optional().nullable(),
    zakelijkeDoelen: z.string().optional().nullable(),  

    // Contact gegevens
    tijdlijn: z.string().optional(),
    budget: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    message: z.string().optional(),
})
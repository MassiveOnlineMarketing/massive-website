import { z } from "zod";


export const WebsiteDetailsSchema = z.object({
    websiteName: z.string(),
    domainUrl: z.string(),
    gscUrl: z.string(),
});
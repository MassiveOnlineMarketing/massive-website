import * as z from "zod";

export const ProjectSchema = z.object({
  projectName: z.string(),
  domainUrl: z.string(),
  // language should max be 2 characters and min 2 characters, also needs to be one of the following: nl, en, de, fr
  language: z
    .string()
    .length(2)
    .refine((value) => ["nl", "en", "de", "fr"].includes(value), {
      message: "Language must be one of 'nl', 'en', 'de', 'fr'",
    }),
  country: z
    .string()
    .length(2)
    .refine((value) => ["nl", "us", "de", "fr"].includes(value), {
      message: "Country must be one of 'nl', 'en', 'de', 'fr'",
    }),
  keywords: z.string().optional(),
});

export const KeywordsSchema = z.object({
  keywords: z.string(),
});

export const UpdateProjectSchema = z.object({
  projectName: z.string().optional(),
  domainUrl: z.string().optional(),
  // language should max be 2 characters and min 2 characters, also needs to be one of the following: nl, en, de, fr
  language: z
    .string()
    .length(2)
    .refine((value) => ["nl", "en", "de", "fr"].includes(value), {
      message: "Language must be one of 'nl', 'en', 'de', 'fr'",
    })
    .optional(),
  country: z
    .string()
    .length(2)
    .refine((value) => ["nl", "us", "de", "fr"].includes(value), {
      message: "Country must be one of 'nl', 'en', 'de', 'fr'",
    })
    .optional(),
  gscSite: z.string().optional(),
});

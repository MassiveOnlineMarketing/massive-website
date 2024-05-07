import { z } from "zod";

export const WebsiteDetailsSchema = z.object({
  websiteName: z.string(),
  domainUrl: z.string(),
  gscUrl: z.string(),
});

export const ProjectDetailsSchema = z.object({
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
  gscSite: z.string().optional(),
});

export const GoogleSearchProjectSchema = z.object({
  projectName: z.string(),
  // language should max be 2 characters and min 2 characters, also needs to be one of the following: nl, en, de, fr
  language: z
    .string()
    .length(2)
    .refine(
      (value) =>
        [
          "en",
          "fr",
          "de",
          "es",
          "it",
          "nl",
          "ru",
          "jp",
          "kr",
          "cn",
          "br",
        ].includes(value),
      {
        message: "Language must be one of 'nl', 'en', 'de', 'fr'",
      },
    ),
  country: z
    .string()
    .length(2)
    .refine(
      (value) =>
        [
          "US",
          "GB",
          "CA",
          "AU",
          "DE",
          "FR",
          "IT",
          "ES",
          "NL",
          "JP",
          "KR",
          "BR",
          "RU",
          "CN",
        ].includes(value),
      {
        message: "Country must be one of 'nl', 'en', 'de', 'fr'",
      },
    ),
  gscSite: z.string().optional(),
  keywords: z.string().optional(),
});

import { z } from "zod";

export const GoogleResultFilterUrlsSchema = z.object({
  filterName: z.string(),
  urls: z.string(),
});

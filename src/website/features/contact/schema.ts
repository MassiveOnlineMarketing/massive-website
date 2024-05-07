import * as z from "zod";

export const NiewsbriefSignupBarSchama = z.object({
  email: z.string().email().min(5, { message: "Geen geldige email" }),
});

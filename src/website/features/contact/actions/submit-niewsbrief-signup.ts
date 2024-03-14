'use server'

import { z } from "zod";
import { NiewsbriefSignupBarSchama } from "../schema";
import { insertEmailAdress } from "../data/niewsbrief-signup";

type Inputs = z.infer<typeof NiewsbriefSignupBarSchama>;

export async function submitNiewsbriefSignup(data: Inputs) {
    const safeData = NiewsbriefSignupBarSchama.safeParse(data);

    
    if (safeData.success) {
        console.log('🟢 Form data is valid');
        const result = await insertEmailAdress(safeData.data.email);

        if (result) {
            return { success: true, data: result };
        } else {
            return { success: false, error: new Error('Mislukt om e-mail in te voegen') }
        }
    }

    if (safeData.error) {
        return { success: false, error: safeData.error.format()}
    }

}
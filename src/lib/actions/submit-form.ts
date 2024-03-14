'use server'

import { z } from 'zod';
import { formSchema } from '../data-schema/form';

type Inputs = z.infer<typeof formSchema>;

export async function submitForm(data: Inputs) {
    const result = formSchema.safeParse(data);

    if (result.success) {
        console.log('🟢 Form data is valid');
        return { success: true, data: result.data }; 
    }

    if (result.error) {
        return { success: false, error: result.error.format()}
    }
}

'use server';

import { db } from "@/lib/db";
import { GeneralUserSettingsSchema } from "../schema";
import { z } from "zod";
import { currentUser } from "../lib/auth";
import { getUserByEmail, getUserById } from "../data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";


export const updateUserDetails = async (values: z.infer<typeof GeneralUserSettingsSchema>) => {
    // console.log('values', values)
    const user = await currentUser();

    let data = {
        name: values.name || undefined,
        email: values.email || undefined,
        password: values.password || undefined,
    }
    // console.log('initial data', data)

    if (!user) {
        return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Unauthorized" };
    }

    if (values.email && values.email !== dbUser.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email is already in use" };
        }

        const verificationToken = await generateVerificationToken(values.email);
        await sendVerificationEmail(values.email, verificationToken.token);

        return { success: "Verification email sent!" }
    }

    if (values.currentPassword && values.password && values.passwordConfirmation && dbUser.password) {

        const isNewPasswordValid = values.password === values.passwordConfirmation;

        if (!isNewPasswordValid) {
            return { error: "Password and password confirmation do not match." };
        }

        const doesCurrentPasswordMatch = await bcrypt.compare(
            values.currentPassword,
            dbUser.password
        );

        if (!doesCurrentPasswordMatch) {
            return { error: "Current password is incorrect" };
        }

        data.password = await bcrypt.hash(values.password, 10);
    }

    
    
    const updatedUser = await db.user.update({
        where: { id: user.id },
        data: {
            ...data,
        },
    });

    return { success: 'User details updated!', data: updatedUser };

}
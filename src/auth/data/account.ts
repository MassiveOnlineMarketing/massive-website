'use server';

import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {

    const account = await db.account.findFirst({
        where: {
            userId: userId,
        },
    });

    return account;

}
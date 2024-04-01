'use server';

import { db } from "@/lib/db";

export const getNiewsbriefSignups = async () => {

    const signups = await db.nieuwsbriefSignup.findMany()

    return signups
}
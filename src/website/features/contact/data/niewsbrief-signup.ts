"use server";

import { db } from "@/lib/db";

export const insertEmailAdress = async (email: string) => {
  const result = await db.nieuwsbriefSignup.create({
    data: {
      email,
    },
  });

  return result;
};

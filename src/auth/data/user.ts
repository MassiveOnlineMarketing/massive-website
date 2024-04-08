'use server'

import { getSession } from "next-auth/react";
import { db } from "../../lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};


export const addCreditsToUser = async (id: string, credits: number) => {
  // console.log('addCreditsToUser', id, credits)
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        credits: {
          increment: credits,
        },
      },
    });

    return { success: true, credits: user.credits };
  } catch {
    return null;
  }
}

export const decrementUserCredits = async (id: string, credits: number) => {
  // console.log('decrementUserCredits', id, credits)

  try {
    const user = await db.user.update({
      where: { id },
      data: {
        credits: {
          decrement: credits,
        },
      },
    });

    return { success: true, credits: user.credits };
  } catch {
    return null;
  }
}
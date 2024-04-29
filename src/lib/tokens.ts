import { v4 as uuidv4 } from 'uuid';

import { db } from './db';
import { getVerificationTokenByEmail } from '../auth/data/verification-token';
import { getPasswordResetTokenByEmail } from "../auth/data/password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return passwordResetToken;
}

export const generateVerificationToken = async (email: string, userId?: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data:  {
      email,
      token,
      expires,
      userId
    },
  });

  return verificationToken;
};

export const updateGoogleRefreshToken = async (id: string, refreshToken: string) => {
  await db.user.update({
    where: {
      id,
    },
    data: {
      refreshToken,
    },
  });
};

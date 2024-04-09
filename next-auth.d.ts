import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  customField?: string;
  isGoogleSearchConsoleAuthenticated: boolean;

  credits: number;
  refreshToken?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    email?: string;
    isGoogleSearchConsoleAuthenticated: boolean;

    accessToken?: string;
    refreshToken?: string;
  }
}
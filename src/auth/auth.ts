import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "../../auth.config";

import { ExtendedUser } from "../../next-auth";

import { db } from "../lib/db";
import { getUserById } from "./data/user";

import { updateGoogleRefreshToken, updateGoogleSearchConsoleAuthenticated } from "../lib/tokens";
import { updateGoogleAccount } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ user, account }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })

      // * Check if the user has Google connection
      if (account?.provider === "google") {

        // * If Google Search Console connection is granted update the user
        if (account.scope && account.scope.includes('https://www.googleapis.com/auth/webmasters.readonly')) {
          updateGoogleSearchConsoleAuthenticated(user.id as string, true);
          (user as ExtendedUser).isGoogleSearchConsoleAuthenticated = true;
          console.log("Google Search Console connection")
        }

        // console.log('link account', account)

        if (account.scope && account.scope.includes('https://www.googleapis.com/auth/adwords')) {
          console.log("Google Ads connection")
        }
      }
    }
  },
  callbacks: {
    // * Triggered when a user signs in or gives permissions using sign in function
    async signIn({ user, account }) {
      // console.log('signIn', user, account)

      // * Allow OAuth without email verification
      if (account?.provider !== "credentials") {

        // Store the refresh token
        if (account?.provider === "google" && account.refresh_token && account.scope) {
          (user as ExtendedUser).refreshToken = account.refresh_token;
          console.log('google account')
          const updatedAccount = await updateGoogleAccount(user.id as string, account.refresh_token, account.scope);
        }

        return true;
      }

      // * only triggers when email has been used to create an account
      if (user.id) {
        const existingUser = await getUserById(user.id);

        // Prevent sign in without email verification
        if (!existingUser?.emailVerified) return false;

        // Update login provider for showing correct setting in the UI
        await updateLoginProvider(user.id as string, account.provider);


        // * Two factor authentication
        // if (existingUser.isTwoFactorEnabled) {
        //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        //   if (!twoFactorConfirmation) return false;

        //   // Delete two factor confirmation for next sign in
        //   await db.twoFactorConfirmation.delete({
        //     where: { id: twoFactorConfirmation.id }
        //   });
        // }
      }

      return true;
    },
    async jwt({ token, account, trigger, session }) {
      // If there's no user ID in the token, return the token as is
      if (!token.sub) return token;

      // Fetch the existing user
      const existingUser = await getUserById(token.sub);

      // If the user doesn't exist, return the token as is
      if (!existingUser) return token;

      // Add role, credits, and refreshToken to the token
      token.role = existingUser.role;
      token.credits = existingUser.credits;
      token.refreshToken = existingUser.refreshToken;
      token.email = existingUser.email;
      token.loginProvider = existingUser.loginProvider;

      // Add custom fields to the token
      token.customField = "test";
      token.isGoogleSearchConsoleAuthenticated = existingUser.isGoogleSearchConsoleAuthenticated;

      // If there's an account and it has a refresh token, add the access and refresh tokens to the JWT
      if (account && account.refresh_token) {
        token.accesToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.isGoogleSearchConsoleAuthenticated = account.isGoogleSearchConsoleAuthenticated;

        // Update the Google refresh token in the database
        await updateGoogleRefreshToken(token.sub, account.refresh_token);
      }

      // If the trigger is "update", update the name in the token coming from the useSession() update() function
      if (trigger === "update") {
        token.name = session.name;
      } 

      return token;
    },
    // is available in auth()
    // TODO: Check why token is not working
    async session({ session, token }: any) {
      const latestUserData = await getUserById(token.sub);

      // If there's a user in the session, add extra data to the user
      if (session.user && latestUserData) {
        // console.log('session.user', session)
        // Add id, role, customField, and credits to the user
        session.user.id = latestUserData.id || session.user.id;
        session.user.role = latestUserData.role || session.user.role;
        session.user.customField = token.customField || session.user.customField;
        session.user.credits = latestUserData.credits || session.user.credits;
        session.user.name = token.name
        session.user.email = token.email
        session.user.loginProvider = latestUserData.loginProvider || session.user.loginProvider;
      }

      // Add extra data to the session
      session.accessToken = token.accessToken || session.accessToken;
      session.refreshToken = token.refreshToken || session.refreshToken;
      session.isGoogleSearchConsoleAuthenticated = token.isGoogleSearchConsoleAuthenticated || session.isGoogleSearchConsoleAuthenticated;
      session.credits = token.credits || session.credits;
      session.email = token.email || session.email;

      return session;
    },
  },
  ...authConfig,

});

const updateLoginProvider = async (id: string, provider: string) => {
  try {
    const user = await db.user.update({
      where: { id },
      data: { loginProvider: provider }
    });

    return user;
  } catch {
    return null;
  }
}
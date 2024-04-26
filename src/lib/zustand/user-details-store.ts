import { Account } from "@prisma/client";
import { create } from "zustand";



export type UserDetailsActions = {
    // user
    setUserDetails: (userDetails: UserDetails) => void;

    // account
    setAccountDetails: (accountDetails: Account) => void;
}

export type UserDetails = {
    id: string;
    email: string;
    name: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserDetailsState = {
    userDetails: UserDetails | null;
    accountDetails: Account | null;
}

export type UserDetailsStore = UserDetailsState & UserDetailsActions

/**
 * Custom hook that creates a Zustand store for managing user details.
 * @returns An object containing the userDetails state variable, as well as a setter function for updating it.
 */
export const useUserDetailsStore = create<UserDetailsStore>((set) => ({
    userDetails: null,
    setUserDetails: (userDetails: UserDetails) => {
        set({
            userDetails: userDetails
        })
    },

    accountDetails: null,
    setAccountDetails: (accountDetails: Account) => {
        set({
            accountDetails: accountDetails
        })
    }
}))
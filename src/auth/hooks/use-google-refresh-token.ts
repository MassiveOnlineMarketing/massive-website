'use client';

import { useUserDetailsStore } from "@/lib/zustand/user-details-store";

type ScopeOption = 'search-console' | 'ads';

const SCOPE_URLS: Record<ScopeOption, string> = {
    'search-console': 'https://www.googleapis.com/auth/webmasters.readonly',
    'ads': 'https://www.googleapis.com/auth/adwords',
};

/**
 * Custom React hook to get the refresh token for a given scope.
 *
 * This hook fetches the account data (including the refresh token and scope) once and stores it in state.
 * When called with a scope option, it checks if the account's scope includes the required scope for the option.
 * If there's a match, it returns the refresh token; otherwise, it returns null.
 *
 * @param {ScopeOption} option - The scope for which to get the refresh token. 
 * This can be one of two options: 'search-console' or 'ads'.
 *
 * @returns {string | null} The refresh token if the given scope is included in the account's scope; 
 * otherwise, null.
 *
 * @example
 * const refreshToken = useGoogleRefreshToken('search-console');
 */
const useGoogleRefreshToken = (option: ScopeOption): string | null => {
    const account = useUserDetailsStore(state => state.accountDetails)
    const requiredScope = SCOPE_URLS[option];
  
    if (account && account.scope && account.scope.includes(requiredScope)) {
      return account.refresh_token;
    }
  
    return null;
};

export default useGoogleRefreshToken;
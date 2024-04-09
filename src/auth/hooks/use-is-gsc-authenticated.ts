import { useSession } from "next-auth/react";

export const useIsGscAuthenticated = () => {
    const session = useSession();
    return session.data?.isGoogleSearchConsoleAuthenticated;
}

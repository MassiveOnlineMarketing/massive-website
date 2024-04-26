import { signIn } from "next-auth/react";

interface AuthenticateGoogleProps {
    scope: string;
    login_hint?: string;
    currentScope?: string | null;
}

export const authenticateGoogle = async ({ scope, login_hint, currentScope }: AuthenticateGoogleProps) => {
    const fullScope = currentScope ? `${currentScope} ${scope}` : scope;

    console.log('fullScope', fullScope)

    const test = await signIn('google', { callbackUrl: '/app/settings/integrations' },
        {
            prompt: "consent",
            scope: fullScope,
            access_type: "offline",
            login_hint: login_hint || ''
        }
    );
    console.log('test', test)
}
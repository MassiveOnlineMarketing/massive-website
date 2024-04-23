'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '../../../routes';
import { Button } from '@/components/ui/button';
import { useIsGscAuthenticated } from '../hooks/use-is-gsc-authenticated';


export const AuthenticateGoogleSearchConsoleButton = () => {
  const isAuthenticated = useIsGscAuthenticated();


  const reauthenticate = async () => {
    const res = await signIn('google', { callbackUrl: DEFAULT_LOGIN_REDIRECT },
      {
        prompt: "consent", scope: "openid email profile https://www.googleapis.com/auth/webmasters.readonly", access_type: "offline"
      }
    );

    console.log('res', res)
  }

  return (
    <>
      {isAuthenticated ? (
        <Button >
          Permission Granted
        </Button>
      ) : (
        <Button onClick={reauthenticate}>
          Grant Google Search Console Permissions
        </Button>
      )}
    </>
  )
}
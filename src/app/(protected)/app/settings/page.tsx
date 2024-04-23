import { auth, signOut } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { AuthenticateGoogleSearchConsoleButton } from '@/auth/components/authenticate-google-search-console-access-button'
import React from 'react'
import { AuthenticateGoogleAds } from '@/auth/components/authenticate-google-ads'
import ConnectedAccount from './_components/connected-account'


const page = async () => {
  const session = await auth()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='p-6'>
        <ConnectedAccount />
      </div>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>

      <form action={async () => {
        'use server'

        await signOut()
      }}
      >
        <Button type='submit'>Logout</Button>
      </form>


      <div className='flex flex-col'>
        <AuthenticateGoogleSearchConsoleButton />
        <AuthenticateGoogleAds />
      </div>

    </div>
  )
}

export default page
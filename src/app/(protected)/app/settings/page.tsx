import { auth, signOut } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { AuthenticateGoogleSearchConsoleButton } from '@/auth/components/authenticate-google-search-console-access-button'
import React from 'react'
import { AuthenticateGoogleAds } from '@/auth/components/authenticate-google-ads'

const page = async () => {
  const session = await auth()

 
  return (
    <div>
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
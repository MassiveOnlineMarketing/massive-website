import React from 'react'
import { auth, signOut } from '@/auth/auth'


import { Button } from '@/components/ui/button'

import ConnectedGoogleAccount from './_components/connected-google-account'
import User from './_components/user'


const page = async () => {
  const session = await auth()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='p-6'>
        <div className='flex flex-col gap-y-2'>

        </div>
        <div className='border border-blue-500'>
          <p>Connected google account</p>
          <ConnectedGoogleAccount />
        </div>
        <div className='border border-red-500'>
          <User />
        </div>

        <div className='border border-green-500'>
          <p>Session</p>
          <pre>
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>

      <form action={async () => {
        'use server'

        await signOut()
      }}
      >
        <Button type='submit'>Logout</Button>
      </form>

    </div>
  )
}

export default page
'use client';

import { updateUserCredits } from '@/auth/actions/user';
import { addCreditsToUser } from '@/auth/data/user';
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import React, { useEffect } from 'react'

const Page = () => {

    const user = useCurrentUser()
    console.log('user', user)

    const handleClick = async () => {
        console.log('click')
        console.log('user', user)
        if (!user?.id) {
            return
        }
        
        const response = await addCreditsToUser(user?.id, 1)

        if (response?.success) {
          await updateUserCredits(response.credits)
        }

        console.log('response', response)
    }

  return (
    <div>
        <button onClick={handleClick}>click me</button>
        {user?.credits}
    </div>
  )
}

export default Page
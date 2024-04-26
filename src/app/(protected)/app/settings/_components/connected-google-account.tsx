
'use client';

import React from 'react'
import jwt from 'jsonwebtoken';

import useGoogleRefreshToken from '@/auth/hooks/use-google-refresh-token'
import { useUserDetailsStore } from '@/lib/zustand/user-details-store';
import Image from 'next/image';


type jwtDecoded = {
    aud: string
    email: string
    email_verified: boolean
    exp: number
    family_name: string
    given_name: string
    iat: number
    iss: string
    locale: string
    name: string
    picture: string
    sub: string
}

const ConnectedGoogleAccount = () => {
    const accountDetails = useUserDetailsStore(state => state.accountDetails)

    // Should be the retrun card when there is no accountDetails or id_token
    if (!accountDetails || !accountDetails?.id_token) {
        return <GoogleAccountNotConnected />
    }

    const decodedToken = jwt.decode(accountDetails.id_token) as jwtDecoded;
    // console.log('decodedToken', decodedToken)

    return (
        <div>
            <div className='flex gap-2 items-center'>
                <Image src={decodedToken.picture} alt='profile' width={40} height={40} className='rounded-full' />
                <div>
                    <h2>{decodedToken.name}</h2>
                    <p>{decodedToken.email}</p>
                </div>
            </div>

            <pre>
                {JSON.stringify(accountDetails, null, 2)}
            </pre>
        </div>
    )
}

export default ConnectedGoogleAccount

const GoogleAccountNotConnected = () => {
    return (
        <div className='flex gap-2 items-center'>
            <div className='w-10 h-10 bg-gray-400 rounded-full' />
            <div>
                <p>Connect Google Account</p>

            </div>
        </div>
    )
}
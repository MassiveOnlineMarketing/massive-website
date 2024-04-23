
'use client';

import React from 'react'
import useGoogleRefreshToken from '@/auth/hooks/use-google-refresh-token'

const ConnectedAccount = () => {

    const refresh_token = useGoogleRefreshToken('search-console')
    console.log('refresh_token', refresh_token)
    // if (!session) {
    //     return <div>Loading...</div>
    // }



    return (
        <div>
            {/* <pre>
                {JSON.stringify(account, null, 2)}
            </pre> */}
        </div>
    )
}

export default ConnectedAccount
'use client'

import { useCurrentUser } from '@/auth/hooks/use-current-user'
import { userTotalKeywordCount } from '@/serp/actions/user-total-keyword-count'
import React, { useEffect } from 'react'

const Credits = () => {
    const [dailySerpSpend, setDailySerpSpend] = React.useState(0)

    const user = useCurrentUser()

    useEffect(() => {
        const getTotalKeywordCount = async () => {
            if (user?.id) {
                const userId = user.id
                const res = await userTotalKeywordCount(userId)

                setDailySerpSpend(res)
            }
        }

        getTotalKeywordCount()
    }, [])




    return (
        <>
            <div>credits : {user?.credits}</div>
            <div>dailySerpSpend: {dailySerpSpend}</div>
        </>
    )
}

export default Credits
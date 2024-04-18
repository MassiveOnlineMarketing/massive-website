'use client'

import React, { useEffect } from 'react'

import { userTotalKeywordCount } from '@/serp/actions/user-total-keyword-count'
import { ExtendedUser } from '../../../next-auth'


type Props = {
    id: String,
    projectName: String,
    keywordCount: Number
} | null

/**
 * `Credits` is a React component that displays the user's credits and daily SERP API spend.
 * 
 * This component is responsible for fetching and displaying the total keyword count for a user,
 * which represents the daily spend for using the SERP Dashboard. It also displays the user's remaining credits.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {ExtendedUser} props.user - The user object containing the user's details and credits.
 * 
 * @returns {JSX.Element} A JSX element containing the user's credits and daily SERP API spend.
 */
const Credits = ({ user }: { user: ExtendedUser }): JSX.Element => {
    const [dailySerpSpend, setDailySerpSpend] = React.useState(0)

    useEffect(() => {
        const getTotalKeywordCount = async () => {
            if (user?.id) {
                const userId = user.id
                const res = await userTotalKeywordCount(userId)

                if (res !== 0) {
                    const totalKeywordCount = res.reduce((acc, project) => acc + project.keywordCount, 0)
                    setDailySerpSpend(totalKeywordCount)
                } else {
                    setDailySerpSpend(0)
                }
            }
        }

        getTotalKeywordCount()
    }, [user])




    return (
        <>
            <div>credits : {user?.credits}</div>
            <div>dailySerpSpend: {dailySerpSpend}</div>
        </>
    )
}

export default Credits
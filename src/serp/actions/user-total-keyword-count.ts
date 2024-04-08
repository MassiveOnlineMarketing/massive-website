'use server';

import { db } from "@/lib/db"

export const userTotalKeywordCount = async (userId: string) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        },
        select: {
            Project: {
                select: {
                    Keyword: true
                }
            }
        }
    })

    if (!user) {
        return 0
    }

    const totalKeywords = user.Project.reduce((acc, project) => {
        return acc + project.Keyword.length
    }, 0)

    return totalKeywords
}
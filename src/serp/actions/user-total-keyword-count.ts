'use server';

import { db } from "@/lib/db"

export const userTotalKeywordCount = async (userId: string) => {
    const user = await db.googleSearchProject.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            projectName: true,
            keyword: {
                select: {
                    id: true,
                }
            }
        },
    })

    if (!user) {
        return 0
    }



    const keywordCountPerProject = user.map((project) => ({
        projectId: project.id,
        projectName: project.projectName,
        keywordCount: project.keyword.length,
    }));


    return keywordCountPerProject
}
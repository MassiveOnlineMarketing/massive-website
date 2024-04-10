'use server';

import { db } from "@/lib/db";

export const getLatestProjectResult = async (projectId: string) => {
    const result = await db.projectResult.findFirst({
        where: {
            projectId: projectId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    // console.log('result');

    return result;
}

/**
 * Retrieves the results of a project.
 * @param projectId - The ID of the project to retrieve results for.
 * @returns The results of the project.
 */
export const getYesterdayProjectResults = async (projectId: string) => {
    const yesterdayStart = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(yesterdayStart);
    yesterdayEnd.setHours(23, 59, 59, 999);

    const results = await db.projectResult.findFirst({
        where: {
            projectId: projectId,
            createdAt: {
                gte: yesterdayStart,
                lt: yesterdayEnd,
            },
        },
    });

    // console.log('yesterday results');

    return results;
}
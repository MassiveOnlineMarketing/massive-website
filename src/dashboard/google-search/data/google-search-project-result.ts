'use server';

import { db } from "@/lib/db";


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

    const results = await db.googleSearchProjectResult.findFirst({
        where: {
            googleSearchProjectId: projectId,
            createdAt: {
                gte: yesterdayStart,
                lt: yesterdayEnd,
            },
        },
    });

    // console.log('yesterday results');

    return results;
}
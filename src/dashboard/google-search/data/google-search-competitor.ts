'use server';

import { db } from "@/lib/db";



export const createCompetitor = async (competitorUrl: string, projectId: string) => {

  const res = await db.googleSearchCompetitor.create({
    data: {
      domainUrl: competitorUrl,
      googleSearchProjectId: projectId
    }
  });

  return res;
}
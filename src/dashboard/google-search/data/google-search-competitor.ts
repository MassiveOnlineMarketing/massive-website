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

export const getCompetitorsByProjectId = async (projectId: string) => {
  const competitors = await db.googleSearchCompetitor.findMany({
    where: {
      googleSearchProjectId: projectId
    }
  });

  return competitors;
}

export const deleteCompetitors = async (competitorDomains: string[], projectId: string) => {
  const res = await db.googleSearchCompetitor.deleteMany({
    where: {
      domainUrl: {
        in: competitorDomains
      },
      googleSearchProjectId: projectId
    }
  });

  return res;
}

export const createCompetitors = async (competitorDomains: string[], projectId: string) => {
  const res = await db.googleSearchCompetitor.createMany({
    data: competitorDomains.map(domain => ({
      domainUrl: domain,
      googleSearchProjectId: projectId
    }))
  });

  return res;
}
"use server";

import { db } from "@/lib/db";

export const getGoogleSearchProjectByUserId = async (userId: string) => {
  const project = await db.googleSearchProject.findMany({
    where: { userId },
  });

  return project;
};

export const getGoogleSearchProjectByWebsiteId = async (websiteId: string) => {
  const project = await db.googleSearchProject.findMany({
    where: { websiteId },
  });

  return project;
};

export const getGoogleSearchProjectById = async (projectId: string) => {
  const project = await db.googleSearchProject.findUnique({
    where: { id: projectId },
  });

  return project;
};

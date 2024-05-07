"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { GoogleSearchProjectSchema } from "../schema";

type ProjectSchema = z.infer<typeof GoogleSearchProjectSchema>;

/**
 * ? Creates a new Google Search project.
 *
 * @param userId - The ID of the user creating the project.
 * @param websiteId - The ID of the website associated with the project.
 * @param domainUrl - The domain URL of the website.
 * @param data - The project data.
 * @returns The created project.
 */
export const createGoogleSearchProject = async (
  userId: string,
  websiteId: string,
  domainUrl: string,
  data: ProjectSchema,
) => {
  const project = await db.googleSearchProject.create({
    data: {
      userId,
      websiteId,
      projectName: data.projectName,
      domainUrl: domainUrl,
      language: data.language,
      country: data.country,
    },
  });

  return project;
};

/**
 * ? Updates a Google Search project in the database.
 *
 * @param projectId - The ID of the project to update.
 * @param data - The updated project data.
 * @returns The updated project.
 */
export const updateGoogleSearchProject = async (
  projectId: string,
  data: ProjectSchema,
) => {
  const project = await db.googleSearchProject.update({
    where: { id: projectId },
    data: {
      projectName: data.projectName,
      language: data.language,
      country: data.country,
    },
  });

  return project;
};

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

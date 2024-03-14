'use server'

import { db } from "@/lib/db";
import { z } from "zod";
import { UpdateProjectSchema } from "../schema";

/**
 * Retrieves a project by its ID.
 * @param projectId - The ID of the project to retrieve.
 * @returns The project object.
 */
export const getProjectById = async (projectId: string) => {
  const project = await db.project.findUnique({
    where: { id: projectId },
  });

  return project;
}

/**
 * Deletes a project by its ID.
 * @param projectId - The ID of the project to delete.
 * @returns The deleted project.
 */
export const deleteProjectById = async (projectId: string) => {
  const project = await db.project.delete({
    where: {
      id: projectId,
    },
  });

  return project;
}

/**
 * Retrieves a project by user ID.
 * @param userId The ID of the user.
 * @returns A promise that resolves to the project matching the user ID.
 */
export const getProjectByUserId = async (userId: string) => {
  const project = await db.project.findMany({
    where: { userId },
  });

  return project;
}

type UpdateProjectDetailsSchema = z.infer<typeof UpdateProjectSchema>;

/**
 * Updates the details of a project.
 * @param projectId - The ID of the project to update.
 * @param data - The updated project details.
 * @returns The updated project.
 */
export const updateProjectDetails = async (projectId: string, data: UpdateProjectDetailsSchema) => {
  const project = await db.project.update({
    where: { id: projectId },
    data,
  });

  return project;
}

/**
 * Creates a new project in the database.
 * 
 * @param userId - The ID of the user creating the project.
 * @param projectName - The name of the project.
 * @param domainUrl - The domain URL of the project.
 * @param language - The language of the project.
 * @param country - The country of the project.
 * @returns The created project.
 */
export const createProject = async (userId: string, projectName: string, domainUrl: string, language: string, country: string) => {
  const project = await db.project.create({
    data: {
      userId,
      projectName,
      domainUrl,
      language,
      country,
    },
  });

  return project;
}
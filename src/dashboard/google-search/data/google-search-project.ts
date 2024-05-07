"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { UpdateProjectSchema } from "../schema";
import { Website } from "@prisma/client";

/**
 * Retrieves a project by its ID.
 * @param projectId - The ID of the project to retrieve.
 * @returns The project object.
 */
export const getProjectById = async (projectId: string) => {
  const project = await db.googleSearchProject.findUnique({
    where: { id: projectId },
  });

  // console.log('project');

  return project;
};

/**
 * Deletes a project by its ID.
 * @param projectId - The ID of the project to delete.
 * @returns The deleted project.
 */
export const deleteProjectById = async (projectId: string) => {
  const project = await db.googleSearchProject.delete({
    where: {
      id: projectId,
    },
  });

  return project;
};

/**
 * Retrieves a project by user ID.
 * @param userId The ID of the user.
 * @returns A promise that resolves to the project matching the user ID.
 */
export const getProjectByUserId = async (userId: string) => {
  const project = await db.googleSearchProject.findMany({
    where: { userId },
  });

  return project;
};

type UpdateProjectDetailsSchema = z.infer<typeof UpdateProjectSchema>;

/**
 * Updates the details of a project.
 * @param projectId - The ID of the project to update.
 * @param data - The updated project details.
 * @returns The updated project.
 */
export const updateProjectDetails = async (
  projectId: string,
  data: UpdateProjectDetailsSchema,
) => {
  if (data.gscSite) {
    const project = await db.googleSearchProject.update({
      where: { id: projectId },
      data: {
        projectName: data.projectName,
        domainUrl: data.domainUrl,
        language: data.language,
        country: data.country,
        gscUrl: data.gscSite,
      },
    });

    return project;
  } else {
    const project = await db.googleSearchProject.update({
      where: { id: projectId },
      data: {
        projectName: data.projectName,
        domainUrl: data.domainUrl,
        language: data.language,
        country: data.country,
      },
    });

    return project;
  }
};

export type GoogleSearchProjectsWithLatestResult = {
  id: string;
  website: Website;
  projectName: string;
  domainUrl: string;
  language: string;
  country: string;
  improved: number;
  worsened: number;
  total: number;
  topThree: number;
  topTen: number;
  topHundred: number;
  averagePosition: number;
  createdAt: Date;
};

export const getUsersGoogleSearchProjectsWithLatestProjectResult = async (
  userId: string,
) => {
  if (!userId) {
    return;
  }

  const projects = await db.googleSearchProject.findMany({
    where: {
      userId: userId,
    },
    include: {
      website: true,
      results: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  return projects.map((project) => {
    return {
      id: project.id,
      website: project.website,
      projectName: project.projectName,
      domainUrl: project.domainUrl,
      language: project.language,
      country: project.country,
      improved: project.results[0]?.improved,
      worsened: project.results[0]?.worsened,
      total: project.results[0]?.total,
      topThree: project.results[0]?.topThree,
      topTen: project.results[0]?.topTen,
      topHundred: project.results[0]?.topHundred,
      averagePosition: project.results[0]?.averagePosition,
      createdAt: project.results[0]?.createdAt,
    };
  });
};

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
// export const createProject = async (userId: string, projectName: string, domainUrl: string, language: string, country: string) => {
//   const project = await db.project.create({
//     data: {
//       userId,
//       projectName,
//       domainUrl,
//       language,
//       country,
//     },
//   });

//   return project;
// }

export const fetch7LatestResults = async (projectId: string) => {
  const results = await db.googleSearchProject.findMany({
    where: {
      id: projectId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  // console.log('results', results)

  return results;
};

'use server';

import { z } from 'zod'
import { GoogleSearchProjectSchema } from '../schema';

import { db } from  '@/lib/db'
import { auth } from '@/auth/auth'

type ProjectSchema = z.infer<typeof GoogleSearchProjectSchema>;

interface UpdateGoogleSearchProjectInput {
  projectId: string;
  data: ProjectSchema;
}

const ERROR_MESSAGES = {
  NO_USER_SESSION: "You must be signed in to update a Google Search Console Project",
  MISSING_PROJECT_ID: "Please select a project first",
  INVALID_DATA_PARSE: "Please check the fields",
  GENERAL_ERROR: "Something went wrong while creating your project",
};

export const updateGoogleSearchProjectA = async ({
  projectId, data
}: UpdateGoogleSearchProjectInput) => {

  const session = await auth()

  if (!session?.user.id) {
    return { error: ERROR_MESSAGES.NO_USER_SESSION }
  }

  if (!projectId) {
    return { error: ERROR_MESSAGES.MISSING_PROJECT_ID }
  }

  const validatedFields = GoogleSearchProjectSchema.safeParse(data)

  if (validatedFields.success) {
    const { projectName, language, country } = validatedFields.data
    const updatedProjectData = {
      projectName: projectName,
      language: language,
      country: country
    }

    try {
      const googleSearchProject = await db.googleSearchProject.update({
        where: { id: projectId},
        data: updatedProjectData
      })

      if (googleSearchProject) {
        return { success: googleSearchProject}
      }
    } catch (error) {
      console.error('Error updating project with id: ', projectId, error)
      return { error: ERROR_MESSAGES.GENERAL_ERROR}
    }
  } else {
    return { error: ERROR_MESSAGES.INVALID_DATA_PARSE }
  }

  return { error: ERROR_MESSAGES.GENERAL_ERROR}
}
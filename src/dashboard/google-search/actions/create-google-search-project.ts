'use server';

import { z } from "zod";
import { GoogleSearchProjectSchema } from "../../schema";

import { db } from "@/lib/db";
import { auth } from "@/auth/auth";

type ProjectSchema = z.infer<typeof GoogleSearchProjectSchema>;

interface CreateGoogleSearchProjectInput {
  websiteId?: string;
  domainUrl?: string;
  data: ProjectSchema
}

const ERROR_MESSAGES = {
  NO_USER_SESSION: "You must be signed in to create a Google Search Console Project",
  MISSING_DOMAIN_WEBSITE: "Please select a website first",
  INVALID_DATA_PARSE: "Please check the fields",
  GENERAL_ERROR: "Something went wrong while creating your project",
};

export const createGoogleSearchProjectA = async (
  { websiteId, domainUrl, data }: CreateGoogleSearchProjectInput
) => {

  const session = await auth()

  if (!session?.user.id) {
    return { error: ERROR_MESSAGES.NO_USER_SESSION}
  }
  
  if (!domainUrl || !websiteId) {
    return { error: ERROR_MESSAGES.MISSING_DOMAIN_WEBSITE}
  }
  
  const validatedFields = GoogleSearchProjectSchema.safeParse(data)

  if (validatedFields.success) {
    const { projectName, language, country } = validatedFields.data

    const projectData = {
      userId: session.user.id,
      websiteId: websiteId,
      projectName: projectName,
      domainUrl: domainUrl,
      language: language,
      country: country
    }
  
    try {
      const googleSearchProject = await db.googleSearchProject.create({
        data: projectData
      })

      if (googleSearchProject) {
        return { success: googleSearchProject}
      }
      
    } catch (error) {
      console.error('Error creating project for user: ', session.user.id, error)
      return { error: ERROR_MESSAGES.GENERAL_ERROR}
    }
  } else {
    return { error: ERROR_MESSAGES.INVALID_DATA_PARSE} 
  }

  return { error: ERROR_MESSAGES.GENERAL_ERROR}
}
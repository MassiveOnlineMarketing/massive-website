```JavaScript

'use server'

import { z } from "zod";
import { ProjectSchema } from "../schema";
import { auth } from "@/auth/auth";
import { db } from "@/lib/db";

import { addKeywordToProject } from "./add-keyword-to-project";
import { useKeywords } from "../hooks/useKeywords";

export const createProject = async (values: z.infer<typeof ProjectSchema>) => {
  const validatedFields = ProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { projectName, domainUrl, language, country } = validatedFields.data;

  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    return { error: session ? "User not found!" : "Session not found!" };
  }


  const project = await db.project.create({
    data: {
      userId,
      projectName,
      domainUrl,
      language,
      country,
    },
  });

  // addKeywordToProject(project.id, values.keywords!, language, country, domainUrl)


  return project;

};

```
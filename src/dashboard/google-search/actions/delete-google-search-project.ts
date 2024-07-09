'use server'

import { auth } from "@/auth/auth"
import { db } from "@/lib/db"

export const deleteGoogleSearchProject = async ({ projectId }: { projectId: string }) => {
  const session = await auth()
  if (!session?.user.id) {
    return { error: "You must be signed in to delete a Google Search Console Project" }
  }
  
  const project = await db.googleSearchProject.findFirst({
    where: { id: projectId }
  })
  
  if (project?.userId === session?.user.id) {
    await db.googleSearchProject.delete({
      where: { id: projectId }
    })

    return { success: "Google Search Console Project deleted" }
  }

  return { error: "You are not authorized to delete this project" }
}
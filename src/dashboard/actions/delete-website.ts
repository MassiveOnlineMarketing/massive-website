'use server'

import { auth } from "@/auth/auth";
import { db } from "@/lib/db";


export const deleteWebsite = async ({ websiteId }: { websiteId: string }) => {
  const session = await auth();
  if (!session?.user.id) {
    return { error: "You must be signed in to delete a website" };
  }

  const website = await db.website.findFirst(
    {where: {id: websiteId}}
  )

  if (website?.userId === session.user.id) {
    await db.website.delete({
      where: {id: websiteId}
    })
    return { success: "Website deleted" }
  }

  return { error: "You are not authorized to delete this website" }
}
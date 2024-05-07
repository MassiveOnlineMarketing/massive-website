"use server";

import { db } from "@/lib/db";
import valudateWebsiteUrl from "./validate-website-url";
import { auth } from "@/auth/auth";

interface CreateWebsiteInput {
  data: {
    websiteName: string;
    domainUrl: string;
    gscUrl?: string;
  };
  websiteId: string;
}

export const updateWebsiteDetails = async ({
  data,
  websiteId,
}: CreateWebsiteInput) => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "You must be signed in to update a website" };
  }

  const validateUrl = await valudateWebsiteUrl({ url: data.domainUrl });

  if (!validateUrl.exists) {
    return { error: "The domain URL is invalid" };
  }

  const websiteData: any = {
    userId: session.user.id,
    websiteName: data.websiteName,
    domainUrl: validateUrl.finalUrl,
  };

  if (data.gscUrl !== "") {
    websiteData.gscUrl = data.gscUrl;
  }

  if (data.gscUrl === "noWebsite") {
    websiteData.gscUrl = null;
  }

  const website = await db.website.update({
    where: { id: websiteId },
    data: websiteData,
  });

  return { success: website };
};

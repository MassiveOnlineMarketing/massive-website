'use server';

import { db } from "@/lib/db";

export const getWebsiteByUserId = async (userId: string) => {
    const website = await db.website.findMany({
        where: { userId },
    });

    return website;
}

type Data = {
    websiteName: string;
    domainUrl: string;
    gscUrl: string;
}
export const createWebsite = async (userId: string, data: Data) => {
    const websiteData: any = {
      userId,
      websiteName: data.websiteName,
      domainUrl: data.domainUrl,
    };
  
    if (data.gscUrl !== '') {
      websiteData.gscUrl = data.gscUrl;
    }
  
    const website = await db.website.create({
      data: websiteData,
    });
  
    return website;
  };
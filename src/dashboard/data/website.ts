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
    console.log('createWebsite', userId, data)
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

export const updateWebsite = async (userId: string, data: Data, websiteId: string) => {
    console.log('updateWebsite', userId, data, websiteId)
    const websiteData: any = {
        userId,
        websiteName: data.websiteName,
        domainUrl: data.domainUrl,
    };

    if (data.gscUrl !== '') {
        websiteData.gscUrl = data.gscUrl;
    }

    if (data.gscUrl === 'noWebsite') {
        websiteData.gscUrl = null;
    }

    console.log('websiteData', websiteData)

    const website = await db.website.update({
        where: { id: websiteId },
        data: websiteData,
    });

    return website;
}
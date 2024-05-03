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
type CreateWebsiteProps = {
    userId: string;
    data: Data;
}

export const createWebsite = async ({ userId, data }: CreateWebsiteProps) => {
    // console.log('createWebsite', userId, data)
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

type UpdateWebsiteProps = {
    userId: string;
    data: Data;
    websiteId: string;
}

export const updateWebsite = async ({ userId, data, websiteId }: UpdateWebsiteProps) => {
    // console.log('updateWebsite', userId, data, websiteId)
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

    const website = await db.website.update({
        where: { id: websiteId },
        data: websiteData,
    });

    return website;
}
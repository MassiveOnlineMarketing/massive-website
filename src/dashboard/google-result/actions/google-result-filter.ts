"use server";

import { splitAndTrimTextAreaInput } from "@/dashboard/utils";
import { db } from "@/lib/db";

export interface CreateGoogleFilterInput {
  data: {
    urls: string;
    filterName: string;
  };
  userDomain: string;
  websiteId: string;
}

const ERROR_MESSAGES = {
  MISSING_FILTER_NAME: "Please enter a filter name",
  MISSING_WEBSITE_ID: "Website ID is required",
  INVALID_URLS: "Please enter urls starting with your domain: ",
  GENNERAL_FILTER_ERROR: "An error occurred while creating the filter",
};

export const createFilter = async ({
  data,
  userDomain,
  websiteId,
}: CreateGoogleFilterInput) => {
  try {
    if (!data.filterName) {
      return { error: ERROR_MESSAGES.MISSING_FILTER_NAME };
    }
    if (!websiteId) {
      return { error: ERROR_MESSAGES.MISSING_WEBSITE_ID };
    }

    const urls = splitAndTrimTextAreaInput(data.urls);

    let isValid = urls.every((url) => {
      const urlPattern = new RegExp(`^${userDomain}.*`);
      return urlPattern.test(url);
    });

    if (!isValid) {
      return { error: ERROR_MESSAGES.INVALID_URLS + userDomain };
    }

    let urlObjects = urls.map((url) => ({ url: url }));

    const filter = await db.googleResultFilter.create({
      data: {
        name: data.filterName,
        websiteId: websiteId,
        urls: {
          create: urlObjects,
        },
      },
    });

    return { success: filter };
  } catch (error) {
    console.error(error);
    return { error: ERROR_MESSAGES.GENNERAL_FILTER_ERROR };
  }
};


export const getFiltersByWebsiteId = async (websiteId: string) => {
  return await db.googleResultFilter.findMany({
    where: {
      websiteId: websiteId,
    },
    include: {
      urls: { select: { url: true } },
    },
  });
};

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

export const createFilterA = async ({
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

    const filterWithUrls = await db.googleResultFilter.create({
      data: {
        name: data.filterName,
        websiteId: websiteId,
        urls: {
          create: urlObjects,
        },
      },
      include: {
        urls: { select: { url: true } }
      }
    });

    return { success: filterWithUrls };
  } catch (error) {
    console.error(error);
    return { error: ERROR_MESSAGES.GENNERAL_FILTER_ERROR };
  }
};

export const deleteFilterA = async ({
  filterId
}: {
  filterId: string
}) => {

  if (!filterId){
    return { error: 'No filter to delete'}
  }

  try {
    const filter = await db.googleResultFilter.delete({
      where: {
        id: filterId
      }
    })

    return { success: filter}
  } catch (error) {
    console.error('Error deleting tag with id: ', filterId)
    return { error: 'An error accured while deleting the filter'}
  }
} 
"use server";

import { db } from "@/lib/db";
import { processArrayInBatches } from "../lib/utils";
import { ensureArray } from "@/lib/utils";

/**
 * ? Inserts an array of keywords into the database for a specific project.
 * * Should only be called from the server or api.
 *
 * @param projectId - The ID of the project.
 * @param keywords - An array of keywords to be inserted.
 * @returns An object containing the success message and the inserted keyword response.
 */
export const insertKeywords = async (projectId: string, keywords: string[]) => {
  // Map the keywords to keyword objects
  const keywordObjects = keywords.map((keyword) => ({
    googleSearchProjectId: projectId,
    keyword,
  }));

  // Use prisma.$transaction to insert all keywords at once
  const results = await db.$transaction(
    keywordObjects.map((keywordObject) =>
      db.googleSearchKeyword.create({ data: keywordObject }),
    ),
  );

  // Map the results to the response format
  const keywordResponse = results.map((result) => ({
    id: result.id,
    keyword: result.keyword,
  }));

  return { success: "Keywords inserted!", keywordResponse };
};

/**
 * ? Deletes keywords by their IDs.
 *
 * @param keywordIds - An array of keyword IDs to delete.
 * @returns A promise that resolves to an array of deleted keywords.
 */
export const deleteKeywordsById = async (keywordIds: string[]) => {
  const deletedKeywords = [];
  for (const id of keywordIds) {
    const keyword = await db.googleSearchKeyword.delete({
      where: {
        id: id,
      },
    });
    deletedKeywords.push(keyword);
  }
  return deletedKeywords;
};

/**
 * ? Retrieves keywords by project ID.
 *
 * @param projectId - The ID of the project.
 * @returns A promise that resolves to an array of keywords.
 */
export const getKeywordsByProjectId = async (projectId: string) => {
  const keywords = await db.googleSearchKeyword.findMany({
    where: {
      googleSearchProjectId: projectId,
    },
    include: {
      tags: true,
    },
  });

  return keywords;
};

/**
 * ? Adds a tag to a list of keywords.
 *
 * @param tagName - The name of the tag to add.
 * @param keywordIds - An array of keyword IDs or a single keyword ID.
 * @returns A promise that resolves to an array of updated keywords.
 */
export const addTagToKeywords = async (
  tagName: string,
  keywordIds: string[] | string,
) => {
  const keywordIdsArray = ensureArray(keywordIds);

  const updateKeywordsBatch = async (batch: string[]) => {
    const keywords = await Promise.all(
      batch.map((keywordId) => {
        return db.googleSearchKeyword.update({
          where: {
            id: keywordId,
          },
          data: {
            tags: {
              connect: {
                name: tagName,
              },
            },
          },
        });
      }),
    );

    return keywords;
  };

  const results = await processArrayInBatches(
    keywordIdsArray,
    updateKeywordsBatch,
    250,
  );

  return results;
};

/**
 * ? Deletes a specified tag from keywords.
 *
 * @param keywordIds - An array of keyword IDs or a single keyword ID.
 * @param tagName - The name of the tag to be deleted.
 * @returns A promise that resolves to an array of updated keywords.
 */
export const deleteTagFromKeywords = async (
  keywordIds: string[] | string,
  tagName: string,
) => {
  const keywordIdsArray = Array.isArray(keywordIds) ? keywordIds : [keywordIds];

  // Fetch the tag
  const tag = await db.googleSearchKeywordTag.findUnique({
    where: {
      name: tagName,
    },
  });

  if (!tag) {
    throw new Error(`Tag with name ${tagName} not found`);
  }

  // Disconnect the tag from each keyword
  const disconnectPromises = keywordIdsArray.map((keywordId) =>
    db.googleSearchKeyword.update({
      where: { id: keywordId },
      data: {
        tags: {
          disconnect: {
            id: tag.id,
          },
        },
      },
    }),
  );

  // Use db.$transaction to perform all disconnect operations at once
  const results = await db.$transaction(disconnectPromises);

  return results;
};

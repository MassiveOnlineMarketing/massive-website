'use server';

import { db } from "@/lib/db";

/**
 * ? Retrieves a tag by its name from the database.
 * 
 * @param tags - The name of the tag to retrieve.
 * @returns A promise that resolves to the tag object if found, or null if not found.
 */
export const getTagsByName = async (tags: string) => {
  const tag = await db.googleSearchKeywordTag.findFirst({
    where: {
      name: tags,
    },
  });

  return tag;
};


/**
 * ? Creates a new tag with the specified name.
 * 
 * @param tagName - The name of the tag.
 * @returns The newly created tag.
 */
export const createNewTag = async (tagName: string) => {
  const tag = await db.googleSearchKeywordTag.create({
    data: {
      name: tagName,
    },
  });

  return tag;
}
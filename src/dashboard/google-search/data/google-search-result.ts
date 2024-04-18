'use server'

import { db } from "@/lib/db";

type userResultProps = {
  keywordId: string;
  keywordName: string;
  position: number;
  url: string;
  metaTitle: string;
  metaDescription: string;
  firstPosition: number;
  bestPosition: number;
}

export const insertUserResults = async (
  result: userResultProps[]

) => {
  // console.log('result', result);

  const resultData = result.map((keyword) => {
    return {
      keywordId: keyword.keywordId,
      keywordName: keyword.keywordName,
      position: keyword.position,
      url: keyword.url,
      metaTitle: keyword.metaTitle,
      metaDescription: keyword.metaDescription,
      firstPosition: keyword.firstPosition,
      bestPosition: keyword.bestPosition,
    }
  })

  const resultInsert = await db.googleSearchResult.createMany({
    data: resultData
  });

  return { success: "User Results inserted!", resultInsert };
}

export const getKeywordResultById = async (keywordId: string[]) => {
  const keywordResult = await db.googleSearchResult.findMany({
    where: {
      keywordId: {
        in: keywordId
      }
    }
  });

  return keywordResult;
}


/**
 * Retrieves the latest keyword results along with their associated tags by keyword IDs.
 * @param keywordIds - An array of keyword IDs.
 * @returns An array of latest keyword results with associated tags.
 */
export const getLatestKeywordResultWithTagByKeywordId = async (keywordIds: string[]) => {
  const results = await db.googleSearchResult.findMany({
    where: {
      keywordId: {
        in: keywordIds,
      },
    },
    orderBy: { 
      createdAt: 'desc' 
    },
    include: {
      keyword: {
        include: {
          tags: true,
        },
      },
    },
  });

  const latestResults = keywordIds.map(id => {
    const result = results.find(result => result.keywordId === id);
    return {
      ...result,
      tags: result?.keyword?.tags || [],
      keyword: undefined,
    };
  });

  // console.log('latestResults');

  return latestResults;
}
'use server'

import { UserResult } from "@/app/api/serp/route";
import { db } from "@/lib/db";


/**
 * Inserts user search results into the database.
 * 
 * @param result - An array of UserResult objects containing the search result data.
 * @returns An object indicating the success or failure of the insertion, along with the number of inserted records.
 */
export const insertUserResults = async (
  result: UserResult[]
) => {

  const resultData = result.map((keyword) => {
    return {
      keywordId: keyword.keywordId,
      keywordName: keyword.resultName,
      position: keyword.resultPosition,
      url: keyword.resultURL,
      metaTitle: keyword.resultTitle,
      metaDescription: keyword.resultDescription,
      firstPosition: keyword.resultPosition,
      bestPosition: keyword.resultPosition,
      relatedSearches: keyword.relatedSearches,
      peopleAlsoAsk: keyword.peopleAlsoAsk,
    }
  })

  const res = await db.googleSearchResult.createMany({
    data: resultData
  });

  const insertedRecordsCount = res.count;

  if (insertedRecordsCount === 0) {
    return { error: "User Results not inserted!" };
  }
  return { success: "User Results inserted!", insertedRecordsCount};
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

  return latestResults;
}
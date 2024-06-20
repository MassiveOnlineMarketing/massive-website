"use server";

import { getLatestKeywordResultWithTagByKeywordId } from "@/dashboard/google-search/data/google-search-result";
import { getKeywordsByProjectId } from "@/dashboard/google-search/data/google-search-keyword";



export const getLatestKeywordResultWithTags = async (projectId: string) => {
  // console.log('🟢 projectId', projectId)
  const allKeywords = await getKeywordsByProjectId(projectId);
  // console.log('🟢 allKeywords', allKeywords[0]);

  const keywordsIds = allKeywords?.map((keyword) => {
    return keyword.id;
  });

  if (keywordsIds && keywordsIds.length > 0) {
    const keywordResults = await getLatestKeywordResultWithTagByKeywordId(keywordsIds);
    const latestResultsDTO = createLatestResultsDTO(keywordResults, keywordsIds);

    // TODO: Add error handling if no results are found --> return keywords with empty results so the ui can display the keywords with no results
    return latestResultsDTO;
  }
};

type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type LatestResultsType = PromiseType<ReturnType<typeof getLatestKeywordResultWithTagByKeywordId>>;
/**
 * Creates a DTO (Data Transfer Object) for the latest results based on the provided data and keyword IDs.
 * @param data - The array of LatestResultsType objects.
 * @param keywordIds - The array of keyword IDs.
 * @returns The latest results DTO.
 */
function createLatestResultsDTO(data: LatestResultsType, keywordIds: string[]){

  const latestResultsDTO = keywordIds.map((id) => {
    const result = data.find((result) => result.keywordId === id);
    return {
      ...result,
      tags: result?.keyword?.tags || [],
      avgMonthlySearches: result?.keyword.keywordMetrics[0].avgMonthlySearches,
      competition: result?.keyword.keywordMetrics[0].competition,
      competitionIndex: result?.keyword.keywordMetrics[0].competitionIndex,
      highTopOfBidPage: result?.keyword.keywordMetrics[0].highTopOfPageBid,
      lowTopOfBidPage: result?.keyword.keywordMetrics[0].lowTopOfPageBid,
      keyword: undefined,
    };
  });

  return latestResultsDTO;
}
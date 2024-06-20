"use server";

import { getLatestKeywordResultWithTagByKeywordId } from "@/dashboard/google-search/data/google-search-result";
import { getKeywordsByProjectId } from "@/dashboard/google-search/data/google-search-keyword";
import { createLatestResultsDTO } from "../utils";



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
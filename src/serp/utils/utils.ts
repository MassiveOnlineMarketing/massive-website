"use server"

import { auth } from "@/auth/auth";


import { getLatestKeywordResultWithTagByKeywordId } from "../../dashboard/google-search/data/google-search-result";
import { getProjectById } from "../../dashboard/google-search/data/google-search-project";
import { getLatestSerpResultsWithTags } from "../../dashboard/google-search/data/google-search-serp-result";

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

    // TODO: Add error handling if no results are found --> return keywords with empty results so the ui can display the keywords with no results
    return keywordResults;
  }
}

/**
 * ? Retrieves the latest search engine results page (SERP) results for a given project.
 * 
 * @param projectId - The ID of the project.
 * @returns A promise that resolves to an array of keyword results.
 */
export const getLatestSerpResults = async (projectId: string) => {

  const allKeywords = await getKeywordsByProjectId(projectId);

  const keywordsIds = allKeywords?.map((keyword) => {
    return keyword.id;
  });

  if (keywordsIds && keywordsIds.length > 0) {
    const keywordResults = await getLatestSerpResultsWithTags(keywordsIds);

    return keywordResults;
  }
}


/**
 * ? Checks if the current user is authorized to access a project route.
 * 
 * @param projectId - The ID of the project.
 * @returns A boolean indicating whether the user is authorized or not.
 */
export const projectRouteAuth = async (projectId: string) => {

  const session = await auth();
  const projectUserId = await getProjectById(projectId);
  const userRole = session?.user.role;

  let isAuthorized = false;

  if (session?.user.id === projectUserId?.userId || userRole === 'ADMIN') {
    isAuthorized = true;
  }


  return isAuthorized;
}

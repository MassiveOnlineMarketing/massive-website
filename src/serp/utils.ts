"use server"

import { auth } from "@/auth/auth";

import { getKeywordsByProjectId } from "./data/keyword";
import { getLatestKeywordResultWithTagByKeywordId } from "./data/result";
import { getProjectById } from "./data/project";
import { getLatestSerpResultsWithTags } from "./data/serp-result";

export const stringToArray = (str: string) => {
  const obj_keywords = str.split('\n')
    .map(s => s.trim())
    .filter(Boolean);

  // console.log('🟢 Keywords:', obj_keywords);
  return obj_keywords;
}

export const getLatestKeywordResultWithTags = async (projectId: string) => {
  // console.log('🟢 projectId', projectId)
  const allKeywords = await getKeywordsByProjectId(projectId);
  // console.log('🟢 allKeywords', allKeywords[0]);

  const keywordsIds = allKeywords?.map((keyword) => {
    return keyword.id;
  });

  if (keywordsIds && keywordsIds.length > 0) {
    const keywordResults = await getLatestKeywordResultWithTagByKeywordId(keywordsIds);

    return keywordResults;
  }
}

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

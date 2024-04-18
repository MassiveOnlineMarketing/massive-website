'use server'

import { db } from "@/lib/db";
import { GoogleSearchSerpResult } from "@prisma/client";

type serpProps = {
  keywordId: string;
  position: number;
  url: string;
  metaTitle: string;
  metaDescription: string;
}


export const insertSERPResults = async (
  result: serpProps[]
) => {

  const resultData = result.map((keyword) => {
    return {
      keywordId: keyword.keywordId,
      position: keyword.position,
      url: keyword.url,
      metaTitle: keyword.metaTitle,
      metaDescription: keyword.metaDescription
    }
  })

  const resultInsert = await db.googleSearchSerpResult.createMany({
    data: resultData
  });

  return { success: "SERP Results inserted!", resultInsert };
}

interface ResultType {
  // replace `any` with the actual type of the results
  [keywordId: string]: GoogleSearchSerpResult[];
}
export const getLatestSerpResultsWithTags = async (keywordIds: string[]) => {
  const results: ResultType = {};

  for (const keywordId of keywordIds) {
    results[keywordId] = await db.googleSearchSerpResult.findMany({
      where: {
        keywordId: keywordId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }
  console.log('🟢 result');

  return results;
}

export const getTopTenSerpResults = async (keywordId: string) => {

  const results = await db.googleSearchSerpResult.findMany({
    where: {
      keywordId: keywordId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  return results;
}
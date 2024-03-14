'use server'

import { db } from "@/lib/db";

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

  const resultInsert = await db.serpResult.createMany({
    data: resultData
  });

  return { success: "SERP Results inserted!", resultInsert };
}
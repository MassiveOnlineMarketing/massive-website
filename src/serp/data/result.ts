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

  const resultInsert = await db.result.createMany({
    data: resultData
  });

  return { success: "User Results inserted!", resultInsert };
}

export const getKeywordResultById = async (keywordId: string[]) => {
  const keywordResult = await db.result.findMany({
    where: {
      keywordId: {
        in: keywordId
      }
    }
  });

  return keywordResult;
}

// export const getLatestKeywordResultByKeywordId = async (keywordIds: string[]) => {
//   const latestResults = [];

//   for (const keywordId of keywordIds) {
//     const latestResult = await db.result.findFirst({
//       where: {
//         keywordId: keywordId
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     if (latestResult) {
//       latestResults.push(latestResult);
//     }
//   }
//   return latestResults;
// }

export const getLatestKeywordResultByKeywordId = async (keywordIds: string[]) => {
  const results = await db.result.findMany({
    where: {
      keywordId: {
        in: keywordIds,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const latestResults = keywordIds.map(id => {
    return results.find(result => result.keywordId === id);
  });

  return latestResults;
}

export const getLatestKeywordResultWithTagByKeywordId = async (keywordIds: string[]) => {
  const results = await db.result.findMany({
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
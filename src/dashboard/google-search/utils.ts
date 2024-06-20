import { GoogleSearchKeywordTag } from "@prisma/client";

export type LatestResultsDTO = {
    id: string;
    keywordId: string;
    keywordName: string;
    position: number | null;
    url: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    firstPosition: number | null;
    bestPosition: number | null;
    latestChange: number | null;
    createdAt: Date;
    relatedSearches: string[];
    peopleAlsoAsk: string[];
    tags: GoogleSearchKeywordTag[];
    avgMonthlySearches: string | null;
    competition: string | null;
    competitionIndex: string | null;
    highTopOfBidPage: string | null;
    lowTopOfBidPage: string | null;
}


/**
 * Creates an array of LatestResultsDTO based on the provided data and optional keywordIds.
 *
 * @param data - The array of data to create LatestResultsDTO from.
 * @param keywordIds - Optional array of keywordIds to filter the data.
 * @returns An array of LatestResultsDTO.
 */
export function createLatestResultsDTO(data: any[], keywordIds?: string[]): LatestResultsDTO[] {
  const results = keywordIds ? keywordIds.map(id => data.find(result => result.keywordId === id)) : data;

  const latestResultsDTO = results.map((result: any) => {
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
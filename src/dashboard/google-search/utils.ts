import { LatestResultsDTO } from "./serp-types";

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
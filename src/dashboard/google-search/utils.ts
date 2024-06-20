import { LatestResultsDTO } from "./serp-types";
import { format } from 'date-fns';

/**
 * Creates an array of LatestResultsDTO based on the provided data and optional keywordIds.
 *
 * @param data - The array of data to create LatestResultsDTO from.
 * @param keywordIds - Optional array of keywordIds to filter the data.
 * @returns An array of LatestResultsDTO.
 */
export function createLatestResultsDTO(data: any[], keywordIds?: string[]): LatestResultsDTO[] {
  const results = keywordIds ? keywordIds.map(id => data.find(result => result.keywordId === id)) : data;

  const latestResultsDTO = results.map((result: any): LatestResultsDTO => {
    // console.log('result', result)
    return {
      id: result?.id,
      keywordId: result?.keywordId,
      keywordName: result?.keywordName,

      position: result?.position,
      url: result?.url,
      metaTitle: result?.metaTitle,
      metaDescription: result?.metaDescription,
      firstPosition: result?.firstPosition,
      bestPosition: result?.bestPosition,
      latestChange: result?.latestChange,

      relatedSearches: result?.relatedSearches,
      peopleAlsoAsk: result?.peopleAlsoAsk,

      tags: result?.keyword?.tags || [],

      avgMonthlySearches: result?.keyword.keywordMetrics[0].avgMonthlySearches,
      competition: result?.keyword.keywordMetrics[0].competition,
      competitionIndex: result?.keyword.keywordMetrics[0].competitionIndex,
      highTopOfBidPage: result?.keyword.keywordMetrics[0].highTopOfPageBid,
      lowTopOfBidPage: result?.keyword.keywordMetrics[0].lowTopOfPageBid,

      createdAt: result?.createdAt,
      // keyword: undefined,
    };
  });

  // console.log('latestResultsDTO', latestResultsDTO[0])


  return latestResultsDTO;
}
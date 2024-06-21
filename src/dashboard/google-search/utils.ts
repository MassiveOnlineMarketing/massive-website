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

      avgMonthlySearches: result?.keyword.keywordMetrics[0]?.avgMonthlySearches   || null,
      competition: result?.keyword.keywordMetrics[0]?.competition                 || null,
      competitionIndex: result?.keyword.keywordMetrics[0]?.competitionIndex       || null,
      highTopOfBidPage: result?.keyword.keywordMetrics[0]?.highTopOfPageBid       || null,
      lowTopOfBidPage: result?.keyword.keywordMetrics[0]?.lowTopOfPageBid         || null,

      createdAt: result?.createdAt || format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      // keyword: undefined,
    };
  });

  // console.log('latestResultsDTO', latestResultsDTO[0])


  return latestResultsDTO;
}
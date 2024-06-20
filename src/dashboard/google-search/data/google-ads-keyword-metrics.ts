'use server';

import { db } from "@/lib/db";

type KeywordMetrics = {
  googleSearchKeywordId: string
  avg_monthly_searches?: string
  competition?: string
  competition_index?: string
  high_top_of_page_bid_micros?: string
  low_top_of_page_bid_micros?: string
}

export type KeywordMetricsInput = {
  keyword_metrics: KeywordMetrics
  text: string
  id: string
}

export const insertKeywordMetrics = async (data: KeywordMetricsInput[]) => {

  const keywordMetrics = data.map((item) => ({
    googleSearchKeywordId: item.id,
    avgMonthlySearches: item.keyword_metrics.avg_monthly_searches,
    competition: item.keyword_metrics.competition,
    competitionIndex: item.keyword_metrics.competition_index,
    highTopOfPageBid: item.keyword_metrics.high_top_of_page_bid_micros,
    lowTopOfPageBid: item.keyword_metrics.low_top_of_page_bid_micros
  }));

  const res = await db.googleAdsKeywordMetrics.createMany({
    data: keywordMetrics
  });

  return res;
}
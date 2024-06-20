import { GoogleSearchResult, GoogleSearchKeywordTag, GoogleAdsKeywordMetrics } from "@prisma/client";

export type KeywordResultWithTagProp = GoogleSearchResult & {
  tags?: GoogleSearchKeywordTag[];
  avgMonthlySearches?: string;
  competition?: string;
  competitionIndex?: string;
  highTopOfBidPage?: string;
  lowTopOfBidPage?: string;
};

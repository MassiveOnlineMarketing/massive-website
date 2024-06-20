import { GoogleSearchKeywordTag } from "@prisma/client";

// This is the type of the data that is beeing used to display the latest results in the dashboard
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
import { GoogleSearchResult, GoogleSearchKeywordTag } from "@prisma/client";

export type KeywordResultWithTagProp = GoogleSearchResult & {
  tags?: GoogleSearchKeywordTag[];
};

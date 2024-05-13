import React, { useEffect, useState } from "react";
import axios from "axios";

import { PythonApiKeywordDetailSearchConsoleData } from "@/dashboard/types";
import { GoogleSearchSerpResult } from "@prisma/client";
import { KeywordResultWithTagProp } from "@/dashboard/google-search/serp-types";

import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { getTopTenSerpResults } from "@/dashboard/google-search/data/google-search-serp-result";

// Components
import { Card, CardTitle } from "./keyword-details-row/card";
import { GoogleIconSvg } from "../../_assets";

// Elements
import RelatedSearchesComponent from "./keyword-details-row/related-searches";
import PeopleAlsoAsk from "./keyword-details-row/people-also-ask";
import GoogleSearchConsoleGraphs from "./keyword-details-row/google-search-console-graphs";
import SerpResultCard from "./keyword-details-row/serp-result-card";
import UserResultDetails from "./keyword-details-row/user-result-details";

type Props = {
  keywordData: KeywordResultWithTagProp;
  refresh_token: string | null;
};

const KeywordDetailsRow = ({ keywordData, refresh_token }: Props) => {
  const gscUrl = useWebsiteDetailsStore(
    (state) => state.WebsiteDetails?.gscUrl,
  );
  const hasGscUrl = gscUrl !== null && gscUrl !== "";

  const [showAll, setShowAll] = useState(false);

  const [searchConsoleData, setSearchConsoleData] =
    useState<PythonApiKeywordDetailSearchConsoleData | null>(null);
  const [topTenResults, setTopTenResults] = useState<GoogleSearchSerpResult[]>(
    [],
  );

  const domainUrl = useWebsiteDetailsStore((state) => state.WebsiteDetails?.domainUrl);

  useEffect(() => {
    setSearchConsoleData(null);
    fetchSearchConsoleData(keywordData.keywordName);
    fetchTopTenResults(keywordData.keywordId);
  }, [keywordData]);

  const fetchSearchConsoleData = async (keyword: string) => {
    if (!refresh_token) {
      return;
    }
    if (!gscUrl) {
      return;
    }
    const encodedKeyword = encodeURIComponent(keyword);
    try {
      const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/keyword_data?keyword=${encodedKeyword}&site_url=${gscUrl}&refresh_token=${refresh_token}`;
      const res = await axios(url);

      setSearchConsoleData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopTenResults = async (keywordId: string) => {
    const res = await getTopTenSerpResults(keywordId);

    setTopTenResults(res);
  };

  return (
    <div>
      <GoogleSearchConsoleGraphs
        searchConsoleData={searchConsoleData}
        refresh_token={refresh_token}
        hasGscUrl={hasGscUrl}
      />

      {keywordData.position && (
        <Card className="mt-6">
          <CardTitle heading="Keyword Insight" icon={GoogleIconSvg} />
          <p className="mb-3 pt-2 text-lg leading-7 font-medium text-gray-800">
            Details Overview
          </p>
          <div className="max-w-[530px] flex flex-col">
            <UserResultDetails keywordData={keywordData} domainUrl={domainUrl} />
          </div>
        </Card>
      )}

      <Card className="my-6 ">
        <CardTitle heading="Google Data" icon={GoogleIconSvg} />
        <div className="grid grid-cols-2">
          <div className="w-full min-h-[500px]">
            <p className="mb-3 pt-2 text-lg leading-7 font-medium text-gray-800">
              Top Search Results
            </p>
            <div className="max-w-[530px]">
              {topTenResults
                .slice(0, showAll ? topTenResults.length : 3)
                .map((result, index) => (
                  <SerpResultCard key={result.id} result={result} />
                ))}
              <button
                className="mx-auto w-fit flex text-sm leading-5 font-medium text-gray-500"
                onClick={() => setShowAll(!showAll)}
              >
                {!showAll ? "Show More" : "Show Less"}
              </button>
            </div>
          </div>

          <div>
            <RelatedSearchesComponent keywordData={keywordData} />
            <PeopleAlsoAsk keywordData={keywordData} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default KeywordDetailsRow;

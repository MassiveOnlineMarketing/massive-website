"use client";

import React, { useEffect, useState } from "react";
import { getDateDaysAgo } from "../_components/data-utils";

// Types
import { DateRangeObject } from "../_components/date-range-button";

// Custom hooks
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { useGoogleFilterStore } from "@/lib/zustand/google-results-filter-store";
import useGoogleRefreshToken from "@/auth/hooks/use-google-refresh-token";

// Components
import BreadCrumbsSearchKeywords from "../../google-search/_components/bread-crumbs";
import GoogleResultPage from "../_components/google-results-page";

import { TabContainer, TabContent, TabIndicatorLineAnimated, TabTitle } from "@/components/ui/tabs";
import QueryTableContainer from "./_components/query-table-container";
import PageTableContainer from "./_components/page-table-container";



export type QueryObject = {
  clicks: number;
  ctr: number;
  impressions: number;
  position: number;
  query: string;
};

const Page = () => {
  const currentWebsite = useWebsiteDetailsStore((state) => state.WebsiteDetails);
  const site_url = currentWebsite?.gscUrl;
  const selectedFilter = useGoogleFilterStore((state) => state.selectedResultsFilter);
  const refresh_token = useGoogleRefreshToken("search-console");

  // Date Range
  const [selectedRange, setSelectedRange] = useState<DateRangeObject>({
    label: "last 30 days",
    start: () => getDateDaysAgo(30),
    end: () => new Date(),
  });

  const [loadedTabs, setLoadedTabs] = useState<number[]>([1]);
  const handleTabClick = (id: number) => {
    // console.log("Tab Clicked", id)
    if (!loadedTabs.includes(id)) {
      setLoadedTabs(prev => [...prev, id]);
    }
  };

  useEffect(() => {
    setLoadedTabs([1])
  }, [selectedRange])

  // TODO: Add no website selected state
  // if (!currentWebsite) {
  //   return <div>Please Select a website first</div>;
  // }

  return (
    <div className="w-full h-full px-6">
      <BreadCrumbsSearchKeywords />
      <GoogleResultPage
        site_url={site_url}
        refresh_token={refresh_token}
        selectedFilter={selectedFilter}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />

      <div className="min-h-[350px] p-8 mt-8 bg-white rounded-2xl shadow-sm relative">
        <TabContainer>
          <div className="mb-6 flex relative gap-4 font-normal text-lg pb-3 border-b-[2px] border-gray-200 w-fit">
            <TabTitle id={1} onClick={() => handleTabClick(1)}>Query</TabTitle>
            <TabTitle id={2} onClick={() => handleTabClick(2)}>Page</TabTitle>
            <TabTitle id={3} onClick={() => handleTabClick(3)}>Country</TabTitle>
            <TabIndicatorLineAnimated gapSize={16} />
          </div>

          <>
            <TabContent id={1}>
              {loadedTabs.includes(1) && <QueryTableContainer
                site_url={site_url}
                refresh_token={refresh_token}
                selectedFilter={selectedFilter}
                selectedRange={selectedRange}
              />}
            </TabContent>
            <TabContent id={2}>
              {loadedTabs.includes(2) && <PageTableContainer
                site_url={site_url}
                refresh_token={refresh_token}
                selectedFilter={selectedFilter}
                selectedRange={selectedRange}
              />}
            </TabContent>
            <TabContent id={3}>
              {loadedTabs.includes(3) && <h1>Tab 3</h1>}
            </TabContent>
          </>
        </TabContainer>

      </div>
    </div>
  );
};

export default Page;
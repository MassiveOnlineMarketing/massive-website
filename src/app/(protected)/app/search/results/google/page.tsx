"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import useGoogleRefreshToken from "@/auth/hooks/use-google-refresh-token";

import BreadCrumbsSearchKeywords from "../../google-search/_components/bread-crumbs";
import GoogleResultPage from "../_components/google-results-page";
import { DateRangeObject } from "../_components/date-range-button";
import { getDateDaysAgo } from "../_components/data-utils";
import { useGoogleFilterStore } from "@/lib/zustand/google-results-filter-store";
import QueryTableContainer from "./_components/query-table-container";

interface ResultSearchApiResponse {
  config: any;
  data: {
    currentData: Data;
    previousData: Data;
    data:
    {
      [key: string]: Metrics;
    },
  };
}
export type Data = {
  clicks: number;
  ctr: number;
  impressions: number;
  position: number;
  date: string;
};

type Metrics = {
  clicks: number;
  ctr: number;
  impressions: number;
  position: number;
};

interface QuerySearchApiResponse {
  config: any;
  data: QueryObject[];
}

export type QueryObject = {
  clicks: number;
  ctr: number;
  impressions: number;
  position: number;
  querry: string;
};

const Page = () => {
  const currentWebsite = useWebsiteDetailsStore(
    (state) => state.WebsiteDetails,
  );
  const refresh_token = useGoogleRefreshToken("search-console");
  const site_url = currentWebsite?.gscUrl;

  const [data, setData] = React.useState<Data[]>();
  const [currentData, setCurrentData] = React.useState<Data>();
  const [previousData, setPreviousData] = React.useState<Data>();

  const [queryData, setQueryData] = React.useState<QueryObject[]>();

  const [selectedRange, setSelectedRange] = useState<DateRangeObject>({
    label: "last 30 days",
    start: () => getDateDaysAgo(30),
    end: () => new Date(),
  });
  // const [ selectedTags, setSelectedTags ] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchGraphData();
    fetchQueryData();
    console.log("date changed");
  }, [selectedRange, currentWebsite]);

  const selectedFilter = useGoogleFilterStore((state) => state.selectedResultsFilter);

  const createRequestUrl = (endpoint: string) => {
    if (!site_url || !refresh_token) return null;

    const start_date = format(selectedRange.start(), "yyyy-MM-dd");
    const end_date = format(selectedRange.end(), "yyyy-MM-dd");

    if (!start_date || !end_date) return null;

    let urls = '';
    if (selectedFilter.length > 0) {
      const filterUrls = selectedFilter.map((filter) => filter.urls.map((url) => url.url)).flat().join(",");
      console.log("filterUrls", filterUrls)
      if (filterUrls) {
        urls = `&urls=${filterUrls}`;
      }
    }

    return `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/${endpoint}?site_url=${site_url}&refresh_token=${refresh_token}&start_date=${start_date}&end_date=${end_date}${urls}`;
  }

  const fetchGraphData = async () => {
    const requestUrl = createRequestUrl("results");
    console.log("requestUrl", requestUrl);
    if (!requestUrl) return;
    try {
      const res: ResultSearchApiResponse = await axios(requestUrl);
      console.log('fetchGraphData res', res)

      const formattedData = Object.entries(res.data.data).map(([date, metrics]) => ({
        date: date,
        ...metrics,
      }));
      // console.log('formattedData', formattedData)

      setData(formattedData);
      setCurrentData(res.data.currentData);
      setPreviousData(res.data.previousData);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const fetchQueryData = async () => {
    const requestUrl = createRequestUrl("query_data");
    console.log("requestUrl", requestUrl);
    if (!requestUrl) return;

    try {
      const res: QuerySearchApiResponse = await axios(requestUrl);
      console.log('fetchQueryData res', res);

      setQueryData(res.data);
    } catch (error) {
      console.error(error);
    }
  }


  // TODO: Add no website selected state
  if (!currentWebsite) {
    return <div>Please Select a website first</div>;
  }

  // TODO: Add loading state
  if (!data) return <div>Loading...</div>;


  return (
    <div className="w-full h-full px-6">
      <BreadCrumbsSearchKeywords />
      <GoogleResultPage
        chartData={data}
        currentData={currentData as Data}
        previousData={previousData as Data}
        isLoading={isLoading}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />

      <QueryTableContainer queryData={queryData} />
    </div>
  );
};

export default Page;

const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}) => {
  return (
    <div className="flex gap-2">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );
};

import React, { useState } from "react";

// Types
import { GoogleResultFilterWithUrls } from "@/dashboard/types";

// Date utilities
import { format, parse } from "date-fns";

// Custom hooks
import useFetchData from "../google/hooks/use-fetch-search-result-api-data";

// Components
import MetricsLabelGoogleChart from "./metrics-label";
import DateRangeButton, { DateRangeObject } from "./date-range-button";
import AddFilter from "./add-filter";
import FilterSelection from "./google-filter-selection";
import RemoveFilterButtonTest from "./remove-filter-button-test";

// Styles
import { constants } from "@/styles/styles";

// Charting library
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, Brush, TooltipProps } from "recharts";
import { LoadingSpinner } from "@/components/loading-spinner";

interface ResultSearchApiResponse {
  currentData: SearchGraphDataArray;
  previousData: SearchGraphDataArray;
  data:
  {
    [key: string]: Metrics;
  },
}

type Metrics = {
  clicks: number;
  ctr: number;
  impressions: number;
  position: number;
};


type GoogleResultPageProps = {
  site_url: string | null | undefined;
  refresh_token: string | null;
  selectedFilter: GoogleResultFilterWithUrls[];
  selectedRange: DateRangeObject;
  setSelectedRange: React.Dispatch<React.SetStateAction<DateRangeObject>>;
};

const GoogleResultPage = ({
  site_url,
  refresh_token,
  selectedRange,
  selectedFilter,
  setSelectedRange,
}: GoogleResultPageProps) => {

  const { data: resultResponse, isLoading: graphIsLoading } = useFetchData({
    endpoint: "results",
    site_url,
    refresh_token,
    selectedRange,
    selectedFilter,
  });

  const [showClicks, setShowClicks] = useState(true);
  const [showCtr, setShowCtr] = useState(false);
  const [showImpressions, setShowImpressions] = useState(false);
  const [showPosition, setShowPosition] = useState(false);

  const graphData = resultResponse as ResultSearchApiResponse | null;

  if (graphIsLoading || !graphData) return <div className="w-full h-[532px] mt-4 bg-white rounded-2xl shadow-base flex items-center justify-center"><LoadingSpinner /></div>;

  const formattedData = Object.entries(graphData.data).map(([date, metrics]) => ({
    date: date,
    ...metrics,
  }));

  const metrics = [
    { title: "Clicks", value: graphData.currentData.clicks, previousValue: graphData.previousData.clicks, show: showClicks, setShow: setShowClicks },
    { title: "Impressions", value: graphData.currentData.impressions, previousValue: graphData.previousData.impressions, show: showImpressions, setShow: setShowImpressions },
    { title: "CTR", value: graphData.currentData.ctr, previousValue: graphData.previousData.ctr, show: showCtr, setShow: setShowCtr },
    { title: "Position", value: graphData.currentData.position, previousValue: graphData.previousData.position, show: showPosition, setShow: setShowPosition },
  ];

  return (
    <div className="w-full mt-4 ">
      <div className="w-full flex gap-2">
        {metrics.map(metric => (
          <MetricsLabelGoogleChart
            key={metric.title}
            title={metric.title}
            value={metric.value}
            previousValue={metric.previousValue}
            show={metric.show}
            setShow={metric.setShow}
          />
        ))}
      </div>
      <div className="h-full w-full p-6 bg-white rounded-b-2xl shadow-base relative z-10 -mt-1">
        <div className="flex gap-3">
          <FilterSelection />
          <AddFilter />
          <RemoveFilterButtonTest />
          <DateRangeButton
            className="ml-auto"
            isLoading={graphIsLoading}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </div>
        <div className="pt-16 h-[280px] w-full">
          <AreaChartTest
            chartData={formattedData}
            showClicks={showClicks}
            showCtr={showCtr}
            showImpressions={showImpressions}
            showPosition={showPosition}
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleResultPage;

type LineChartProps = {
  chartData: SearchGraphDataArray[];
  showClicks: boolean;
  showPosition: boolean;
  showImpressions: boolean;
  showCtr: boolean;
};

type SearchGraphDataArray = {
  clicks: number;
  ctr: number;
  impressions: number;
  position: number;
  date: string;
};


const AreaChartTest = ({
  chartData,
  showClicks,
  showCtr,
  showImpressions,
  showPosition,
}: LineChartProps) => {
  const areaConfigs = [
    { show: showClicks, yAxisId: "clicks", stroke: "#3B82F6", dataKey: "clicks" },
    { show: showCtr, yAxisId: "ctr", stroke: "#059669", dataKey: "ctr" },
    { show: showPosition, yAxisId: "position", stroke: "#F59E0B", dataKey: "position" },
    { show: showImpressions, yAxisId: "impressions", stroke: "#7857FE", dataKey: "impressions" },
  ];

  return (
    <ResponsiveContainer>
      <AreaChart data={chartData} margin={{ left: 20, right: 10 }}>
        <XAxis
          dataKey="date"
          type="category"
          axisLine={false}
          interval={10}
          tickFormatter={(tickItem) => {
            const date = parse(tickItem, "yyyy-MM-dd", new Date());
            return format(date, "MM/dd");
          }}
          tick={{ fontSize: 12, fill: "#9CA3AF" }}
        />
        <CartesianGrid stroke="#E5E7EB" horizontal={true} vertical={false} />
        <Tooltip
          content={
            <CustomTooltip
              showClicks={showClicks}
              showCtr={showCtr}
              showImpressions={showImpressions}
              showPosition={showPosition}
            />
          }
        />
        <Brush dataKey="date" height={40} fill="#F8F8FF" />
        {areaConfigs.map((config) =>
          config.show && (
            <Area
              key={config.yAxisId}
              isAnimationActive={false}
              yAxisId={config.yAxisId}
              type="linear"
              dataKey={config.dataKey}
              stroke={config.stroke}
              strokeWidth={3}
              fill="transparent"
            />
          )
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

type CustomTooltipProps = TooltipProps<string, string> & {
  showClicks: boolean;
  showCtr: boolean;
  showImpressions: boolean;
  showPosition: boolean;
};

// TODO: Change styling
const CustomTooltip = ({
  active,
  payload,
  showClicks,
  showCtr,
  showImpressions,
  showPosition,
}: CustomTooltipProps) => {
  const data = payload?.[0]?.payload as SearchGraphDataArray;

  if (active && payload && payload.length) {
    return (
      <div className={`${constants.glassFill} p-4 shadow-custom-lg`}>
        <p className="">{`${data.date}`}</p>
        {showClicks && <p className="">{`Clicks : ${data.clicks}`}</p>}
        {showCtr && <p className="">{`CTR : ${data.ctr.toFixed(2)} %`}</p>}
        {showImpressions && (
          <p className="">{`Impressions : ${data.impressions}`}</p>
        )}
        {showPosition && (
          <p className="">{`Position : ${data.position.toFixed(2)}`}</p>
        )}
      </div>
    );
  }

  return null;
};

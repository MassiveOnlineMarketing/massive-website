import { useState } from "react";
import MetricsLabelGoogleChart from "./metrics-label";
import DateRangeButton, { DateRangeObject } from "./date-range-button";
import { Data } from "../google/page";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Brush,
  TooltipProps,
} from "recharts";
import { format, parse } from "date-fns";

import { constants } from "@/styles/styles";
import AddFilter from "./add-filter";
import FilterSelection from "./google-filter-selection";
import RemoveFilterButtonTest from "./remove-filter-button-test";

type GoogleResultPageProps = {
  chartData: Data[];
  currentData: Data;
  previousData: Data;
  isLoading: boolean;
  selectedRange: DateRangeObject;
  setSelectedRange: React.Dispatch<React.SetStateAction<DateRangeObject>>;
};

const GoogleResultPage = ({
  chartData,
  currentData,
  previousData,
  isLoading,
  selectedRange,
  setSelectedRange,
}: GoogleResultPageProps) => {
  const [showClicks, setShowClicks] = useState(true);
  const [showCtr, setShowCtr] = useState(false);
  const [showImpressions, setShowImpressions] = useState(false);
  const [showPosition, setShowPosition] = useState(false);

  const metrics = [
    { title: "Clicks", value: currentData.clicks, previousValue: previousData.clicks, show: showClicks, setShow: setShowClicks },
    { title: "Impressions", value: currentData.impressions, previousValue: previousData.impressions, show: showImpressions, setShow: setShowImpressions },
    { title: "CTR", value: currentData.ctr, previousValue: previousData.ctr, show: showCtr, setShow: setShowCtr },
    { title: "Position", value: currentData.position, previousValue: previousData.position, show: showPosition, setShow: setShowPosition },
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
            isLoading={isLoading}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </div>
        <div className="pt-16 h-[280px] w-full">
          <AreaChartTest
            chartData={chartData}
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
  chartData: Data[];
  showClicks: boolean;
  showPosition: boolean;
  showImpressions: boolean;
  showCtr: boolean;
};

const AreaChartTest = ({
  chartData,
  showClicks,
  showCtr,
  showImpressions,
  showPosition,
}: LineChartProps) => {
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
        {showClicks && (
          <Area
            isAnimationActive={false}
            yAxisId="clicks"
            type="linear"
            dataKey="clicks"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="transparent"
          />
        )}
        {showCtr && (
          <Area
            isAnimationActive={false}
            yAxisId="ctr"
            type="linear"
            dataKey="ctr"
            stroke="#059669"
            strokeWidth={3}
            fill="transparent"
          />
        )}
        {showPosition && (
          <Area
            isAnimationActive={false}
            yAxisId="position"
            type="linear"
            dataKey="position"
            stroke="#F59E0B"
            strokeWidth={3}
            fill="transparent"
          />
        )}
        {showImpressions && (
          <Area
            isAnimationActive={false}
            yAxisId="impressions"
            type="linear"
            dataKey="impressions"
            strokeWidth={3}
            stroke="#7857FE"
            fill="transparent"
          />
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

const CustomTooltip = ({
  active,
  payload,
  showClicks,
  showCtr,
  showImpressions,
  showPosition,
}: CustomTooltipProps) => {
  const data = payload?.[0]?.payload as Data;

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

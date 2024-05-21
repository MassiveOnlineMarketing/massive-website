import React from 'react'

import { XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps, Area, AreaChart, Brush, CartesianGrid } from "recharts";

import { format, parse } from "date-fns";
import { FormattedDataItem } from '@/dashboard/google-search/actions/get-competitor-result-data';

const TestGraph = ({ data }: { data: FormattedDataItem[] }) => {

  // Get the keys from the first object in the data array
  let keys: string[] = [];
  if (data && data.length > 0 && data[data.length - 1]) {
    keys = Object.keys(data[data.length - 1]);
  }

  // Remove the "date" key
  const websiteKeys = keys.filter(key => key !== 'date');

  // Define a color array for the different websites
  const colors = ["#059669", "#3B82F6", "#7857FE", "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#6366F1", "#8B5CF6", "#EC4899"];

  console.log('websiteKeys', websiteKeys)
  return (
    <div style={{ width: '100%', height: '265px' }}><ResponsiveContainer>
      <AreaChart data={data} style={{ paddingBottom: 0 }} >

        <XAxis dataKey="date" interval={0} tickFormatter={(tickItem) => {
          const date = parse(tickItem, "yyyy-MM-dd", new Date());
          return format(date, "MM/dd");
        }}
          tick={{ fontSize: 12, fill: "#9CA3AF" }} />
        
        <CartesianGrid stroke="#E5E7EB" horizontal={true} vertical={false} />
        <Tooltip />
        <YAxis 
        reversed
          yAxisId={1}
          tick={{ fontSize: 12, fill: "#9CA3AF" }}
        />
        {websiteKeys.map((websiteKey, index) => (
          <Area
            key={websiteKey}
            isAnimationActive={false}
            yAxisId={1}
            type="linear"
            dataKey={websiteKey}
            stroke={colors[index % colors.length]}
            strokeWidth={3}
            fill="transparent"
          />
        ))}

      </AreaChart>
    </ResponsiveContainer></div>
  )
}

export default TestGraph
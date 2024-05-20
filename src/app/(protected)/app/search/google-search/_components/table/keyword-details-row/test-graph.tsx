import React from 'react'

import { XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps, Area, AreaChart, Brush, CartesianGrid } from "recharts";

import { format, parse } from "date-fns";
type GraphData = {
  date: string
  'vanpommeren.nl': number
  'koffiewarenhuis.nl': number
  'baristart.nl': number
}

const TestGraph = () => {

  const data: GraphData[] = [
    {
      date: '2021-01-01',
      'vanpommeren.nl': 4,
      'koffiewarenhuis.nl': 2,
      'baristart.nl': 3  
    },
    {
      date: '2021-01-02',
      'vanpommeren.nl': 3,
      'koffiewarenhuis.nl': 1  ,
      'baristart.nl': 2
    },
    {
      date: '2021-01-03',
      'vanpommeren.nl': 2,
      'koffiewarenhuis.nl': 5,
      'baristart.nl': 3
    },
    {
      date: '2021-01-04',
      'vanpommeren.nl': 1,
      'koffiewarenhuis.nl': 6,
      'baristart.nl': 3
    },
    {
      date: '2021-01-05',
      'vanpommeren.nl': 2,
      'koffiewarenhuis.nl': 5,
      'baristart.nl': 3
    },
    {
      date: '2021-01-06',
      'vanpommeren.nl': 3,
      'koffiewarenhuis.nl': 5,
      'baristart.nl': 2
    },
    {
      date: '2021-01-07',
      'vanpommeren.nl': 3,
      'koffiewarenhuis.nl': 4,
      'baristart.nl': 1
    },
  ]

  console.log(data)

  return (
    <div style={{width: '100%', height: '265px'}}><ResponsiveContainer>
        <AreaChart data={data} style={{ paddingBottom: 0 }}>

          <XAxis dataKey="date" interval={0} tickFormatter={(tickItem) => {
            const date = parse(tickItem, "yyyy-MM-dd", new Date());
            return format(date, "MM/dd");
          }}
          tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
          <CartesianGrid stroke="#E5E7EB" horizontal={true} vertical={false} />
          <Tooltip />
          <Area
            isAnimationActive={false}
            yAxisId="vanpommeren.nl"
            type="linear"
            dataKey="vanpommeren.nl"
            stroke="#059669"
            strokeWidth={3}
            fill="transparent"
          />
          <Area
            isAnimationActive={false}
            yAxisId="koffiewarenhuis.nl"
            type="linear"
            dataKey="koffiewarenhuis.nl"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="transparent"
          />
          <Area
            isAnimationActive={false}
            yAxisId="baristart.nl"
            type="linear"
            dataKey="baristart.nl"
            stroke="#7857FE"
            strokeWidth={3}
            fill="transparent"
          />
          
        </AreaChart>
      </ResponsiveContainer></div>
  )
}

export default TestGraph
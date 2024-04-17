import React from 'react'

import { SearchConsoleData } from './keyword-table'
import { Project, Result, SerpResult } from '@prisma/client'

import { XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps, Area, AreaChart, Brush } from 'recharts';


type Props = {
    gscAuthenticated?: boolean,
    searchConsoleData?: SearchConsoleData | null,
    keywordData: Result,
    topTenResults: SerpResult[],
    projectDetails?: Project
}



const KeywordDetailsRow = ({ gscAuthenticated, searchConsoleData, keywordData, topTenResults, projectDetails }: Props) => {
    console.log('render row')

    return (
        <div>
            {gscAuthenticated ? (
                <>
                    {searchConsoleData && (
                        <SearchConsoleChart searchConsoleData={searchConsoleData} />
                    )}
                </>
            ) : (
                <div className='flex w-full gap-2 h-fit'>
                    <div className='h-[128px] w-full bg-red-50'>Not auth</div>
                    <div className='h-[128px] w-full bg-red-50'>Not auth</div>
                    <div className='h-[128px] w-full bg-red-50'>Not auth</div>
                    <div className='h-[128px] w-full bg-red-50'>Not auth</div>
                </div>
            )}

        </div>
    )
}

export default KeywordDetailsRow


const SearchConsoleChart = ({ searchConsoleData }: { searchConsoleData: SearchConsoleData }) => {

    // Convert data into an array of objects also round the numbers
    const data = Object.entries(searchConsoleData).map(([date, data]) => ({
        date,
        clicks: Number(data.clicks.toFixed(1)),
        ctr: Number(data.ctr.toFixed(1)),
        impressions: Number(data.impressions.toFixed(1)),
        position: Number(data.position.toFixed(1))
    }));

    return (
        <div className="flex w-full h-fit">
            <Chart title="Clicks" data={data} color="#8884d8" dataKey="clicks" />
            <Chart title="CTR" data={data} color="#82ca9d" dataKey="ctr" />
            <Chart title="Impressions" data={data} color="#ffc658" dataKey="impressions" />
            <Chart title="Position" data={data} color="#ff7300" dataKey="position" />
        </div>
    );
};

const Chart = ({ title, data, color, dataKey }: { title: string, data: any[], color: string, dataKey: string }) => (
    <div className='w-full'>
        <h2 className="mx-auto w-fit text-xl">{title}</h2>
        <div style={{ width: '100%', height: 100 }}>
            <ResponsiveContainer >
                <AreaChart data={data} margin={{ left: -30 }}>
                    <defs>
                        <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" hide={true} />
                    <YAxis axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#color${title})`} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
);

// use <Tooltip content={<CustomTooltip />} />
const CustomTooltip = ({ active, payload, label }: TooltipProps<string, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #ccc' }}>
                <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

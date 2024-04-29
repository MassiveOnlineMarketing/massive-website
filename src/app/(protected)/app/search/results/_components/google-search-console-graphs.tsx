

import React from 'react'

// Types
import { PythonApiKeywordDetailSearchConsoleData } from '@/dashboard/types';

// Components 
import { XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps, Area, AreaChart, Brush } from 'recharts';
import SearchConsoleLoadingChartSvg from './search-console-loading-svg';

type Props = {
    searchConsoleData: PythonApiKeywordDetailSearchConsoleData | null,
    refresh_token: string | null
}

const GoogleSearchConsoleGraphs = ({ searchConsoleData, refresh_token }: Props) => {
    return (
        <div>
            {refresh_token ? (
                <>
                    {searchConsoleData ? (
                        <SearchConsoleChart searchConsoleData={searchConsoleData} />
                    ) : (
                        // TODO: gsc data loading
                        <div className="flex gap-4 w-full h-[152px]">
                            <SearchConsoleLoadingChart title="Clicks" />
                            <SearchConsoleLoadingChart title="CTR" />
                            <SearchConsoleLoadingChart title="Position" />
                            <SearchConsoleLoadingChart title="Impressions" />
                        </div>


                    )}
                </>
            ) : (
                // TODO: gsc not connected
                <div className='flex w-full gap-2 h-fit'>
                    <div className='h-[128px] w-full bg-red-50'>gsc Not Connected</div>
                    <div className='h-[128px] w-full bg-red-50'>gsc Not Connected</div>
                    <div className='h-[128px] w-full bg-red-50'>gsc Not Connected</div>
                    <div className='h-[128px] w-full bg-red-50'>gsc Not Connected</div>
                </div>
            )}
        </div>
    )
}

export default GoogleSearchConsoleGraphs


const SearchConsoleLoadingChart = ({ title }: { title: string }) => {

    return (
        <div className='w-full border border-blue-100 rounded-2xl p-[6px]'>
            <div className='w-full border border-blue-100 rounded-xl bg-gradient-to-b from-white to-[#Eff6FF]'>
                <h2 className="ml-4 mt-4 text-base leading-6 font-medium text-gray-800">{title}</h2>
                <SearchConsoleLoadingChartSvg />
            </div>
        </div>
    )
}
const SearchConsoleChart = ({ searchConsoleData }: { searchConsoleData: PythonApiKeywordDetailSearchConsoleData }) => {
    // Convert data into an array of objects also round the numbers
    const data = Object.entries(searchConsoleData).map(([date, data]) => ({
        date,
        clicks: Number(data.clicks.toFixed(1)),
        ctr: Number(data.ctr.toFixed(1)),
        impressions: Number(data.impressions.toFixed(1)),
        position: Number(data.position.toFixed(1))
    }));

    console.log(data)

    return (
        <div className="flex gap-4 w-full h-[152px]">
            <div className='w-full border border-blue-100 rounded-2xl p-[6px]'>
                <div className='w-full border border-blue-100 rounded-xl bg-gradient-to-b from-white to-[#Eff6FF]'>
                    <Chart title="Clicks" data={data} color="#3B82F6" dataKey="clicks" />
                </div>
            </div>
            <div className='w-full border border-green-100 rounded-2xl p-[6px]'>
                <div className='w-full border border-green-100 rounded-xl bg-gradient-to-b from-white to-[#ECFDF5]'>
                    <Chart title="CTR" data={data} color="#059669" dataKey="ctr" />
                </div>
            </div>
            <div className='w-full border border-yellow-100 rounded-2xl p-[6px]'>
                <div className='w-full border border-yellow-100 rounded-xl bg-gradient-to-b from-white to-[#FFFBEB]'>
                    <Chart title="Position" data={data} color="#F59E0B" dataKey="position" />
                </div>
            </div>
            <div className='w-full border border-primary-100 rounded-2xl p-[6px]'>
                <div className='w-full border border-primary-100 rounded-xl bg-gradient-to-b from-white to-[#F8F8FF]'>
                    <Chart title="Impressions" data={data} color="#7857FE" dataKey="impressions" />
                </div>
            </div>
        </div>
    );
};

const Chart = ({ title, data, color, dataKey }: { title: string, data: any[], color: string, dataKey: string }) => (
    <>
        <h2 className="ml-4 mt-4 text-base leading-6 font-medium text-gray-800">{title}</h2>
        <div style={{ width: '100%', height: 96 }}>
            <ResponsiveContainer >
                <AreaChart data={data} style={{ paddingBottom: 0 }}>
                    <defs>
                        <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.15} />
                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" hide={true} />
                    <YAxis axisLine={false} hide={true} />
                    <Tooltip />
                    <Area type="linear" strokeWidth={2} dataKey={dataKey} stroke={color} fill={`url(#color${title})`} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </>
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
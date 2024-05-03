

import React from 'react'
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Types
import { PythonApiKeywordDetailSearchConsoleData } from '@/dashboard/types';

// Components 
import { XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps, Area, AreaChart, Brush } from 'recharts';
import { TooltipTrigger, Tooltip as UiTooltop, TooltipContent } from '@/components/ui/tooltip';

import { LockClosedIcon } from '@heroicons/react/20/solid';

type Props = {
    searchConsoleData: PythonApiKeywordDetailSearchConsoleData | null,
    hasGscUrl: boolean
    refresh_token?: string | null
}

const GoogleSearchConsoleGraphs = ({ searchConsoleData, hasGscUrl, refresh_token }: Props) => {

    const hasRefreshToken = refresh_token !== null


    return (
        <div>
            {hasGscUrl ? (
                <>
                    {searchConsoleData ? (
                        <SearchConsoleChart searchConsoleData={searchConsoleData} />
                    ) : (
                        <div className="flex gap-4 w-full h-[152px]">
                            <SearchConsoleLoading title="Clicks" borderColor='blue-100' backgroundGradientColor='Eff6FF' />
                            <SearchConsoleLoading title="CTR" borderColor='green-100' backgroundGradientColor='ECFDF5' />
                            <SearchConsoleLoading title="Position" borderColor='yellow-100' backgroundGradientColor='FFFBEB' />
                            <SearchConsoleLoading title="Impressions" borderColor='primay-100' backgroundGradientColor='F8F8FF' />
                        </div>


                    )}
                </>
            ) : (
                <div className="flex gap-4 w-full h-[152px]">
                    <SearchConsoleNotAuthorized title="Clicks" hasRefreshToken={hasRefreshToken} />
                    <SearchConsoleNotAuthorized title="CTR" hasRefreshToken={hasRefreshToken} />
                    <SearchConsoleNotAuthorized title="Position" hasRefreshToken={hasRefreshToken} />
                    <SearchConsoleNotAuthorized title="Impressions" hasRefreshToken={hasRefreshToken} />
                </div>
            )}
        </div>
    )
}

export default GoogleSearchConsoleGraphs

type SearchConsoleLoadingProps = {
    title: string
    borderColor: string
    backgroundGradientColor: string
}

const SearchConsoleLoading = ({ title, borderColor, backgroundGradientColor }: SearchConsoleLoadingProps) => {

    return (
        <div className={`w-full h-full border border-${borderColor} rounded-2xl p-[6px]`}>
            <div className={cn(
                'relative w-full h-full border rounded-xl',
                `border-${borderColor} bg-gradient-to-b from-white to-[#${backgroundGradientColor}]`
            )}>
                <h2 className="ml-4 mt-4 text-base leading-6 font-medium text-gray-800">{title}</h2>
                <LoadingSpinner className='absolute left-1/2 top-1/2 -translate-x-1/2' />
            </div>
        </div>
    )
}

const LoadingSpinner = ({ className }: { className?: string }) => {

    return (
        <div role="status" className={className}>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-500 fill-primary-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

type SearchConsoleNotAuthorizedProps = {
    title: string
    hasRefreshToken: boolean
}

const SearchConsoleNotAuthorized = ({ title, hasRefreshToken }: SearchConsoleNotAuthorizedProps) => {

    return (
        <div className={`w-full h-[152px] border border-gray-100 rounded-2xl p-[6px]`}>
            <div className={cn(
                'relative w-full h-full border rounded-xl',
                `border-gray-100 bg-gradient-to-b from-white to-[#f8fafc]`
            )}>
                <h2 className="ml-4 mt-4 text-base leading-6 font-medium text-gray-800">{title}</h2>
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 flex flex-col justify-center gap-1'>
                    <UiTooltop>
                        <TooltipTrigger>
                            <LockClosedIcon className='w-8 h-8 text-gray-400 mx-auto' />
                        </TooltipTrigger>
                        <TooltipContent>
                            {hasRefreshToken ? (
                                <p className='text-gray-500 text-center'>Add GSC account to website</p>
                            ) : (
                                <Link href='/app/settings/integrations' className='text-primary-500 text-center'>Connect Search Console</Link>
                            )}
                        </TooltipContent>
                    </UiTooltop>

                </div>
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
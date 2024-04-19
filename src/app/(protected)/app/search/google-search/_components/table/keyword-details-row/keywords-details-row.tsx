import React, { useEffect, useState } from 'react'

import { PythonApiKeywordDetailSearchConsoleData } from '@/dashboard/types';
import { GoogleSearchKeyword, GoogleSearchProject, GoogleSearchSerpResult } from '@prisma/client'

import { XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps, Area, AreaChart, Brush } from 'recharts';
import { useWebsiteDetailsStore } from '@/lib/zustand/website-details-store';
import { Card, CardTitle } from './card';
import { GoogleIconSvg } from '../../../_assets';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { KeywordResultWithTagProp } from '@/serp/serp-types';
import { Button } from '@/components/ui/button';
import RelatedSearchesComponent from './related-searches';
import PeopleAlsoAsk from './people-also-ask';
import axios from 'axios';
import { getTopTenSerpResults } from '@/dashboard/google-search/data/google-search-serp-result';


type Props = {
    keywordData: KeywordResultWithTagProp,
    refresh_token?: string
}



const KeywordDetailsRow = ({ keywordData, refresh_token }: Props) => {


    const gscUrl = useWebsiteDetailsStore(state => state.WebsiteDetails?.gscUrl)
    const isGscConnected = gscUrl ? true : false

    const [showAll, setShowAll] = useState(false);

    const [searchConsoleData, setSearchConsoleData] = useState<PythonApiKeywordDetailSearchConsoleData | null>(null);
    const [topTenResults, setTopTenResults] = useState<GoogleSearchSerpResult[]>([]);

    useEffect(() => {
        setSearchConsoleData(null)
        fetchSearchConsoleData(keywordData.keywordName)
        fetchTopTenResults(keywordData.keywordId)
    }, [keywordData])


    const fetchSearchConsoleData = async (keyword: string) => {
        if (!refresh_token || !gscUrl) {
            return;
        }
        const encodedKeyword = encodeURIComponent(keyword);
        const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/keyword_data?keyword=${encodedKeyword}&site_url=${gscUrl}&refresh_token=${refresh_token}`;
        const res = await axios(url);

        setSearchConsoleData(res.data);
    }

    const fetchTopTenResults = async (keywordId: string) => {
        const res = await getTopTenSerpResults(keywordId);

        setTopTenResults(res);
    }

    return (
        <div>
            {isGscConnected ? (
                <>
                    {searchConsoleData && (
                        <SearchConsoleChart searchConsoleData={searchConsoleData} />
                    )}
                </>
            ) : (
                <div className='flex w-full gap-2 h-fit'>
                    <div className='h-[128px] w-full bg-red-50'>gsc Not Connected</div>
                    <div className='h-[128px] w-full bg-red-50'>gsc Not Connected</div>
                    <div className='h-[128px] w-full bg-red-50'>gsc Not Connected</div>
                    <div className='h-[128px] w-full bg-red-50'>gsc Not Connected</div>
                </div>
            )}

            {/* <Card className='mt-6'>
                <CardTitle heading='Keyword Insight' icon={GoogleIconSvg} />
                test
            </Card> */}


            <Card className='my-6 '>
                <CardTitle heading='Google Data' icon={GoogleIconSvg} />
                <div className='grid grid-cols-2'>
                    <div className='w-full'>
                        <p className='mb-3 pt-2 text-lg leading-7 font-medium text-gray-800'>Top Search Results</p>
                        {topTenResults.slice(0, showAll ? topTenResults.length : 3).map((result, index) => (
                            <SerpCard key={result.id} result={result} />
                        ))}
                        <button className='mx-auto w-fit flex' onClick={() => setShowAll(!showAll)}>{!showAll ? 'Read More' : 'Read Less'}</button>
                    </div>

                    <div>
                        <RelatedSearchesComponent keywordData={keywordData} />
                        <PeopleAlsoAsk keywordData={keywordData} />
                    </div>
                </div>
            </Card>

        </div>
    )
}

export default KeywordDetailsRow


const SerpCard = ({ result }: { result: GoogleSearchSerpResult }) => {
    const url = new URL(result.url)
    const domainName = url.hostname.replace('www.', '').split('.').slice(0, -1).join('.');

    const { metaTitle, metaDescription } = result

    return (
        <div key={result.id} className='max-w-[530px] mb-4'>
            <a href={result.url || ''} target="_blank" rel="noopener noreferrer">
                <div className='flex gap-[6px] items-center'>
                    <div className='w-8 h-8 flex items-center justify-center bg-primary-50 rounded-full'>
                        <GlobeAltIcon className='h-5 w-5 text-gray-400' />
                    </div>
                    <div>
                        <p className='text-gray-800'>{domainName}</p>
                        <p className="-mt-1 text-gray-500 text-sm">{result.url.length > 60 ? `${result.url.slice(0, 60)}...` : result.url}</p>
                    </div>
                </div>

                <p className="text-2xl text-primary-600">{metaTitle}</p>
                <p className="text-sm text-gray-800">{metaDescription}</p>
            </a>
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
        <div className="flex gap-4 w-full h-fit">
            <div className='w-full border border-blue-50 rounded-2xl p-[6px]'>
                <div className='w-full border border-blue-100 rounded-xl bg-gradient-to-b from-white to-[#Eff6FF]'>
                    <Chart title="Clicks" data={data} color="#3B82F6" dataKey="clicks" />
                </div>
            </div>
            <div className='w-full border border-green-50 rounded-2xl p-[6px]'>
                <div className='w-full border border-green-100 rounded-xl bg-gradient-to-b from-white to-[#ECFDF5]'>
                    <Chart title="CTR" data={data} color="#059669" dataKey="ctr" />
                </div>
            </div>
            <div className='w-full border border-yellow-50 rounded-2xl p-[6px]'>
                <div className='w-full border border-yellow-100 rounded-xl bg-gradient-to-b from-white to-[#FFFBEB]'>
                    <Chart title="Position" data={data} color="#F59E0B" dataKey="position" />
                </div>
            </div>
            <div className='w-full border border-primary-50 rounded-2xl p-[6px]'>
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
        <div style={{ width: '100%', height: 85 }}>
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

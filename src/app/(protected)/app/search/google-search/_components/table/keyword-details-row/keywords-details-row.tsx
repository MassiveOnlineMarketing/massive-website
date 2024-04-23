import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { PythonApiKeywordDetailSearchConsoleData } from '@/dashboard/types';
import { GoogleSearchSerpResult } from '@prisma/client'
import { KeywordResultWithTagProp } from '@/serp/serp-types';


import { useWebsiteDetailsStore } from '@/lib/zustand/website-details-store';
import { getTopTenSerpResults } from '@/dashboard/google-search/data/google-search-serp-result';

// Components
import { Card, CardTitle } from './card';
import { GoogleIconSvg } from '../../../_assets';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

// Elements
import RelatedSearchesComponent from './related-searches';
import PeopleAlsoAsk from './people-also-ask';
import GoogleSearchConsoleGraphs from '../../../../results/_components/google-search-console-graphs';


type Props = {
    keywordData: KeywordResultWithTagProp,
    refresh_token: string | null
}



const KeywordDetailsRow = ({ keywordData, refresh_token }: Props) => {


    const gscUrl = useWebsiteDetailsStore(state => state.WebsiteDetails?.gscUrl)
    
    const [showAll, setShowAll] = useState(false);

    const [searchConsoleData, setSearchConsoleData] = useState<PythonApiKeywordDetailSearchConsoleData | null>(null);
    const [topTenResults, setTopTenResults] = useState<GoogleSearchSerpResult[]>([]);

    useEffect(() => {

        setSearchConsoleData(null)
        fetchSearchConsoleData(keywordData.keywordName)
        fetchTopTenResults(keywordData.keywordId)
    }, [keywordData]);


    const fetchSearchConsoleData = async (keyword: string) => {
        console.log('fetchSearchConsoleData')
        if (!refresh_token) {
            return;
        }
        const encodedKeyword = encodeURIComponent(keyword);
        const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/keyword_data?keyword=${encodedKeyword}&site_url=${gscUrl}&refresh_token=${refresh_token}`;
        const res = await axios(url);
        console.log('res', res.data)

        setSearchConsoleData(res.data);
    }

    const fetchTopTenResults = async (keywordId: string) => {
        const res = await getTopTenSerpResults(keywordId);

        setTopTenResults(res);
    }

    return (
        <div>

            <GoogleSearchConsoleGraphs
                searchConsoleData={searchConsoleData}
                refresh_token={refresh_token}
            />

            {/* <Card className='mt-6'>
                <CardTitle heading='Keyword Insight' icon={GoogleIconSvg} />
                test
            </Card> */}


            <Card className='my-6 '>
                <CardTitle heading='Google Data' icon={GoogleIconSvg} />
                <div className='grid grid-cols-2'>
                    <div className='w-full min-h-[500px]'>
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



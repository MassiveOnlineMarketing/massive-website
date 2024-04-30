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
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';


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
        try {
            const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/keyword_data?keyword=${encodedKeyword}&site_url=${gscUrl}&refresh_token=${refresh_token}`;
            const res = await axios(url);

            setSearchConsoleData(res.data);
        } catch (error) {
            console.error(error)
        }
    }

    const fetchTopTenResults = async (keywordId: string) => {
        const res = await getTopTenSerpResults(keywordId);

        setTopTenResults(res);
    }


    type PillColor = 'primary' | 'red' | 'yellow' | 'green';

    const getMetaTitleColorAndText = (value: number): { color: PillColor, text: string } => {
        if (value < 35 || value > 60) {
            return { color: 'red', text: 'Poor' };
        } else if (value >= 35 && value <= 50) {
            return { color: 'yellow', text: 'Moderate' };
        } else if (value > 50 && value <= 60) {
            return { color: 'green', text: 'Excellent' };
        }
        return { color: 'primary', text: '' };
    };

    const getPositionColorAndText = (value: number): { color: PillColor, text: string } => {
        if (value < 5) {
            return { color: 'green', text: 'Excellent' };
        } else if (value >= 5 && value <= 10) {
            return { color: 'yellow', text: 'Moderate' };
        } else if (value > 10) {
            return { color: 'red', text: 'Poor' };
        }
        return { color: 'primary', text: '' };
    }

    const getMetaDescriptionColorAndText = (value: number): { color: PillColor, text: string } => {
        console.log('value', value)
        if (value < 100 || value > 160) {
            return { color: 'red', text: 'Poor' };
        } else if (value >= 100 && value <= 120) {
            return { color: 'yellow', text: 'Moderate' };
        } else if (value > 120 && value <= 160) {
            return { color: 'green', text: 'Excellent' };
        }
        return { color: 'primary', text: '' };
    }

    return (
        <div>
            <GoogleSearchConsoleGraphs
                searchConsoleData={searchConsoleData}
                refresh_token={refresh_token}
            />

            <Card className='mt-6'>
                <CardTitle heading='Keyword Insight' icon={GoogleIconSvg} />
                <p className='mb-3 pt-2 text-lg leading-7 font-medium text-gray-800'>Details Overview</p>
                <div className='max-w-[530px] flex flex-col'>
                    <div className='py-3 flex justify-between items-center w-full border-b border-dashed border-gray-200'>
                        <p className='text-gray-800'>Keyword</p>
                        <Pill color='primary' variant='text'>{keywordData.keywordName}</Pill>
                    </div>
                    <div className='py-3 flex justify-between items-center w-full border-b border-dashed border-gray-200'>
                        <p className='text-gray-800'>Url</p>
                        <Pill color='primary' variant='text'>{keywordData.url}</Pill>
                    </div>
                    <div className='py-3 flex items-center w-full border-b border-dashed border-gray-200'>
                        <p className='text-gray-800'>Position</p>
                        {
                            keywordData.position && (
                                <Pill color={getPositionColorAndText(keywordData.position).color} variant='icon' className='ml-auto mr-2'>
                                    {getPositionColorAndText(keywordData.position).text}
                                </Pill>
                            )
                        }
                        <Pill color='primary' variant='text'>#{keywordData.position}</Pill>
                    </div>
                    <div className='py-3 flex items-center w-full border-b border-dashed border-gray-200'>
                        <p className='text-gray-800'>Meta Title</p>
                        {
                            keywordData.position && (
                                <Pill color={getMetaTitleColorAndText(keywordData.metaTitle?.length || 0).color} variant='icon' className='ml-auto mr-2'>
                                    {getMetaTitleColorAndText(keywordData.metaTitle?.length || 0).text}
                                </Pill>
                            )
                        }
                        <Pill color='primary' variant='text'>{keywordData.metaTitle?.length || 0}/60</Pill>
                    </div>
                    <p className='py-3 text-base leading-6 font-normal text-gray-500'>{keywordData.metaTitle}</p>
                    <div className='py-3 flex items-center w-full border-b border-dashed border-gray-200'>
                        <p className='text-gray-800'>Meta Description</p>
                        {
                            keywordData.position && (
                                <Pill color={getMetaDescriptionColorAndText(keywordData.metaDescription?.length || 0).color} variant='icon' className='ml-auto mr-2'>
                                    {getMetaDescriptionColorAndText(keywordData.metaDescription?.length || 0).text}
                                </Pill>
                            )
                        }
                        <Pill color='primary' variant='text'>{keywordData.metaDescription?.length || 0}/160</Pill>
                    </div>
                    <p className='py-3 text-base leading-6 font-normal text-gray-500'>{keywordData.metaDescription}</p>
                </div>
            </Card>

            <Card className='my-6 '>
                <CardTitle heading='Google Data' icon={GoogleIconSvg} />
                <div className='grid grid-cols-2'>
                    <div className='w-full min-h-[500px]'>
                        <p className='mb-3 pt-2 text-lg leading-7 font-medium text-gray-800'>Top Search Results</p>
                        {topTenResults.slice(0, showAll ? topTenResults.length : 3).map((result, index) => (
                            <SerpCard key={result.id} result={result} />
                        ))}
                        <button className='mx-auto w-fit flex' onClick={() => setShowAll(!showAll)}>{!showAll ? 'Show More' : 'Show Less'}</button>
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


const pillVariants = cva(
    'rounded-full text-xs leading-4 font-medium border',
    {
        variants: {
            color: {
                primary: 'border-primary-100 text-primary-500 bg-gradient-to-b from-white to-[#f8f8ff]',
                green: 'border-green-100 text-green-500 bg-gradient-to-b from-white to-[#ecfdf5]',
                red: 'border-red-100 text-red-500 bg-gradient-to-b from-white to-[#fef2f2]',
                yellow: 'border-yellow-100 text-yellow-500 bg-gradient-to-b from-white to-[#fffbeb]',
            },
            variant: {
                text: 'px-3 py-[6px]',
                icon: 'pl-3 pr-4 py-[6px]'
            }
        }
    }
)

interface PillProps extends VariantProps<typeof pillVariants> {
    children: React.ReactNode,
    className?: string
}


const Pill = ({ children, className, variant, color }: PillProps) => {
    return (
        <span className={cn(
            pillVariants({ variant, color }),
            className
        )}>{children}</span>
    )
}
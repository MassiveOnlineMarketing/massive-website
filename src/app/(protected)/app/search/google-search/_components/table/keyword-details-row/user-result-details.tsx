
import { KeywordResultWithTagProp } from '@/dashboard/google-search/serp-types'

import { Pill } from "@/components/ui/pill";

const UserResultDetails = ({ keywordData }: { keywordData: KeywordResultWithTagProp }) => {

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
        <>
            <div className='py-3 flex justify-between items-center w-full border-b border-dashed border-gray-200'>
                <p className='text-gray-800 font-medium'>Keyword</p>
                <Pill color='primary' variant='text'>{keywordData.keywordName}</Pill>
            </div>
            <div className='py-3 flex justify-between items-center w-full border-b border-dashed border-gray-200'>
                <p className='text-gray-800 font-medium'>Url</p>
                <Pill color='primary' variant='text'>{keywordData.url}</Pill>
            </div>
            <div className='py-3 flex items-center w-full border-b border-dashed border-gray-200'>
                <p className='text-gray-800 font-medium'>Position</p>
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
                <p className='text-gray-800 font-medium'>Meta Title</p>
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
                <p className='text-gray-800 font-medium'>Meta Description</p>
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
        </>
    )
}

export default UserResultDetails;
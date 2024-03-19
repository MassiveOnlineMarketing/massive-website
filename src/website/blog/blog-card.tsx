import React from 'react'
import Image from 'next/image';
import { PAYLOAD_BACKEND_URL } from '../../../routes';

import { cn, formatDate } from '@/lib/utils';

import { InternalAnchor } from '@/components/ui/link';

import { constants } from '@/styles/styles';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { Calendar } from 'lucide-react';

const BlogCard = ( ...props: any ) => {
    // console.log('props bog', props);
    const post = props[0];
    const postedAt = formatDate(post.createdAt);
    const containerStyles = props[0].containerStyles;

    return (
        <article 
        className={cn(
            `p-3 bg-white rounded-2xl flex flex-col`,
            containerStyles
            )}
            itemScope itemType="http://schema.org/ListItem">
            <div className='flex flex-col gap-4'>

                <div className='relative text-xs text-gray-800'>
                    <Image src={`${PAYLOAD_BACKEND_URL}${post.heroImage.url}`} alt={post.heroImage.alt} width={post.heroImage.width} height={post.heroImage.height} className='rounded-lg ' />

                    <div className={`absolute left-3 bottom-3 px-3 py-[6px] w-fit h-fit rounded-4xl ${constants.glassFill} border-t-[1.5px] border-[#fff]/50 flex items-center gap-2`}>
                        <BookOpenIcon className='w-5 h-5' />
                        <p>{post.timeToRead} minuten</p>
                    </div>
                    <div className={`absolute right-3 bottom-3 px-3 py-[6px] w-fit h-fit rounded-4xl ${constants.glassFill} border-t-[1.5px] border-[#fff]/50 flex items-center gap-2`}>
                        <Calendar className='w-5 h-5' />
                        <time dateTime={postedAt}>{postedAt}</time>
                    </div>
                </div>
                <p itemProp="name">
                    <InternalAnchor href={`/blog/${post.slug}`} className='whitespace-normal text-xl leading-7 font-semibold text-gray-800'>{post.title}</InternalAnchor>
                </p>
                <p className='text-gray-500' itemProp="description">
                    {post.meta.description}
                </p>
            </div>
            <div className='mt-auto'>
                <div className='mt-4 h-[1px] w-full bg-gray-200'></div>
                <InternalAnchor href={`/blog/${post.slug}`} size='sm' variant='glass' className="mt-6">Lees meer <ArrowRightIcon className='w-4 h-4' /></InternalAnchor>
            </div>
        </article>
    )
}

export default BlogCard
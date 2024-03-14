import { Category, Tag } from '@/payload/payload-types'
import Link from 'next/link'
import React from 'react'
import { BASE_URL } from '../../../../../routes'
import { fetchCategories } from '@/payload/api/fetch-categories';

interface NavigationProps {
    items?: Category[] | Tag[];
    currentHighlight: string;
    isCategory?: boolean;
}


const Navigation: React.FC<NavigationProps> = async ({ items, currentHighlight, isCategory }) => {

    let categories: Category[] = []

    try {
        const response = await fetchCategories()
        categories = response.docs
    } catch (error) {
        console.error('error', error)
    }

    // console.log('items', items)
    return (
        <nav className='mb-10 py-12 border-b border-gray-200'>
            <ul className='flex flex-wrap md:flex-row gap-y-[18px] md:gap-11 text-sm md:text-base'>
            { isCategory ? <li className='mx-[6px]'><Link className={currentHighlight === 'blog' ? ' px-[18px] py-[6px] md:px-[37px] md:py-3 bg-primary-500 rounded-full text-white font-semibold' : 'py-[6px] md:py-3 text-gray-800'} href={`${BASE_URL}/blog`}>Alles</Link></li> : null }
            {categories.map(category => (
                    <li key={category.id} className='px-[6px]'>
                        <Link className={category.slug === currentHighlight ? 'px-[18px] py-[6px] md:px-[37px] md:py-3 bg-primary-500 rounded-full text-white font-semibold' : 'py-[6px] md:py-3 text-gray-800'} href={`${BASE_URL}/blog/categorie/${category.slug}`}>{category.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation
'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavigationProps } from './dashboard-layout';
import { GoogleSearchProject } from '@prisma/client';

// Components
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import WebsiteSelectionButton from './website-selection-button';
import WebsiteFormDialog from './website-form-dialog';
import { useWebsiteDetailsStore } from '@/lib/zustand/website-details-store';

// Assets
import {
    HomeIcon,
    MagnifyingGlassIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import { Cog6ToothIcon, DocumentMagnifyingGlassIcon, PresentationChartLineIcon, QuestionMarkCircleIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { getGoogleSearchProjectByWebsiteId } from '@/dashboard/data/google-search-project';
import { usePathname } from 'next/navigation';
import GoogleSearchProjectFormDialog from './project-form-dialog';

type SecondarySidebarProps = {
    navigation?: NavigationProps[],
    secondarySidebarOpen: boolean,
    setSecondarySidebarOpen: (open: boolean) => void
}

type TestProps = {
    name: string,
    href: string,
    disabled?: boolean
}

const SecondarySidebar = ({ secondarySidebarOpen, setSecondarySidebarOpen }: SecondarySidebarProps) => {
    const pathname = usePathname()

    const [openWebsiteDialog, setOpenWebsiteDialog] = useState(false)
    const [openGoogleSearchProjectDialog, setOpenGoogleSearchProjectDialog] = useState(false)
    const currentWebsite = useWebsiteDetailsStore(state => state.WebsiteDetails);
    const [campaignsChildren, setCampaignsChildren] = useState<TestProps[]>([])

    const navigation = [
        // { name: 'Dashboard', href: '/app/search/', icon: HomeIcon },
        {
            name: 'SERP',
            href: '/app/search/results',
            icon: DocumentMagnifyingGlassIcon,
            children: [
                { name: 'Google', href: '/app/search/results/google', disabled: currentWebsite?.gscUrl ? false : true },
                { name: 'Bing', href: '/app/search/results/bing', disabled: true },
            ]
        },
        {
            name: 'Campaigns',
            href: '/app/search/campaigns',
            icon: PresentationChartLineIcon,
            children: campaignsChildren
        },
    ];


    useEffect(() => {
        fetchProjects()
    }, [currentWebsite])

    const fetchProjects = async () => {
        if (!currentWebsite) return
        const searchProjects = await getGoogleSearchProjectByWebsiteId(currentWebsite.id)

        const newCampaignsChildren = searchProjects.map((project: GoogleSearchProject) => ({
            name: project.projectName,
            href: `/app/search/google-search/${project.id}`,
        }));

        setCampaignsChildren(newCampaignsChildren); // Set the state here
    }

    const isActive = (href: string, pathname: string) => {
        console.log('pathname', pathname);
        console.log('href', href);
        return (href === '/app' && pathname === href) || (pathname.includes(href) && href !== '/app');
    };

    return (
        <div className={cn(
            secondarySidebarOpen ? 'w-[375px]' : 'w-0',
            'lg:block hidden relative transition-all duration-500 ease-in-out bg-primary-50'
        )}>
            {/* Menu items */}
            <div
                className={cn(
                    secondarySidebarOpen ? 'translate-x ' : '-translate-x-[375px] ',
                    ' transition-all duration-500 ease-in-out',
                    'w-[375px] px-3 py-6 h-full flex flex-col bg-primary-50'
                )}
            >
                <WebsiteSelectionButton />
                {navigation.map((item) => (
                    <div key={item.name}>
                        <Link href={item.href}
                            className={cn('pl-2 py-2 pr-3 flex items-center relative')}
                        >
                            <item.icon className={cn(
                                'h-6 w-6 pr-2 ',
                                isActive(item.href, pathname) ? 'text-primary-500' : 'text-gray-500'
                            )} />
                            <span className={cn(
                                'text-base leading-6 font-medium',
                                isActive(item.href, pathname) ? 'text-primary-500' : 'text-gray-800'
                            )}>{item.name}</span>
                            <div className={cn(
                                'absolute -left-3 h-6 top-1/2 -translate-y-1/2 w-1 bg-primary-500 rounded-r-sm',
                                isActive(item.href, pathname) ? '' : 'hidden'
                            )}>
                            </div>
                        </Link>
                        {item.children && item.children.map((child) => (
                            <Link key={child.name}
                                href={child.disabled ? '#' : child.href}
                                className={cn(
                                    'ml-[18px] px-[16px] py-2 border-l border-primary-100 flex items-center relative',
                                    child.disabled ? 'text-gray-400' : 'text-gray-500',
                                )}
                            >
                                <span className={cn(
                                    'text-base leading-6 font-medium',
                                    isActive(child.href, pathname) ? 'text-primary-500' : 'text-gray-800'
                                )}>{child.name}</span>
                                {child.disabled && <LockClosedIcon className='h-5 w-5 ml-auto text-gray-400' />}
                            </Link>
                        ))}
                        {item.name === 'Campaigns' && (
                            <button
                                className='ml-[18px] px-[16px] py-2 border-l border-primary-100 flex items-center text-base leading-6 font-medium'
                                onClick={() => setOpenGoogleSearchProjectDialog(true)}
                            >
                                Create New Google Search
                            </button>
                        )}                        
                    </div>
                ))}
                <div className='mt-auto'>
                    <button onClick={() => setOpenWebsiteDialog(true)} className='py-2 flex gap-4 items-center'><Cog6ToothIcon className='w-6 h-6 text-gray-400' /><span className='text-gray-500 text-base leading-6 font-medium'>Website Settings</span></button>
                    <Link href='/search/help' className='py-2 flex gap-4 items-center'><QuestionMarkCircleIcon className='w-6 h-6 text-gray-400' /><span className='text-gray-500 text-base leading-6 font-medium'>Help Center</span></Link>
                </div>
            </div>

            {/* Open en Close secondary sidebar */}
            <div className='absolute w-4 h-fit -right-3 top-1/2 -translate-y-1/2 z-50'>
                <Tooltip>
                    <TooltipTrigger className='w-8 h-[72px]'>
                        <div className="flex h-[72px] w-8 items-center justify-center group " onClick={() => setSecondarySidebarOpen(!secondarySidebarOpen)}>
                            <div className="flex h-6 w-6 flex-col items-center">
                                <div className={cn(
                                    "h-3 w-1 rounded-full bg-gray-500 translate-y-[0.15rem] duration-300 ease-in-out",
                                    secondarySidebarOpen ? 'group-hover:rotate-[15deg]' : 'group-hover:rotate-[-15deg]'
                                )}></div>
                                <div className={cn(
                                    "h-3 w-1 rounded-full bg-gray-500 translate-y-[-0.15rem] duration-300 ease-in-out",
                                    secondarySidebarOpen ? 'group-hover:rotate-[-15deg]' : 'group-hover:rotate-[15deg]'
                                )}></div>
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side='right'>
                        <p>{secondarySidebarOpen ? 'Close' : 'Open'}</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            <GoogleSearchProjectFormDialog open={openGoogleSearchProjectDialog} setOpen={setOpenGoogleSearchProjectDialog} website={null} />
            <WebsiteFormDialog open={openWebsiteDialog} setOpen={setOpenWebsiteDialog} website={currentWebsite} />
        </div>
    )
}

export default SecondarySidebar;




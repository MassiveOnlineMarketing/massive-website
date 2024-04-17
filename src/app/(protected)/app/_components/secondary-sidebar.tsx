import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavigationProps } from './dashboard-layout';

// Components
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import ProjectSelectionButton from './project-selection-button';
import { Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import WebsiteSelectionButton from './website-selection-button';

// Assets

type SecondarySidebarProps = {
    navigation: NavigationProps[],
    secondarySidebarOpen: boolean,
    setSecondarySidebarOpen: (open: boolean) => void
}

const SecondarySidebar = ({ navigation, secondarySidebarOpen, setSecondarySidebarOpen }: SecondarySidebarProps) => {

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
                            className={cn(
                                'px-6 py-[16px] flex items-center relative',
                            )}
                        >
                            {/* <item.icon className='h-8 w-8 text-gray-600' /> */}
                            <span className='text-sm'>{item.name}</span>
                        </Link>
                    </div>
                ))}
                <div className='mt-auto'>
                    <Link href='/search/settings' className='py-2 flex gap-4 items-center'><Cog6ToothIcon className='w-6 h-6 text-gray-400' /><span className='text-gray-500 text-base leading-6 font-medium'>Project Settings</span></Link>
                    <Link href='/search/help' className='py-2 flex gap-4 items-center'><QuestionMarkCircleIcon className='w-6 h-6 text-gray-400' /><span className='text-gray-500 text-base leading-6 font-medium'>Help Center</span></Link>
                </div>
            </div>

            {/* Open en Close secondary sidebar */}
            <div className='absolute w-4 h-fit -right-4 top-1/2 -translate-y-1/2 z-50'>
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
        </div>
    )
}

export default SecondarySidebar;




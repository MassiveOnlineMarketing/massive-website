'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Components
import { TooltipProvider } from '@/components/ui/tooltip';

// Layout
import PrimarySidebar from './primary-sidebar';
import SecondarySidebar from './secondary-sidebar';
import MobileSidebar from './mobile-sidebar';

// Assets
import {
    ComputerDesktopIcon,
    CreditCardIcon,
    FolderIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import {
    Bars3Icon,
} from '@heroicons/react/24/outline'
import TopBar from './topbar';

export type NavigationProps = {
    name: string,
    href: string,
    icon: React.ElementType
}

const navigation = [
    { name: 'Dashboard', href: '/app', icon: HomeIcon },
    { name: 'Search', href: '/app/search', icon: MagnifyingGlassIcon },
    // { name: 'Website', href: '/app/website', icon: ComputerDesktopIcon },
    { name: 'Billing', href: '/app/billing', icon: CreditCardIcon },
]

const searchNavigation = [
    { name: 'Dashboard', href: '/app/search/', icon: HomeIcon },
    { name: 'Results', href: '/app/search/results', icon: UsersIcon },
    { name: 'Keywords', href: '/app/search/keywords', icon: MagnifyingGlassIcon },
]

const websiteNavigation = [
    { name: 'Dashboard', href: '/app/website', icon: HomeIcon },
    { name: 'Niewsbrief', href: '/app/website/niewsbrief', icon: FolderIcon },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const [currentNavigation, setCurrentNavigation] = useState<NavigationProps[]>()
    const [secondarySidebarOpen, setSecondarySidebarOpen] = useState(true)


    useEffect(() => {
        if (pathname.startsWith('/app/website')) {
            setCurrentNavigation(websiteNavigation)
            // console.log('websiteNavigation')
        } else if (pathname.startsWith('/app/search')) {
            setCurrentNavigation(searchNavigation)
            // console.log('searchNavigation')
        } else {
            setCurrentNavigation(undefined)
            // console.log('undefined')
        }
    }, [pathname])


    useEffect(() => {
        setSecondarySidebarOpen(true)
    }, [currentNavigation])


    const isActive = (href: string, pathname: string) => {
        return (href === '/app' && pathname === href) || (pathname.includes(href) && href !== '/app');
    };

    return (
        <main className="h-full">
            <TooltipProvider>
                {/* Topbar */}
                <TopBar setMobileSidebarOpen={setMobileSidebarOpen} />

                <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setMobileSidebarOpen(true)}>
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* Mobile sidebar */}
                <MobileSidebar sidebarOpen={mobileSidebarOpen} setSidebarOpen={setMobileSidebarOpen} pathname={pathname} navigation={navigation} />

                <div className="flex flex-row h-[calc(100vh-64px)]">
                    {/* <div className='lg:block hidden'> */}
                    {/* Primary sidebar */}
                    <PrimarySidebar navigation={navigation} pathname={pathname} isActive={isActive} setSecondarySidebarOpen={setSecondarySidebarOpen} />

                    {/* </div> */}


                    {/* Content */}
                    <div className="w-full h-full p-[8px] relative ">
                        {/* Secondery sidebar 
                        */}
                        <div className="absolute inset-0 bg-transparent box-content inner-shadow lg:rounded-tl-3xl border-2 overflow-hidden flex">
                            {currentNavigation && <SecondarySidebar navigation={currentNavigation} secondarySidebarOpen={secondarySidebarOpen} setSecondarySidebarOpen={setSecondarySidebarOpen} />}
                            <div className="h-full w-full overflow-y-auto bg-primary-50">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </TooltipProvider>
        </main>
    );
}





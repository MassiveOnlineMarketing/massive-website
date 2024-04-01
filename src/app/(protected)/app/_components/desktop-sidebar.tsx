'use client';

import {
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import Link from 'next/link';


type Props = {
  children: React.ReactNode;
  pathname: string;
  navigation: { name: string; href: string; icon: any; current: boolean }[];
}


export default function DesktopSidebar({ children, pathname, navigation }: Props) {


  const isActive = (item: { href: string }, pathname: string) => {
    return (item.href === '/app' && pathname === item.href) || (pathname.includes(item.href) && item.href !== '/app');
  };


  return (
    <div className="relative flex ">
      {/* Desktop */}
      <div
        // !
        style={{ maxHeight: 'calc(100vh - 64px)', top: 64 }}
        className="hidden fixed top-16 h-screen lg:inset-y-0 lg:z-50 lg:flex lg:w-40 lg:flex-col"
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          isActive(item, pathname)
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon
                          className={cn(
                            isActive(item, pathname) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  href="/app/settings"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                    aria-hidden="true"
                  />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>



      {/* Main content */}
      <div 
        // !
        className='fixed h-full mb-8 z-[50] lg:ml-16  lg:w-[calc(100% - 64px)]' style={{  minHeight: 'calc(100vh - 64px)' }}>
        <div className='relative w-full h-full'>
          {/* box shadow */}
          <div className='absolute min-w-full min-h-full left-0 top-0 inner-shadow rounded-tl-3xl pointer-events-none'></div>

          {/* Content */}
          <div className='h-full p-3 bg-primary-50 rounded-tl-3xl overflow-y-scroll'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}



'use client';

import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { MassiveLogoColor } from '@/assets/branding';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/auth/actions/logout';
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { ExtendedUser } from '../../../../../next-auth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Serp', href: '/dashboard/serp-tracker', icon: UsersIcon, current: false },
  // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  // { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  // { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const teams = [
  // { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  // { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  // { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]



export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pathname = usePathname()


  return (
    <>
      <div>
        <TopBar setSidebarOpen={setSidebarOpen} />

    
          {/* Mobile */}
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-900/80" />
              </Transition.Child>

              <div className="fixed inset-0 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                      <div className="flex h-16 shrink-0 items-center">
                        <MassiveLogoColor className="h-8 w-auto" />
                      </div>
                      <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                          <li>
                            <ul role="list" className="-mx-2 space-y-1">
                              {navigation.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className={cn(
                                      item.href === pathname
                                        ? 'bg-gray-50 text-indigo-600'
                                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )}
                                  >
                                    <item.icon
                                      className={cn(
                                        item.href === pathname ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
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
                          {/* <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <Link
                                  href={team.href}
                                  className={cn(
                                    team.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span
                                    className={cn(
                                      team.current
                                        ? 'text-indigo-600 border-indigo-600'
                                        : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li> */}
                          <li className="mt-auto">
                            <Link
                              href="/dashboard/settings"
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
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <div className="relative flex ">
          {/* Desktop */}
          <div 
            style={{ minHeight: 'calc(100vh - 64px)', top: 64 }} 
            className="hidden fixed top-16 h-screen lg:inset-y-0 lg:z-50 lg:flex lg:w-40 lg:flex-col"
          >
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              item.href === pathname
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                          >
                            <item.icon
                              className={cn(
                                item.href === pathname ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
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
                  {/* <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <Link
                          href={team.href}
                          className={cn(
                            team.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span
                            className={cn(
                              team.current
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li> */}
                  <li className="mt-auto">
                    <Link
                      href="/dashboard/settings"
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
          <main className="py-10 lg:ml-40 w-full" style={{ minHeight: 'calc(100vh - 64px)' }}>
            <div className='px-4' >{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}

const TopBar = ({
  setSidebarOpen
}: {
  setSidebarOpen: (open: boolean) => void
}) => {
  const user = useCurrentUser()

  const handleLogout = () => { logout() }

  return (
     <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
     <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
       <span className="sr-only">Open sidebar</span>
       <Bars3Icon className="h-6 w-6" aria-hidden="true" />
     </button>

     {/* Separator */}
     <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

     <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
       {/* Search Bar */}
       {/* <form className="relative flex flex-1" action="#" method="GET">
         <label htmlFor="search-field" className="sr-only">
           Search
         </label>
         <MagnifyingGlassIcon
           className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
           aria-hidden="true"
         />
         <input
           id="search-field"
           className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
           placeholder="Search..."
           type="search"
           name="search"
         />
       </form> */}
       <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
         {/* Notifications */}
         {/* <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
           <span className="sr-only">View notifications</span>
           <BellIcon className="h-6 w-6" aria-hidden="true" />
         </button> */}

         {/* Separator */}
         <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

         {/* Profile dropdown */}
         <Menu as="div" className="relative">
           <Menu.Button className="-m-1.5 flex items-center p-1.5">
             <span className="sr-only">Open user menu</span>

             {user?.image ?
               <Image
                 className="h-8 w-8 rounded-full bg-gray-50"
                 src={user?.image || '/images/avatars/default.png'}
                 alt="user image"
                 width={32}
                 height={32}
               />
               :
             <div className="h-8 w-8 rounded-full bg-gray-50" /> 
             }
             <span className="hidden lg:flex lg:items-center">
               <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                 {user?.name}
               </span>
               <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
             </span>
           </Menu.Button>
           <Transition
             as={Fragment}
             enter="transition ease-out duration-100"
             enterFrom="transform opacity-0 scale-95"
             enterTo="transform opacity-100 scale-100"
             leave="transition ease-in duration-75"
             leaveFrom="transform opacity-100 scale-100"
             leaveTo="transform opacity-0 scale-95"
           >
             <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
               <Menu.Item key='sign out'>
                 <div
                   className={cn(
                     'block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100'
                   )}>

                   <button
                     onClick={handleLogout}
                   >
                     Sign Out
                   </button>
                 </div>
               </Menu.Item>
               <Menu.Item>
                 <div className={cn(
                   'block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100'
                 )}>
                   <Link href='/dashboard/settings'>
                     Settings
                   </Link>
                 </div>
               </Menu.Item>
             </Menu.Items>
           </Transition>
         </Menu>
       </div>
     </div>
   </div>
    )
}
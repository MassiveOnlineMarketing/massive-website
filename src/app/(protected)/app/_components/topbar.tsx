'use client';

import { Fragment } from 'react'
import Link from 'next/link';
import Image from 'next/image'

import { cn } from '@/lib/utils';
import { logout } from '@/auth/actions/logout'
import { useCurrentUser } from '@/auth/hooks/use-current-user'
// Components
import { Menu, Transition } from '@headlessui/react'
// Assets
import {
    Bars3Icon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Credits from '@/dashboard/components/credits';


const TopBar = ({
    setMobileSidebarOpen,
}: {
    setMobileSidebarOpen: (open: boolean) => void,
}) => {
    const user = useCurrentUser()

    const handleLogout = () => { logout() }

    return (
        <div className="h-16 w-full flex shrink-0 items-center gap-x-4 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setMobileSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">

                <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
                    <Credits />
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
                                        <Link href='/app/settings'>
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

export default TopBar
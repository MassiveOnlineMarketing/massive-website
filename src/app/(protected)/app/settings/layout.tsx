'use client';

import React from 'react'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCurrentUser } from '@/auth/hooks/use-current-user'

import { Button } from '@/components/ui/button';
import { constants } from '@/styles/styles'

// Assets
import { MassiveLogoColor } from '@/assets/branding'
import { BellAlertIcon, ChevronRightIcon, LinkIcon, UserCircleIcon } from '@heroicons/react/20/solid';

const Layout = ({ children }: { children: React.ReactNode }) => {

    const user = useCurrentUser()
    const pathname = usePathname()
    const lastPath = pathname.split('/').filter(Boolean).pop() || '';

    return (
        <>
            <div className="relative h-[243px] m-3 rounded-2xl bg-[url('/app/3d-background-purple-background-abstract-background-windows-3840x1932.png')] bg-no-repeat bg-right bg-auto bg-cover bg-white">
                <div className='absolute -translate-y-1/2 top-1/2 left-[42px] flex gap-[18px]'>
                    <div className={`w-[98px] h-[98px] ${constants.glassFill} shadow-md relative gradient-mask glass-settings-banner border-6 rounded-full flex items-center justify-center`}>
                        <MassiveLogoColor className='w-[54px] h-[32px]' />
                    </div>

                    <div>
                        <div className='mb-2 text-base leading-6 font-medium'>
                            <p className='text-gray-700'>Goedemiddag,</p>
                            <p className='text-gray-600'>{user?.name}</p>
                        </div>
                        <div>
                            <Button size='sm' className='text-primary-500 bg-white '>button</Button>
                        </div>
                    </div>

                </div>
                <div className='absolute p-6 left-[26px] bottom-0 w-fit inline-flex items-center gap-2 text-sm leading-5 font-base text-gray-400'>
                    <Link href='/app'>Home</Link>
                    <ChevronRightIcon className='h-4 w-4' />
                    <span>Settings</span>
                    <ChevronRightIcon className='h-4 w-4' />
                    <span className='text-gray-500'>{lastPath.charAt(0).toUpperCase() + lastPath.slice(1).toLowerCase()}</span>
                </div>
            </div>
            <div className='pl-16 mr-6 pt-11'>
                <div className='mb-5 py-[10px]'>
                    <h2 className='text-3xl leading-9 font-semibold text-gray-800'>Settings</h2>
                    <p className='text-base-leading-6 font-normal text-gray-500'>Manage your account details and preferences here.</p>
                </div>
                <div className='flex gap-[6px] text-base leading-6 font-medium'>
                    <Link className={cn(
                        'px-5 py-3 bg-white rounded-t-lg shadow-base',
                        'inline-flex items-center gap-1',
                        lastPath === 'profile' ? 'text-primary-500' : 'text-gray-500'
                    )} href='/app/settings/profile'><UserCircleIcon className='w-5 h-5' />Profile</Link>
                    <Link className={cn(
                        'px-5 py-3 bg-white rounded-t-lg shadow-base',
                        'inline-flex items-center gap-1',
                        lastPath === 'integrations' ? 'text-primary-500' : 'text-gray-500'
                    )} href='/app/settings/integrations'><LinkIcon className='w-5 h-5' /> Integrations</Link>
                    {/* <Link className={cn(
                        'px-5 py-3 bg-white rounded-t-lg shadow-base',
                        'inline-flex items-center gap-1',
                        lastPath === 'notifications' ? 'text-primary-500' : 'text-gray-500'
                    )} href='/app/settings/notifications'><BellAlertIcon className='w-5 h-5' /> Notifications</Link> */}
                </div>
                <div className='px-8 py-12 w-full bg-white shadow-base rounded-b-2xl rounded-tr-2xl relative z-10'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout
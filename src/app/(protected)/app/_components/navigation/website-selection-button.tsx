'use client';

import { useEffect, useState } from 'react';
import { Website } from '@prisma/client';
import { useWebsiteDetailsStore } from '@/lib/zustand/website-details-store';

// Utils
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { cn } from '@/lib/utils';

// Components 
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Assets
import { ChevronDownIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import { getWebsiteByUserId } from '@/dashboard/data/website';
import CreateWebsiteFormDialog from '../website-form-dialog';



const WebsiteSelectionButton = () => {
    const currentWebsite = useWebsiteDetailsStore(state => state.WebsiteDetails);
    const setSelectedWebsite = useWebsiteDetailsStore(state => state.setWebsiteDetails);
    const userId = useCurrentUser()?.id;

    const [websites, setWebsites] = useState<Website[] | Website | null>(null)
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [websiteDialogOpen, setWebsiteDialogOpen] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetchWebsites()
    }, [currentWebsite])

    async function fetchWebsites() {

        if (userId) {
            const res = await getWebsiteByUserId(userId)
            setWebsites(res && res.length > 0 ? res : null)
        }

        setIsLoading(false)
    }

    const handleSelectWebsite = (website: Website) => {
        if (currentWebsite?.id === website.id) {
            setPopoverOpen(false)
            return
        };
        setSelectedWebsite(website)
        setPopoverOpen(false)
    }

    return (
        <div>
            {websites === null ? (
                <Button
                    {...isLoading ? { disabled: true } : {}}
                    onClick={() => setWebsiteDialogOpen(true)}
                    variant='glass'
                    size='sm'
                    className='w-full justify-start px-3 py-3 text-base leading-6 font-medium'
                >
                    <CubeTransparentIcon className='h-6 w-6 text-gray-700 ' />
                    <span className="text-gray-800">Website: </span>
                    <span className="text-gray-500">{isLoading ? "Loading" : '+ Setup website'}</span>
                    <ChevronDownIcon className='ml-auto h-4 w-4 text-gray-400' />
                </Button>
            ) : (
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button variant='glass' size='sm' className='w-full justify-start px-3 py-3 text-base leading-6 font-medium'>
                            <CubeTransparentIcon className='h-6 w-6 text-gray-700 ' />
                            <span className="text-gray-800">Website: </span>
                            <span className="text-gray-500">{currentWebsite ? (currentWebsite.websiteName) : ('Select website...')}</span>
                            <ChevronDownIcon className='ml-auto h-4 w-4 text-gray-400' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[350px] bg-primary-50 p-0'>
                        <Command>
                            <CommandInput placeholder="Search website..." />
                            <CommandGroup>
                                {Array.isArray(websites) ? (
                                    websites.map((website) => (
                                        <CommandItem
                                            key={website.id}
                                            value={website.websiteName}
                                            className={cn('px-6 py-[16px]',
                                                website.id === currentWebsite?.id && 'bg-primary-50'

                                            )}
                                            onSelect={() => handleSelectWebsite(website)}
                                        >
                                            {website.websiteName}
                                        </CommandItem>
                                    ))
                                ) : (
                                    <CommandItem
                                        value={websites.websiteName}
                                        className='px-6 py-[16px]'
                                        onSelect={() => handleSelectWebsite(websites)}
                                    >
                                        {websites.websiteName}
                                    </CommandItem>
                                )}
                                <CommandItem
                                    className='px-6 py-[16px]'
                                    onSelect={() => setWebsiteDialogOpen(true)}
                                >
                                    Add new Website
                                </CommandItem>
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
            <CreateWebsiteFormDialog open={websiteDialogOpen} setOpen={setWebsiteDialogOpen} />
        </div>
    )
}

export default WebsiteSelectionButton;


'use client';

// External libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { z } from "zod"
import { useSession } from "next-auth/react";


import { PythonApiSite } from "@/dashboard/types";
import { Website } from "@prisma/client";

import { useIsGscAuthenticated } from "@/auth/hooks/use-is-gsc-authenticated";
import { GoogleSearchProjectSchema } from "@/dashboard/schema";
import { DEFAULT_APP_SETTING_PAGE } from "../../../../../routes";


// Components
import { Dialog, DialogContent, DialogHeader } from '@/website/features/dialog/dialog'; // replace with your actual import
import { InputFieldApp, TextareaApp } from "@/components/ui/input/fields";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/input/select";
import { createWebsite, updateWebsite } from "@/dashboard/data/website";
import { useToast } from "@/website/features/toast/use-toast";
import { createGoogleSearchProject, updateGoogleSearchProject } from "@/dashboard/data/google-search-project";
import { useGoogleSearchProjectDetailsStore } from "@/lib/zustand/google-search-details-store";
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { useRouter } from "next/navigation";




interface GoogleSearchProjectFormDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    website?: Website | null;
}

type Schema = z.infer<typeof GoogleSearchProjectSchema>

const GoogleSearchProjectFormDialog: React.FC<GoogleSearchProjectFormDialogProps> = ({ open, setOpen, website }) => {
    const isGscAuthenticated = useIsGscAuthenticated()
    const user = useSession()

    const [sites, setSites] = useState<PythonApiSite[]>()
    const { toast } = useToast();
    const router = useRouter()

    const setProjectDetails = useGoogleSearchProjectDetailsStore(state => state.setProjectDetails)
    const currentWebsite = useWebsiteDetailsStore(state => state.WebsiteDetails)
    // console.log('currentWebsite', currentWebsite)
    // const currentGoogleSearchProject = useGoogleSearchProjectDetailsStore(state => state.ProjectDetails)

    // TODO: Change this to use the project details store
    let currentWebsiteDetails: Website | null = null
    if (website) {
        currentWebsiteDetails = website
    }

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors }
    } = useForm<Schema>({})

    useEffect(() => {
        if (open) {
            // TODO: Set the values of the form fields if the website is already created --> change to search project
            // if (currentWebsiteDetails) {
            //     setValue('websiteName', currentWebsiteDetails.websiteName)
            //     setValue('domainUrl', currentWebsiteDetails.domainUrl)
            //     if (currentWebsiteDetails.gscUrl && currentWebsiteDetails.gscUrl !== '') {
            //         setValue('gscUrl', currentWebsiteDetails.gscUrl)
            //     } else {
            //         setValue('gscUrl', '')
            //     }
            // }

            if (user.data?.refreshToken && isGscAuthenticated) {
                fetchConnectedSites(user.data.refreshToken);
            } else {
                console.error('No Token')
            }
        }
    }, [open])

    const fetchConnectedSites = async (refreshToken: string) => {
        const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/get_sites?refresh_token=${refreshToken}`
        const res = await axios(url)
        setSites(res.data.siteEntry)
    }

    const onSubmit: SubmitHandler<Schema> = async data => {

        if (!user.data?.user.id) return
        if (!currentWebsite) return

        console.log('data', data)
        console.log('currentWebsite', currentWebsite)

        try {
            let res;
            if (website) {
                res = await updateGoogleSearchProject(user.data.user.id, data)
            } else {
                res = await createGoogleSearchProject(user.data.user.id, currentWebsite.id, currentWebsite.domainUrl, data)
                // Set the project details in the store
                console.log('res', res)

                // router.push(`/app/search/keywords/${res.id}`)
            
            }

            if (res) {
                setProjectDetails(res)
                setOpen(false)
                reset()
                toast({
                    description: "Website created successfully",
                    variant: "success",
                    duration: 5000,
                })
            }
        } catch (error) {
            console.error('Error creating website:', error);
            toast({
                description: "An error occurred while creating the website. Please try again.",
                variant: "destructive",
                duration: 5000,
            })
        }
    }

    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'nl', label: 'Dutch' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
        { value: 'es', label: 'Spanish' },
        { value: 'it', label: 'Italian' },
        { value: 'ru', label: 'Russian' },
        { value: 'jp', label: 'Japanese' },
        { value: 'kr', label: 'Korean' },
        { value: 'cn', label: 'Chinese' },
        { value: 'br', label: 'Brazilian' },
    ]

    const countryOptions = [
        { value: 'US', label: 'United States' },
        { value: 'GB', label: 'United Kingdom' },
        { value: 'NL', label: 'Netherlands' },
        { value: 'CA', label: 'Canada' },
        { value: 'AU', label: 'Australia' },
        { value: 'DE', label: 'Germany' },
        { value: 'FR', label: 'France' },
        { value: 'IT', label: 'Italy' },
        { value: 'ES', label: 'Spain' },
        { value: 'JP', label: 'Japan' },
        { value: 'KR', label: 'South Korea' },
        { value: 'BR', label: 'Brazil' },
        { value: 'RU', label: 'Russia' },
        { value: 'CN', label: 'China' },
    ]

    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="font-medium text-2xl text-gray-800">
                        {currentWebsiteDetails ? 'Update your Website' : 'Setup Google Search Campaign'}
                    </h2>
                    <p className="font-medium text-base text-gray-500 pt-[4px]">
                        Please enter the details of your Campaign
                    </p>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-4 text-gray-800 font-medium'
                >
                    <p>Campaign Name</p>
                    <InputFieldApp
                        type='text'
                        placeholder='Google Search DE'
                        // required
                        {...register('projectName', { required: true })}
                    />
                    {errors.projectName && <ErrorField error={'* A Name is Required'} />}

                    <p className="mt-7">Language</p>
                    <Controller
                        name="language"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select a language' className="placeholder-gray-400 text-gray-400" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languageOptions.map((option) => {
                                        return <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.language && <ErrorField error={'* Language is Required'} />}


                    <p className="mt-7">Location</p>
                    <Controller
                        name="country"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select a country' className="placeholder-gray-400 text-gray-400" />
                                </SelectTrigger>
                                <SelectContent>
                                    {countryOptions.map((option) => {
                                        return <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.country && <ErrorField error={'* Location is Required'} />}

                    <p className="mt-7">Keywords</p>
                    <TextareaApp
                        rows={5}
                        placeholder='Enter the keywords you want to track, seperated by enter.'
                        {...register('keywords')}
                    />

                    <button
                        type="submit"
                        className="mt-8 px-6 py-2 w-fit flex mx-auto rounded-lg text-lg font-semibold"
                    >
                        {currentWebsiteDetails ? 'Update' : 'Create'}
                    </button>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default GoogleSearchProjectFormDialog;


const ErrorField = ({ error }: { error: string }) => {
    return <span className="text-red-500 text-xs">{error}</span>
}
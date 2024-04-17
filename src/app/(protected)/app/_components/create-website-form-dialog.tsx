'use client';

// External libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { z } from "zod"
import { useSession } from "next-auth/react";


import { PythonApiSite } from "@/dashboard/types";
import { useIsGscAuthenticated } from "@/auth/hooks/use-is-gsc-authenticated";
import { WebsiteDetailsSchema } from "@/dashboard/schema";
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { DEFAULT_APP_SETTING_PAGE } from "../../../../../routes";


// Components
import { Dialog, DialogContent, DialogHeader } from '@/website/features/dialog/dialog'; // replace with your actual import
import { InputFieldApp } from "@/components/ui/input/fields";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/input/select";
import { createWebsite } from "@/dashboard/data/website";
import { useToast } from "@/website/features/toast/use-toast";

interface ProjectDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

type Schema = z.infer<typeof WebsiteDetailsSchema>

const CreateWebsiteFormDialog: React.FC<ProjectDialogProps> = ({ open, setOpen }) => {
    const isGscAuthenticated = useIsGscAuthenticated()
    const user = useSession()

    const [sites, setSites] = useState<PythonApiSite[]>()
    const { toast } = useToast();

    const setWebsiteDetails = useWebsiteDetailsStore(state => state.setWebsiteDetails)

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<Schema>({})

    useEffect(() => {
        if (open) {
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

        try {
            const res = await createWebsite(user.data.user.id, data)
            if (res) {
                setWebsiteDetails(res)
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


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="font-medium text-2xl text-gray-800">
                        Setup your website
                    </h2>
                    <p className="font-medium text-base text-gray-500 pt-[4px]">
                        Please enter the details of your website
                    </p>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-4 text-gray-800 font-medium'
                >
                    <p>Project Name</p>
                    <InputFieldApp
                        type='text'
                        placeholder='My Awsome Website'
                        required
                        {...register('websiteName', { required: true })}
                    />
                    {errors.websiteName && <span>This field is required</span>}

                    <p className="mt-7">Domain Url</p>
                    <InputFieldApp
                        type='text'
                        placeholder='example.com'
                        required
                        {...register('domainUrl', { required: true })}
                    />
                    {errors.websiteName && <span>This field is required</span>}

                    <p className="mt-7">Connect Google Search Console</p>
                    <Controller
                        name="gscUrl"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger disabled={!isGscAuthenticated || !sites}>
                                    <SelectValue placeholder={!isGscAuthenticated && "Please authenticate Google Account first" || !sites && 'No sites connected to Google Account' || 'Connect a Site'} className="placeholder-gray-400 text-gray-400" />
                                </SelectTrigger>
                                <SelectContent>
                                    <p className="ml-4 text-gray-500">Available Sites</p>
                                    {sites && sites.map((site: PythonApiSite) => {
                                        return <SelectItem key={site.siteUrl} value={site.siteUrl}>{site.siteUrl}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {
                        !isGscAuthenticated && <p className="mt-4 w-fit mx-auto text-gray-500 font-normal">Authenticate your <Link href={DEFAULT_APP_SETTING_PAGE} className="text-primary-500">Google Account</Link></p>
                    }

                    <button
                        type="submit"
                        className="mt-8 px-6 py-2 w-fit flex mx-auto rounded-lg text-lg font-semibold"
                    >
                        Create
                    </button>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateWebsiteFormDialog;
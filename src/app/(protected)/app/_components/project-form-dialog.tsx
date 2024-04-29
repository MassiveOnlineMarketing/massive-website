'use client';

// External libraries
import React, { SetStateAction, useEffect } from "react";
import { z } from "zod"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Internal libraries
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { GoogleSearchProjectSchema } from "@/dashboard/schema";

// Internal types
import { GoogleSearchProject } from "@prisma/client";

// Internal functions
import { createGoogleSearchProject, updateGoogleSearchProject } from "@/dashboard/data/google-search-project";
import { splitAndTrimKeywords } from "@/serp/lib/utils";
import { useProcessNewKeywords } from "@/serp/hooks/useProcessNewKeywords";

// Store
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { useGoogleSearchProjectDetailsStore } from "@/lib/zustand/google-search-details-store";

// Components
import { Dialog, DialogContent, DialogHeader } from '@/website/features/dialog/dialog'; // replace with your actual import
import { InputFieldApp, TextareaApp } from "@/components/ui/input/fields";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/input/select";
import { useToast } from "@/website/features/toast/use-toast";



interface GoogleSearchProjectFormDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    googleSearchProject?: GoogleSearchProject | null;
    handleAddProjectToSidebar?: (project: GoogleSearchProject) => void;
}

type Schema = z.infer<typeof GoogleSearchProjectSchema>

const GoogleSearchProjectFormDialog: React.FC<GoogleSearchProjectFormDialogProps> = ({ open, setOpen, googleSearchProject, handleAddProjectToSidebar }) => {
    const user = useSession()
    const router = useRouter()

    const { processNewKeywords } = useProcessNewKeywords()
    const setProjectDetails = useGoogleSearchProjectDetailsStore(state => state.setProjectDetails)
    const currentWebsite = useWebsiteDetailsStore(state => state.WebsiteDetails)

    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors }
    } = useForm<Schema>({})

    useEffect(() => {
        if (open && googleSearchProject) {
            setValue('projectName', googleSearchProject.projectName)
            setValue('language', googleSearchProject.language)
            setValue('country', googleSearchProject.country)
        }
    }, [open])


    const onSubmit: SubmitHandler<Schema> = async data => {

        if (!user.data?.user.id) return
        if (!currentWebsite) {
            toast({
                description: "Please add a website first",
                variant: "destructive",
                duration: 5000,
            })
            setOpen(false)
            return
        }

        try {
            let res: GoogleSearchProject | null = null;
            if (googleSearchProject) {
                res = await updateGoogleSearchProject(googleSearchProject.id, data)
            } else {
                res = await createGoogleSearchProject(user.data.user.id, currentWebsite.id, currentWebsite.domainUrl, data)

                setProjectDetails(res)
                if (handleAddProjectToSidebar) {
                    handleAddProjectToSidebar(res)
                }
            }
            
            if (res) {
                if (data.keywords) {
                    const keywordsArray = splitAndTrimKeywords(data.keywords)
                    processNewKeywords(keywordsArray, res)
                }

                setProjectDetails(res)
                setOpen(false)
                reset()
                toast({
                    description: `Google Search Campaign ${googleSearchProject ? 'updated ' : 'created '}successfully`,
                    variant: "success",
                    duration: 5000,
                })
                router.push(`/app/search/google-search/${res.id}`)
            }
        } catch (error) {
            console.error(`Error ${googleSearchProject ? 'updating ' : 'creating '}website:`, error);
            toast({
                description: `An error occurred while ${googleSearchProject ? 'updating ' : 'creating '}the Google Search Campaign. Please try again.`,
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
                        {googleSearchProject ? `Update ${googleSearchProject.projectName}` : 'Setup Google Search Campaign'}
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

                    {
                        !googleSearchProject && (
                            <>
                                <p className="mt-7">Keywords</p>
                                <TextareaApp
                                    rows={5}
                                    placeholder='Enter the keywords you want to track, seperated by enter.'
                                    {...register('keywords')}
                                />
                            </>
                        )
                    }


                    <button
                        type="submit"
                        className="mt-8 px-6 py-2 w-fit flex mx-auto rounded-lg text-lg font-semibold"
                    >
                        {googleSearchProject ? 'Update' : 'Create'}
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
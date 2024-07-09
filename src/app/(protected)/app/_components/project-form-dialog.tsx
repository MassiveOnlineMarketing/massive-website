"use client";

// External libraries
import React, { useEffect } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// Internal types
import { GoogleSearchProjectSchema } from "@/dashboard/schema";
import { GoogleSearchProject } from "@prisma/client";
import { COUNTRY_OPTIONS, LANGUAGE_OPTIONS } from "@/dashboard/constants/form-options";

// Internal functions
import { splitAndTrimKeywords } from "@/dashboard/google-search/lib/utils";
import { useProcessNewKeywords } from "@/dashboard/google-search/hooks/useProcessNewKeywords";

// Actions
import { updateGoogleSearchProjectA } from "@/dashboard/google-search/actions/update-google-search-project";
import { createGoogleSearchProjectA } from "@/dashboard/google-search/actions/create-google-search-project";
import { createCompetitors, deleteCompetitors, getCompetitorsByProjectId } from "@/dashboard/google-search/data/google-search-competitor";

// Store
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { useGoogleSearchProjectDetailsStore } from "@/lib/zustand/google-search-details-store";

// Components
import { Dialog, DialogContent, DialogHeader } from "@/website/features/dialog/dialog";
import { InputFieldApp, TextareaApp } from "@/components/ui/input/fields";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/input/select";
import { useToast } from "@/website/features/toast/use-toast";

import { PlusIcon } from "@heroicons/react/24/outline";
import { deleteGoogleSearchProject } from "@/dashboard/google-search/actions/delete-google-search-project";


interface GoogleSearchProjectFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  googleSearchProject?: GoogleSearchProject | null;
  handleAddProjectToSidebar?: (project: GoogleSearchProject) => void;
}

type Schema = z.infer<typeof GoogleSearchProjectSchema>;

const GoogleSearchProjectFormDialog: React.FC<
  GoogleSearchProjectFormDialogProps
> = ({ open, setOpen, googleSearchProject, handleAddProjectToSidebar }) => {
  const router = useRouter();

  const { processNewKeywords } = useProcessNewKeywords();
  const setProjectDetails = useGoogleSearchProjectDetailsStore((state) => state.setProjectDetails);
  const currentWebsite = useWebsiteDetailsStore((state) => state.WebsiteDetails);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Schema>({});

  useEffect(() => {
    if (open && googleSearchProject) {
      setValue("projectName", googleSearchProject.projectName);
      setValue("language", googleSearchProject.language);
      setValue("country", googleSearchProject.country);

      const fetchData = async () => {
        if (!googleSearchProject) return;
        const competitors = await getCompetitorsByProjectId(googleSearchProject.id);
        setFetchedCompetitors(competitors.map(competitor => competitor.domainUrl));
      };

      fetchData();
    }
  }, [open]);

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    const actionSuccessMessage = googleSearchProject
      ? "Google Search Campaign updated"
      : "Google Search Campaign  created";
    const actionErrorMessage = googleSearchProject
      ? "Updating the Google Search Campaign "
      : "Creating the Google Search Campaign ";

    // Submit form
    let res;
    if (googleSearchProject) {
      res = await updateGoogleSearchProjectA({ projectId: googleSearchProject.id, data: data })
    } else {
      res = await createGoogleSearchProjectA({ websiteId: currentWebsite?.id, domainUrl: currentWebsite?.domainUrl, data: data })
      if (res.success && handleAddProjectToSidebar) {
        handleAddProjectToSidebar(res.success)
      }
    }

    if (res.success) {
      setProjectDetails(res.success)

      // Update competitors
      if (addedCompetitors) {
        console.log('addedCompetitors', addedCompetitors)
        await createCompetitors(addedCompetitors, res.success.id)
      }
      if (removedCompetitors) {
        console.log('removedCompetitors', removedCompetitors)
        await deleteCompetitors(removedCompetitors, res.success.id)
      }
      // Reset state after successful submission
      setAddedCompetitors([]);
      setRemovedCompetitors([]);

      if (data.keywords) {
        const keywordsArray = splitAndTrimKeywords(data.keywords)
        processNewKeywords(keywordsArray, res.success)
      }

      setOpen(false)
      reset()

      toast({
        description: actionSuccessMessage,
        variant: 'success',
        icon: 'success',
        duration: 5000,
      })

      router.push(`/app/search/google-search/${res.success.id}`);

      return;
    }

    toast({
      description: res.error || actionErrorMessage,
      variant: 'destructive',
      icon: 'destructive',
      duration: 5000
    })

    return;
  };

  const handleDeleteCompaign = async () => {
    if (!googleSearchProject) {
      return;
    }
    // Delete Google Search Project
    const res = await deleteGoogleSearchProject({ projectId: googleSearchProject.id });

    if (res.success) {
      setOpen(false);
      reset();
      toast({
        description: res.success,
        variant: "success",
        icon: "success",
        duration: 5000,
      });
      return;
    }

    toast({
      description: res.error,
      variant: "destructive",
      icon: "destructive",
      duration: 5000,
    });
  }


  // Stuff for competitors 
  const [domainInput, setDomainInput] = React.useState('');
  const [fetchedCompetitors, setFetchedCompetitors] = React.useState<string[]>([]);
  const [addedCompetitors, setAddedCompetitors] = React.useState<string[]>([]);
  const [removedCompetitors, setRemovedCompetitors] = React.useState<string[]>([]);

  const handleAddCompetitor = () => {
    setAddedCompetitors(prev => [...prev, domainInput]);
    setRemovedCompetitors(prev => prev.filter(domain => domain !== domainInput));
    setDomainInput('');
  };

  const handleRemoveCompetitor = (domain: string) => {
    if (fetchedCompetitors.includes(domain)) {
      setRemovedCompetitors(prev => [...prev, domain]);
    } else {
      setAddedCompetitors(prev => prev.filter(d => d !== domain));
    }
  };

  // Combine and filter competitors
  const currentCompetitors = React.useMemo(() => {
    const combinedCompetitors = [...fetchedCompetitors, ...addedCompetitors];
    return combinedCompetitors.filter(domain => !removedCompetitors.includes(domain));
  }, [fetchedCompetitors, addedCompetitors, removedCompetitors]);

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <h2 className="font-medium text-2xl text-gray-800">
            {googleSearchProject
              ? `Update ${googleSearchProject.projectName}`
              : "Setup Google Search Campaign"}
          </h2>
          <p className="font-medium text-base text-gray-500 pt-[4px]">
            Please enter the details of your Campaign
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 text-gray-800 font-medium"
        >
          <p>Campaign Name</p>
          <InputFieldApp
            type="text"
            placeholder="Google Search DE"
            // required
            {...register("projectName", { required: true })}
          />
          {errors.projectName && <ErrorField error={"* A Name is Required"} />}

          <p className="mt-7">Language</p>
          <Controller
            name="language"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select a language"
                    className="placeholder-gray-400 text-gray-400"
                  />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((option) => {
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
          {errors.language && <ErrorField error={"* Language is Required"} />}

          <p className="mt-7">Location</p>
          <Controller
            name="country"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select a country"
                    className="placeholder-gray-400 text-gray-400"
                  />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_OPTIONS.map((option) => {
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && <ErrorField error={"* Location is Required"} />}

          <p className="mt-7">Competitors</p>
          <div className="flex gap-2">
            <InputFieldApp
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="https://www.example.com"
            />
            <button onClick={handleAddCompetitor} type="button" className="p-4 mt-3 rounded-xl border border-primary-100 h-fit"><PlusIcon className="w-6 h-6 text-gray-400 " /></button>
          </div>
          <div className="p-2 space-y-2">
            {currentCompetitors.map((domain, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{domain}</p>
                {/* TODO: Set styles */}
                <button type="button" onClick={() => handleRemoveCompetitor(domain)}>Remove</button>
              </div>
            ))}
          </div>

          {!googleSearchProject && (
            <>
              <p className="mt-7">Keywords</p>
              <TextareaApp
                rows={5}
                placeholder="Enter the keywords you want to track, seperated by enter."
                {...register("keywords")}
              />
            </>
          )}

          <div className="flex justify-between mt-8">
            {googleSearchProject && (
              <button
                type="button"
                className="px-6 py-2 w-fit flex mx-auto rounded-lg text-lg font-semibold"
                onClick={handleDeleteCompaign}
              >
                Delete Campaign
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 w-fit flex mx-auto rounded-lg text-lg font-semibold"
            >
              {googleSearchProject ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleSearchProjectFormDialog;

const ErrorField = ({ error }: { error: string }) => {
  return <span className="text-red-500 text-xs">{error}</span>;
};

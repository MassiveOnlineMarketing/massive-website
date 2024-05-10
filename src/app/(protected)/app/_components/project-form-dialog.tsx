"use client";

// External libraries
import React, { useEffect } from "react";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Internal libraries
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { GoogleSearchProjectSchema } from "@/dashboard/schema";

// Internal types
import { GoogleSearchProject } from "@prisma/client";

// Internal functions
import { splitAndTrimKeywords } from "@/dashboard/google-search/lib/utils";
import { useProcessNewKeywords } from "@/dashboard/google-search/hooks/useProcessNewKeywords";

// Actions
import { updateGoogleSearchProjectA } from "@/dashboard/google-search/actions/update-google-search-project";
import { createGoogleSearchProjectA } from "@/dashboard/google-search/actions/create-google-search-project";

// Store
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { useGoogleSearchProjectDetailsStore } from "@/lib/zustand/google-search-details-store";

// Components
import { Dialog, DialogContent, DialogHeader } from "@/website/features/dialog/dialog";
import { InputFieldApp, TextareaApp } from "@/components/ui/input/fields";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/input/select";
import { useToast } from "@/website/features/toast/use-toast";

interface GoogleSearchProjectFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  googleSearchProject?: GoogleSearchProject | null;
  handleAddProjectToSidebar?: (project: GoogleSearchProject) => void;
}

type Schema = z.infer<typeof GoogleSearchProjectSchema>;

const languageOptions = [
  { value: "en", label: "English" },
  { value: "nl", label: "Dutch" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "es", label: "Spanish" },
  { value: "it", label: "Italian" },
  { value: "ru", label: "Russian" },
  { value: "jp", label: "Japanese" },
  { value: "kr", label: "Korean" },
  { value: "cn", label: "Chinese" },
  { value: "br", label: "Brazilian" },
];

const countryOptions = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "NL", label: "Netherlands" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "JP", label: "Japan" },
  { value: "KR", label: "South Korea" },
  { value: "BR", label: "Brazil" },
  { value: "RU", label: "Russia" },
  { value: "CN", label: "China" },
];

const GoogleSearchProjectFormDialog: React.FC<
  GoogleSearchProjectFormDialogProps
> = ({ open, setOpen, googleSearchProject, handleAddProjectToSidebar }) => {
  const user = useSession();
  const router = useRouter();

  const { processNewKeywords } = useProcessNewKeywords();
  const setProjectDetails = useGoogleSearchProjectDetailsStore(
    (state) => state.setProjectDetails,
  );
  const currentWebsite = useWebsiteDetailsStore(
    (state) => state.WebsiteDetails,
  );

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
    }
  }, [open]);

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    const actionSuccessMessage = googleSearchProject
    ? "Google Search Campaign updated"
    : "Google Search Campaign  created";
  const actionErrorMessage = googleSearchProject
    ? "Updating the Google Search Campaign "
    : "Creating the Google Search Campaign ";

    let res;

    if (googleSearchProject) {
      res = await updateGoogleSearchProjectA({ projectId: googleSearchProject.id, data: data})
    } else {
      res = await createGoogleSearchProjectA({ websiteId: currentWebsite?.id, domainUrl: currentWebsite?.domainUrl, data: data})
      if (res.success && handleAddProjectToSidebar) {
        handleAddProjectToSidebar(res.success)
      }
    }

    if (res.success) {
      setProjectDetails(res.success)

      if (data.keywords){
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


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
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
                  {languageOptions.map((option) => {
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
                  {countryOptions.map((option) => {
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

          <button
            type="submit"
            className="mt-8 px-6 py-2 w-fit flex mx-auto rounded-lg text-lg font-semibold"
          >
            {googleSearchProject ? "Update" : "Create"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleSearchProjectFormDialog;

const ErrorField = ({ error }: { error: string }) => {
  return <span className="text-red-500 text-xs">{error}</span>;
};

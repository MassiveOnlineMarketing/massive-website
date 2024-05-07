"use client";

// External libraries
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";

import { PythonApiSite } from "@/dashboard/types";
import { Website } from "@prisma/client";

import { WebsiteDetailsSchema } from "@/dashboard/schema";
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { DEFAULT_APP_SETTING_PAGE } from "../../../../../routes";
import useGoogleRefreshToken from "@/auth/hooks/use-google-refresh-token";
import { fetchConnectedSites } from "@/dashboard/google-search/connected-sites";

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/website/features/dialog/dialog"; // replace with your actual import
import { ErrorMessage, InputFieldApp } from "@/components/ui/input/fields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/input/select";
import { useToast } from "@/website/features/toast/use-toast";
import valudateWebsiteUrl from "@/dashboard/actions/validate-website-url";
import { updateWebsiteDetails } from "@/dashboard/actions/update-website";
import { createWebsite } from "@/dashboard/actions/create-website";

interface WebsiteFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  website?: Website | null;
}

type Schema = z.infer<typeof WebsiteDetailsSchema>;

const WebsiteFormDialog: React.FC<WebsiteFormDialogProps> = ({
  open,
  setOpen,
  website,
}) => {
  const user = useSession();
  const refresh_token = useGoogleRefreshToken("search-console");

  const [sites, setSites] = useState<PythonApiSite[]>();
  const [checkedWebsiteUrl, setCheckedWebsiteUrl] = useState<string | null>(
    null,
  );
  const { toast } = useToast();

  const setWebsiteDetails = useWebsiteDetailsStore(
    (state) => state.setWebsiteDetails,
  );

  let currentWebsiteDetails: Website | null = null;
  if (website) {
    currentWebsiteDetails = website;
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Schema>({});

  useEffect(() => {
    if (open) {
      if (currentWebsiteDetails) {
        setValue("websiteName", currentWebsiteDetails.websiteName);
        setValue("domainUrl", currentWebsiteDetails.domainUrl);
        if (
          currentWebsiteDetails.gscUrl &&
          currentWebsiteDetails.gscUrl !== ""
        ) {
          setValue("gscUrl", currentWebsiteDetails.gscUrl);
        } else {
          setValue("gscUrl", "");
        }
      }
      fetchSites();
    }
  }, [open]);

  const fetchSites = async () => {
    if (refresh_token) {
      const connectedSites = await fetchConnectedSites(refresh_token);
      setSites(connectedSites);
    }
  };

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    if (!user.data?.user.id) return;

    const actionSuccessMessage = website
      ? "Website updated"
      : "Website created";
    const actionErrorMessage = website
      ? "updating the website"
      : "creating the website";

    let res;
    if (website) {
      res = await updateWebsiteDetails({ data: data, websiteId: website.id });
    } else {
      res = await createWebsite({ data: data });
    }

    if (res.success) {
      setWebsiteDetails(res.success);
      setOpen(false);
      reset();
      toast({
        description: actionSuccessMessage,
        variant: "success",
        icon: "success",
        duration: 5000,
      });
      return;
    }

    toast({
      description: res.error || actionErrorMessage,
      variant: "destructive",
      icon: "destructive",
      duration: 5000,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <h2 className="font-medium text-2xl text-gray-800">
            {currentWebsiteDetails
              ? "Update your Website"
              : "Setup your website"}
          </h2>
          <p className="font-medium text-base text-gray-500 pt-[4px]">
            Please enter the details of your website
          </p>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 text-gray-800 font-medium"
        >
          <p>Project Name</p>
          <InputFieldApp
            type="text"
            placeholder="My Awsome Website"
            // required
            {...register("websiteName", { required: true })}
          />
          <ErrorMessage message={errors?.websiteName?.message} />
          {errors.websiteName && <span>This field is required</span>}

          <p className="mt-7">Domain Url</p>
          <InputFieldApp
            type="text"
            placeholder="example.com"
            required
            {...register("domainUrl", { required: true })}
          />
          <ErrorMessage message={errors?.domainUrl?.message} />
          {/* {errors.domainUrl && <p>{errors.domainUrl.message}</p>} */}

          <p className="mt-7">Connect Google Search Console</p>
          <Controller
            name="gscUrl"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger disabled={!refresh_token || !sites}>
                  <SelectValue
                    placeholder={
                      !refresh_token
                        ? "Please authenticate Google Search Console Access"
                        : (!sites && "No sites connected to Google Account") ||
                          "Connect a Website"
                    }
                    className="placeholder-gray-400 text-gray-400"
                  />
                </SelectTrigger>
                <SelectContent>
                  <p className="ml-4 text-gray-500">Available Sites</p>
                  {sites &&
                    sites.map((site: PythonApiSite) => {
                      return (
                        <SelectItem key={site.siteUrl} value={site.siteUrl}>
                          {site.siteUrl}
                        </SelectItem>
                      );
                    })}
                  <SelectItem value="noWebsite">No Website</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {!refresh_token && (
            <p className="mt-4 w-fit mx-auto text-gray-500 font-normal">
              Authenticate your{" "}
              <Link
                href="/app/settings/itegrations"
                className="text-primary-500"
              >
                Search Console
              </Link>{" "}
              Account
            </p>
          )}

          <button
            type="submit"
            className="mt-8 px-6 py-2 w-fit flex mx-auto rounded-lg text-lg font-semibold"
          >
            {currentWebsiteDetails ? "Update" : "Create"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WebsiteFormDialog;

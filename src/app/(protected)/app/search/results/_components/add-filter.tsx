"use client";

import React from "react";

// Form
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ErrorMessage,
  InputFieldApp,
  TextareaApp,
} from "@/components/ui/input/fields";
import { GoogleResultFilterUrlsSchema } from "@/dashboard/google-result/schema";

// Utils
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { splitAndTrimTextAreaInput } from "@/dashboard/utils";
import { useGoogleFilter } from "@/dashboard/google-result/hooks/useGoogleFilter";

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/website/features/dialog/dialog"; // replace with your actual import
import { OutlinedButton } from "@/components/ui/button";

// Assets
import { PlusIcon } from "@heroicons/react/24/outline";

type Schema = z.infer<typeof GoogleResultFilterUrlsSchema>;

const AddFilter = () => {
  const userDomain = useWebsiteDetailsStore(
    (state) => state.WebsiteDetails?.domainUrl,
  );
  const websiteId = useWebsiteDetailsStore((state) => state.WebsiteDetails?.id);
  const { createFilterAndToast } = useGoogleFilter();

  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Schema>({});

  if (!userDomain || !websiteId) {
    return null;
  }

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    const res = await createFilterAndToast({ data, userDomain, websiteId });

    if (res.success) {
      reset();
      setOpen(false);
    }
  };

  const validateURL = (value: string) => {
    const urls = splitAndTrimTextAreaInput(value);

    let isValid = true;
    urls.forEach((url) => {
      const urlPattern = new RegExp(`^${userDomain}.*`);
      if (!urlPattern.test(url)) {
        isValid = false;
      }
    });

    return (
      isValid || "Please enter urls starting with your domain: " + userDomain
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <OutlinedButton size="smD" className="gap-1 text-gray-500">
          <PlusIcon className="w-4 h-4" /> Add filter
        </OutlinedButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <h2 className="font-medium text-2xl text-gray-800">Add Url Filter</h2>
          <p className="font-medium text-base text-gray-500 pt-[4px]">
            Please enter the urls you want to track separated by line. Make sure
            your urls are in the correct format.
          </p>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-gray-800 font-medium"
        >
          <p className="mt-7">Filter Name</p>
          <InputFieldApp
            type="text"
            placeholder="My Filter"
            {...register("filterName", { required: "Filter name is required" })}
          />
          <ErrorMessage message={errors?.filterName?.message} />

          <p className="mt-7">Urls</p>
          <TextareaApp
            label="Urls"
            rows={5}
            placeholder={`Enter urls starting with ${userDomain}... `}
            {...register("urls", {
              validate: validateURL,
              required: "Add a minimum of one url",
            })}
          />
          <ErrorMessage message={errors?.urls?.message} />

          <button
            type="submit"
            className="mt-8 px-6 py-2 w-fit flex mx-auto rounded-lg text-lg font-semibold"
          >
            Add
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFilter;

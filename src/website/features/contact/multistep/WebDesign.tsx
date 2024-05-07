// WebDesignStep.tsx
"use client";

import React, { useState, useEffect } from "react";

import { Heading } from "@/components/ui/typography/typography";
import { InputField, TestInput, Textarea } from "@/components/ui/input/fields";
import { MultiStepContactFormChildProps } from "./contact-form";

export const WebDesignStep: React.FC<MultiStepContactFormChildProps> = ({
  register,
  watch,
  errors,
}) => {
  // Use for showing the other reason textarea
  const [showOtherReasonWebFunctionality, setShowOtherReasonWebFunctionality] =
    useState(false);
  const websiteFunctionaliteit = watch("websiteFunctionaliteit");

  useEffect(() => {
    if (Array.isArray(websiteFunctionaliteit)) {
      setShowOtherReasonWebFunctionality(
        websiteFunctionaliteit.includes("Een andere reden"),
      );
    }
  }, [websiteFunctionaliteit]);

  return (
    <>
      <Heading level="h4" size="base" colorScheme="dark">
        Heeft U al een website?
      </Heading>
      {/* <RadioGroup data={HEEFT_WEBSITE} register={register} registerType="heeftWebsite" className='mt-3' /> */}
      <div className="flex flex-col gap-3 mt-3">
        {HEEFT_WEBSITE.map((item, index) => (
          <TestInput
            key={index}
            type="radio"
            label={item.option}
            value={item.option}
            {...register("heeftWebsite")}
          />
        ))}
      </div>
      {watch("heeftWebsite") === "Ja" && (
        <InputField
          type="text"
          placeholder="Uw website url..."
          {...register("websiteURL")}
        />
      )}
      <p>{errors.heeftWebsite?.message}</p>

      <Heading level="h4" size="base" colorScheme="dark" className="mt-6">
        Naar welke functionaliteit bent u op zoek?
      </Heading>
      <div className="flex flex-col gap-3 mt-3">
        {WEBSITE_FUNCTIONALITEIT.map((item, index) => (
          <TestInput
            key={index}
            type="checkbox"
            label={item.option}
            value={item.option}
            {...register("websiteFunctionaliteit")}
          />
        ))}
      </div>
      {showOtherReasonWebFunctionality && (
        <Textarea
          rows={2}
          placeholder="Gelieve te specificeren..."
          {...register("otherReasonWebsiteFunctionaliteit")}
        />
      )}
      <p>{errors.websiteURL?.message}</p>
    </>
  );
};

const HEEFT_WEBSITE = [{ option: "Ja" }, { option: "Nee" }];
const WEBSITE_FUNCTIONALITEIT = [
  { option: "Responsief ontwerp" },
  { option: "Contact/ Reserveringssysteem" },
  { option: "Online betalingen" },
  { option: "CMS (Content Management Systeem)" },
  { option: "Een andere reden" },
];

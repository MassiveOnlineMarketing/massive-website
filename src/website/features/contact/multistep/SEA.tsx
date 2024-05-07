"use client";

import React, { useState, useEffect } from "react";

import { Heading } from "@/components/ui/typography/typography";
import { TestInput, Textarea } from "@/components/ui/input/fields";
import { MultiStepContactFormChildProps } from "./contact-form";

export const SEAStep: React.FC<MultiStepContactFormChildProps> = ({
  register,
  watch,
  errors,
}) => {
  // Use for showing the other reason textarea
  const [
    showOtherReasonAdvertentiePlatform,
    setShowOtherReasonAdvertentiePlatform,
  ] = useState(false);
  const AnderePlatform = watch("onlineAdvertentiesPlatformen");

  useEffect(() => {
    if (Array.isArray(AnderePlatform)) {
      setShowOtherReasonAdvertentiePlatform(
        AnderePlatform.includes("Andere platform"),
      );
    }
  }, [AnderePlatform]);

  return (
    <>
      <Heading level="h4" size="base" colorScheme="dark">
        Heeft u eerder geïnvesteerd in Online advertenties?
      </Heading>
      <div className="flex flex-col gap-3 mt-3">
        {HEEFT_EERDER_GEADVERTEERD.map((item, index) => (
          <TestInput
            key={index}
            type="radio"
            label={item.option}
            value={item.option}
            {...register("heeftEerderGeadverteerd")}
          />
        ))}
      </div>

      <Heading level="h4" size="base" colorScheme="dark" className="mt-6">
        Welke platformen gebruikt u of heeft u interesse in?
      </Heading>
      <div className="flex flex-col gap-3 mt-3">
        {ONLINE_ADVERTENTIES_PLATFORMS.map((item, index) => (
          <TestInput
            key={index}
            type="checkbox"
            label={item.option}
            value={item.option}
            {...register("onlineAdvertentiesPlatformen")}
          />
        ))}
      </div>
      {showOtherReasonAdvertentiePlatform && (
        <Textarea
          rows={2}
          placeholder="Gelieve te specificeren..."
          {...register("AnderePlatform")}
        />
      )}
    </>
  );
};

const HEEFT_EERDER_GEADVERTEERD = [{ option: "Ja" }, { option: "Nee" }];

// OnlineAdvertenties
const ONLINE_ADVERTENTIES_PLATFORMS = [
  { option: "Google" },
  { option: "Facebook" },
  { option: "Instagram" },
  { option: "LinkedIn" },
  { option: "Andere platform" },
];

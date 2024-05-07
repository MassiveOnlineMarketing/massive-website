"use client";

import React, { useState, useEffect } from "react";

import { Heading } from "@/components/ui/typography/typography";
import { TestInput, Textarea } from "@/components/ui/input/fields";
import { MultiStepContactFormChildProps } from "./contact-form";

export const StrategieStep: React.FC<MultiStepContactFormChildProps> = ({
  register,
  watch,
  errors,
}) => {
  // Use for showing the other reason textarea
  const [showOtherReasonMarketingKanalen, setShowOtherReasonMarketingKanalen] =
    useState(false);
  const marketingKanalen = watch("onlineMarketingKanalen");

  useEffect(() => {
    if (Array.isArray(marketingKanalen)) {
      setShowOtherReasonMarketingKanalen(marketingKanalen.includes("Anders"));
    }
  }, [marketingKanalen]);

  return (
    <>
      <Heading level="h4" size="base" colorScheme="dark">
        Met welke uitdagingen wordt u geconfronteerd met uw huidige online
        marketingstrategie?
      </Heading>
      <Textarea
        rows={2}
        placeholder="Laat ons meer weten over uw uitdaging..."
        {...register("strategieUitdaging")}
      />

      <Heading level="h4" size="base" colorScheme="dark" className="mt-6">
        Welke online marketingkanalen gebruikt u momenteel?
      </Heading>
      <div className="flex flex-col gap-3 mt-3">
        {ONLINE_MARKETING_KANALEN.map((item, index) => (
          <TestInput
            key={index}
            type="checkbox"
            label={item.option}
            value={item.option}
            {...register("onlineMarketingKanalen")}
          />
        ))}
      </div>
      {showOtherReasonMarketingKanalen && (
        <Textarea
          rows={2}
          placeholder="Gelieve te specificeren..."
          {...register("otherReasonOnlineMarketingKanalen")}
        />
      )}

      <Heading level="h4" size="base" colorScheme="dark" className="mt-6">
        Wat zijn uw top 3 zakelijke doelen voor het komende 12 maanden?
      </Heading>
      <Textarea
        rows={4}
        placeholder="Laat ons meer weten over uw doelen..."
        {...register("zakelijkeDoelen")}
      />
    </>
  );
};

// OnlineMarketingStrategie
const ONLINE_MARKETING_KANALEN = [
  { option: "SEO (Zoekmachineoptimalizatie)" },
  { option: "E-mailmarketing" },
  { option: "Sociale media" },
  { option: "PPC-advertenties" },
  { option: "Contentmarketing" },
  { option: "Anders" },
];

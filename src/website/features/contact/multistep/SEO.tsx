"use client";

import React, { useState, useEffect } from "react";

import { Heading } from "@/components/ui/typography/typography";
import { TestInput, Textarea } from "@/components/ui/input/fields";
import { MultiStepContactFormChildProps } from "./contact-form";

export const SEOStep: React.FC<MultiStepContactFormChildProps> = ({
  register,
  watch,
  errors,
}) => {
  // Use for showing the other reason textarea
  const [showOtherReasonSeoDoelen, setShowOtherReasonSeoDoelen] =
    useState(false);
  const seoDoelen = watch("seoDoelen");

  useEffect(() => {
    if (Array.isArray(seoDoelen)) {
      setShowOtherReasonSeoDoelen(seoDoelen.includes("Andere Reden"));
    }
  }, [seoDoelen]);

  return (
    <>
      <Heading level="h4" size="base" colorScheme="dark">
        Heeft u eerder geïnvesteerd in SEO?
      </Heading>
      <div className="flex flex-col gap-3 mt-3">
        {HEEFT_EERDER_GEADVERTEERD.map((item, index) => (
          <TestInput
            key={index}
            type="radio"
            label={item.option}
            value={item.option}
            {...register("heeftEerderSEOGeinvesteerd")}
          />
        ))}
      </div>

      <Heading level="h4" size="base" colorScheme="dark" className="mt-6">
        Wat zijn uw belangrijkste doelen voor SEO?
      </Heading>
      <div className="flex flex-col gap-3 mt-3">
        {SEO_OPTIONS.map((item, index) => (
          <TestInput
            key={index}
            type="checkbox"
            label={item.option}
            value={item.option}
            {...register("seoDoelen")}
          />
        ))}
      </div>
      {showOtherReasonSeoDoelen && (
        <Textarea
          rows={2}
          placeholder="Gelieve te specificeren..."
          {...register("otherReasonSeoDoelen")}
        />
      )}
      <p>{errors.websiteURL?.message}</p>

      <Heading level="h4" size="base" colorScheme="dark" className="mt-6">
        Zijn er specifieke trefwoorden of zinnen die u target?
      </Heading>
      <Textarea
        rows={2}
        placeholder="Geef uw specifieke trefwoorden of zinnen op..."
        {...register("belangerijksteZoekwoorden")}
      />
    </>
  );
};

// Zoekmachineoptimalizatie
const HEEFT_EERDER_GEADVERTEERD = [{ option: "Ja" }, { option: "Nee" }];

const SEO_OPTIONS = [
  { option: "Verhogen van organische zoekrangschikking" },
  { option: "Lokale zoekpresentie versterken" },
  { option: "Verhogen van organisch verkeer" },
  { option: "Contentoptimalisatie" },
  { option: "Technische SEO-audit/reparaties" },
  { option: "Andere reden" },
];

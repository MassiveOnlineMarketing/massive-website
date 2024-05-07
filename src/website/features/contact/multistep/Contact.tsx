"use client";

import React from "react";
import { Heading } from "@/components/ui/typography/typography";
import {
  DeepMap,
  FieldValues,
  UseFormRegister,
  FieldError,
} from "react-hook-form";
import { InputField, Textarea } from "@/components/ui/input/fields";

type ContactStap = {
  register: UseFormRegister<FieldValues>;
  watch: (fieldName: string) => any;
  errors: DeepMap<FieldValues, FieldError>;
  websiteURL?: string;
};

export const ContactStep: React.FC<ContactStap> = ({
  register,
  watch,
  errors,
  websiteURL,
}) => {
  return (
    <>
      <Heading level="h4" size="base" colorScheme="dark">
        Tijdlijn, graag binnen
      </Heading>
      <div className="flex justify-between">
        <p>zsm</p>
        <p className="ml-14">6 maanden</p>
        <p>12 maanden</p>
      </div>
      <input
        type="range"
        min="0"
        max="12"
        className="w-full accent-primary-500"
        {...register("tijdlijn")}
      />

      <Heading level="h3" size="base" colorScheme="dark" className="mt-6">
        Uw budget
      </Heading>
      <div className="flex justify-between">
        <p>€0</p>
        <p className="ml-8">€15.000</p>
        <p>€30.000</p>
      </div>
      <input
        type="range"
        min="1"
        max="30000"
        className="w-full accent-primary-500"
        {...register("budget")}
      />

      <Heading level="h3" size="base" colorScheme="dark" className="mt-6">
        Naam
      </Heading>
      <InputField
        type="text"
        placeholder="Uw naam..."
        required
        {...register("name")}
      />
      {errors.name?.message && (
        // use the message from the hook
        <p className="text-red-500">{errors.name.message}</p>
      )}

      <Heading level="h3" size="base" colorScheme="dark" className="mt-6">
        Email
      </Heading>
      <InputField
        type="email"
        placeholder="Uw email..."
        required
        {...register("email")}
      />
      {errors.email?.message && (
        <p className="text-red-500">{errors.email.message}</p>
      )}

      <Heading level="h3" size="base" colorScheme="dark" className="mt-6">
        Website
      </Heading>
      <InputField
        type="text"
        placeholder="Uw website url..."
        defaultValue={websiteURL || ""}
        {...register("websiteURL")}
      />
      <Textarea placeholder="Uw bericht..." rows={3} {...register("message")} />
      {errors.message?.message && (
        <p className="text-red-500">{errors.message.message}</p>
      )}
    </>
  );
};

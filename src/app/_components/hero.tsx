"use client";

import React from "react";
import Image from "next/image";

import Title from "@/components/ui/typography/title";
import {
  Heading,
  Paragraph,
  SubHeading,
} from "@/components/ui/typography/typography";

import container from "@/styles/styles";
import { GridBackground, WhiteWave } from "@/assets/backgrounds";
import { PurpleCheckmarkRound } from "@/assets/icons";

import { InternalAnchor } from "@/components/ui/link";
import { DEFAULT_MULTISTEP_FORM_ROUTE } from "../../../routes";

const Hero = () => {
  return (
    <div className="relative pt-[120px] md:pt-[70px] md:pb-[70px]">
      <div
        className={`relative md:pb-16 lg:pb-0 grid md:grid-cols-2 ${container.maxWidthGutter}`}
      >
        <GridBackground className="absolute top-0 left-0 -z-10" />

        <div className="my-auto lg:pb-[120px]">
          <Title>
            <SubHeading
              level="h1"
              size="sm"
              colorScheme="glass"
              variant="pill"
              className="text-primary-500"
            >
              {HERO.subheading}
            </SubHeading>
            <Heading level="h2" size="7xl" className="text-4xl font-bold">
              {HERO.heading}
            </Heading>
            <Paragraph size="lg">{HERO.paragraph}</Paragraph>
          </Title>
          <ul className="mt-6">
            {SECTION_GESPREK.list.map((item) => (
              <li key={item} className="flex flex-row gap-4 items-center mt-4">
                <PurpleCheckmarkRound className="w-4 h-4" />
                <Paragraph className="font-medium">{item}</Paragraph>
              </li>
            ))}
          </ul>

          <InternalAnchor
            href={DEFAULT_MULTISTEP_FORM_ROUTE}
            size="md"
            variant="primary"
            className="mt-6 w-full md:w-fit"
          >
            {HERO.buttonLabel}
          </InternalAnchor>
        </div>

        <Image
          loading="eager"
          src={"/home/massive-hero-header-man-met-laptop-662x755-XL.png"}
          width={750}
          height={730}
          alt="klant die blij zijn website laat zien"
          className="py-6 md:py-[104px]"
        />
      </div>

      <WhiteWave className="absolute bottom-0 left-0 -z-10" />
    </div>
  );
};

const HERO = {
  subheading: "Massive Online Marketing",
  heading: "Uw Partner in Digitale Groei",
  paragraph:
    "Ontdek onze online marketingdiensten, zorgvuldig samengesteld om uw merk te versterken, bereik te vergroten en uw bedrijf te laten bloeien in het digitale tijdperk.",
  buttonLabel: "Neem contact op",
};

const SECTION_GESPREK = {
  subheading: "Strategisch Online Advies",
  heading: "Gratis Advies, Onbeperkte Mogelijkheden",
  paragraph:
    "Niet zeker welke marketingdiensten het beste passen bij uw onderneming?Geen zorgen, onze toegewijde specialisten staan klaar om u te begeleiden. Plan een vrijblijvend gesprek in en laten wij samen kijken naar het herdefiniëren van uw online strategie.",
  list: [
    "Zakelijke Bedrijfwebsites",
    "Uitgebreide Webwinkel Oplossingen",
    "Hoger Gevonden Worden in Google",
  ],
};

export default Hero;

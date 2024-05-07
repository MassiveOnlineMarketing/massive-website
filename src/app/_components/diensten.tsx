"use client";

import Title from "@/components/ui/typography/title";
import {
  Heading,
  Paragraph,
  SubHeading,
} from "@/components/ui/typography/typography";
import {
  SwipeArrowNav,
  SwipeContent,
  SwipeDots,
  SwipeProvider,
} from "@/website/features/swipe";
import container, { constants } from "@/styles/styles";
import {
  ChevronRightIcon,
  ComputerDesktopIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import React from "react";

import {
  DiensetenWebshop,
  DienstenCMS,
  DienstenSEA,
  DienstenSEO,
  DienstenStrategie,
  DienstenWebsite,
} from "../_assets";

import { InternalAnchor } from "@/components/ui/link";
import { DEFAULT_MULTISTEP_FORM_ROUTE } from "../../../routes";

export const Diensten = () => {
  return (
    <div className={`${container.maxWidthGutter}`}>
      <Title className={`max-w-[641px] ${container.extraPaddingMd}`}>
        <SubHeading level="h2" size="sm" colorScheme="gradient-primary">
          {DIENSTEN.title.subheading}
        </SubHeading>
        <Heading level="h3" size="4xl">
          {DIENSTEN.title.heading}
        </Heading>
        <Paragraph size="base">{DIENSTEN.title.paragraph}</Paragraph>
      </Title>

      {/* mobile */}
      <div className="relative mt-8 md:hidden">
        <SwipeProvider numberOfCards={6}>
          <SwipeArrowNav />
          <SwipeContent className="mt-4">
            {DIENSTEN.cards.map((card, i) => (
              <MobileCard key={i} card={card} />
            ))}
          </SwipeContent>
          <SwipeDots className="mt-16" />
        </SwipeProvider>
      </div>

      {/* desktop */}
      <div className=" md:grid md:grid-cols-2 gap-6 mt-[52px] hidden">
        {DIENSTEN.cards.map((card, i) => (
          <DesktopCard key={i} card={card} />
        ))}
      </div>
    </div>
  );
};

interface CardProps {
  key: number;
  card: {
    image: string;
    insideImage: React.ReactNode;
    icon: React.ReactNode;
    subHeading: string;
    heading: string;
    paragraph: string;
    buttonLabel: string;
    buttonLink: string;
  };
}

const MobileCard = ({ card }: CardProps) => {
  return (
    <div
      className={`px-3 pt-3 pb-4 rounded-[20px]  shadow-custom-lg h-full flex flex-col ${constants.glassFill}`}
    >
      <div className="w-full h-[207px] bg-[url('/home/diensten-card-image-background.png')] bg-right">
        <div className="flex items-center justify-center h-full w-full p-6">
          {card.insideImage}
        </div>
      </div>

      <div className="flex flex-col h-full justify-between">
        <Title className="mt-3 gap-2">
          <SubHeading
            level="h4"
            size="sm"
            className="font-normal flex flex-row gap-[10px] py-[6px] items-center"
          >
            {card.icon} {card.subHeading}
          </SubHeading>
          <Heading level="h5" size="2xl">
            {card.heading}
          </Heading>
          <Paragraph>{card.paragraph}</Paragraph>
        </Title>

        <InternalAnchor
          href={DEFAULT_MULTISTEP_FORM_ROUTE}
          variant="glass"
          size="sm"
          className="mt-3 mx-3 pr-[10px] "
        >
          {" "}
          {card.buttonLabel} <ChevronRightIcon className="w-4 h-4" />
        </InternalAnchor>
      </div>
    </div>
  );
};

const DesktopCard = ({ card }: CardProps) => {
  return (
    <div
      className={`px-3 pt-3 pb-4 rounded-[20px] shadow-custom-lg h-full flex flex-col ${constants.glassFill} transition ease-out-in hover:-translate-y-2`}
    >
      <div className="w-full min-h-[214px] rounded-[12px] bg-[url('/home/diensten-card-image-background.png')] bg-right">
        <div className="flex items-center justify-center h-full w-full p-6">
          {card.insideImage}
        </div>
      </div>

      <div className="flex flex-col h-full justify-between">
        <Title className="mt-3 px-3 gap-2">
          <SubHeading
            level="h4"
            size="sm"
            className="font-normal flex flex-row gap-[10px] py-[6px] items-center"
          >
            {card.icon} {card.subHeading}
          </SubHeading>
          <Heading level="h5" size="2xl">
            {card.heading}
          </Heading>
          <Paragraph>{card.paragraph}</Paragraph>
        </Title>

        <InternalAnchor
          href={card.buttonLink}
          variant="glass"
          size="sm"
          className="mt-3 mx-3 pr-[10px] "
        >
          {" "}
          {card.buttonLabel} <ChevronRightIcon className="w-4 h-4" />
        </InternalAnchor>
      </div>
    </div>
  );
};

const DIENSTEN = {
  title: {
    subheading: "Welkom bij Massive Online Marketing",
    heading: "Marketingoplossingen voor uw onderneming",
    paragraph:
      "Wij bieden een divers scala aan digitale marketingdiensten, elk ontworpen om uw merk te versterken, uw bereik te vergroten en uw bedrijf vooruit te helpen in het digitale tijdperk.",
  },
  cards: [
    {
      image: "/home/diensten-card-image-background.png",
      insideImage: (
        <DienstenWebsite className="max-w-[462px] max-h-[148px] w-full" />
      ),
      icon: <ComputerDesktopIcon className="w-5 h-5" />,
      subHeading: "Zakelijke Website",
      heading: "Website Ontwikkeling",
      paragraph:
        "Converteren uw bezoekers niet? Wij creëren gebruikersvriendelijke webshops geoptimaliseerd voor conversie, die de verkoop stimuleren en klantloyaliteit opbouwen.",
      buttonLabel: "Ontdek meer",
      buttonLink: "/zakelijke-website-laten-maken",
    },
    {
      image: "/home/diensten-card-image-background.png",
      insideImage: (
        <DiensetenWebshop className="max-w-[500px] max-h-[148px] w-full" />
      ),
      icon: <AcademicCapIcon className="w-5 h-5" />,
      subHeading: "Webshop",
      heading: "eCommerce-oplossingen",
      paragraph:
        "Verander bezoekers in kopers met onze geoptimaliseerde eCommerce-platforms. Wij creëren gebruikersvriendelijke webshops die de verkoop stimuleren en klantloyaliteit opbouwen.",
      buttonLabel: "Ontdek meer",
      buttonLink: "/professionele-webshop-laten-maken",
    },
    {
      image: "/home/diensten-card-image-background.png",
      insideImage: <DienstenSEO className="max-w-[302px] w-full" />,
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
      subHeading: "SEO",
      heading: "Zoekmachineoptimalisatie",
      paragraph:
        "Behaalt u elke keer maar niet de positie in google die u wilt? Verhoog uw online zichtbaarheid met onze strategische SEO-diensten. Waar wij uw website optimaliseren en u van een hogere positie geniet.",
      buttonLabel: "Ontdek meer",
      buttonLink: "/search-engine-optimization",
    },
    {
      image: "/home/diensten-card-image-background.png",
      insideImage: <DienstenSEA className="max-w-[290px] w-full" />,
      icon: <AcademicCapIcon className="w-5 h-5" />,
      subHeading: "SEA",
      heading: "Zoekmachineadverteren (SEA)",
      paragraph:
        "Bereik uw doelgroep effectief met onze gerichte advertentiestrategieën. Van Google Ads tot sociale media campagnes, wij helpen u om zichtbaar te zijn waar uw klanten zijn.",
      buttonLabel: "Neem Contact op",
      buttonLink: DEFAULT_MULTISTEP_FORM_ROUTE,
    },
    {
      image: "/home/diensten-card-image-background.png",
      insideImage: (
        <DienstenCMS className="max-w-[469px] max-h-[148px] w-full" />
      ),
      icon: <ComputerDesktopIcon className="w-5 h-5" />,
      subHeading: "CMS",
      heading: "Content Management Systemen",
      paragraph:
        "Het overzicht kwijt door alle verschillende systemen die uw website draaiende houden?  Neem de controle over uw website weer terug door onze opmaat gemaakte CMS-oplossingen. ",
      buttonLabel: "Neem Contact op",
      buttonLink: DEFAULT_MULTISTEP_FORM_ROUTE,
    },
    {
      image: "/home/diensten-card-image-background.png",
      insideImage: (
        <DienstenStrategie className="max-w-[358px] max-h-[148px] w-full" />
      ),
      icon: <AcademicCapIcon className="w-5 h-5" />,
      subHeading: "Webshop",
      heading: "Digitale Strategieontwikkeling",
      paragraph:
        "Geen idee hoe je uw online strategie moet aanpakken? Wij helpen u bij het bepalen van doelen, het identificeren van kansen en het implementeren van effectieve digitale plannen.",
      buttonLabel: "Neem Contact op",
      buttonLink: DEFAULT_MULTISTEP_FORM_ROUTE,
    },
  ],
};

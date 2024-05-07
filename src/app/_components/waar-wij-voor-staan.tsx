import React from "react";
import Image from "next/image";

import { ResponsiveGridContainer } from "@/website/layouts/containers";
import { Heading, Paragraph } from "@/components/ui/typography/typography";

import container from "@/styles/styles";
import {
  ArrowTrendingUpIcon,
  ArrowsPointingInIcon,
  BellAlertIcon,
  IdentificationIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { ArrowUpWaarWijVoorStaanSvg } from "../_assets";

// contact
import { InternalAnchor } from "@/components/ui/link";
import { DEFAULT_MULTISTEP_FORM_ROUTE } from "../../../routes";

const WaarWijVoorStaan = () => {
  return (
    <div className="relative pt-[381px] mt-[-225px] pb-[130px]">
      <Image
        src={"/home/waar-wij-voor-staan-background.jpg"}
        width={1920}
        height={1068}
        alt="waar wij voor staan background"
        className="absolute top-0 left-0 h-full w-full object-cover -z-10"
      />
      <ArrowUpWaarWijVoorStaanSvg className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" />

      <div className={` ${container.maxWidthGutter} flex flex-col `}>
        <Heading level="h2" size="4xl" className="font-semibold">
          Waar wij voor staan
        </Heading>

        <ResponsiveGridContainer columns="3" className="gap-10 my-[62px]">
          {WAAR_WIJ_VOOR_STAAN.cards.map((item) => (
            <Card key={item.heading} item={item} />
          ))}
        </ResponsiveGridContainer>
        <div className="h-[1.5px] w-full bg-gray-300"></div>

        <InternalAnchor
          href={DEFAULT_MULTISTEP_FORM_ROUTE}
          variant="primary"
          size="md"
          className="mt-8 mx-auto"
        >
          {WAAR_WIJ_VOOR_STAAN.buttonLabel}
        </InternalAnchor>
      </div>
    </div>
  );
};

interface cardProps {
  icon: React.ReactNode;
  heading: string;
  paragraph: string;
}

const Card = ({ item }: { item: cardProps }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="text-primary-500">{item.icon}</div>
      <div>
        <Heading level="h4" size="lg" className="font-medium">
          {item.heading}
        </Heading>
        <Paragraph className="text-gray-700 mt-[8px]">
          {item.paragraph}
        </Paragraph>
      </div>
    </div>
  );
};

const WAAR_WIJ_VOOR_STAAN = {
  cards: [
    {
      icon: <UserGroupIcon className="w-5 h-5" />,
      heading: "Echte Samenwerking",
      paragraph:
        "Gebaseerd op onze eigen ervaringen als ondernemers, is samenwerking het fundament van ons succes. We werken niet alleen voor u, maar met u, en creëren een partnerschap dat gericht is op gezamenlijke groei en succes.",
    },
    {
      icon: <ArrowsPointingInIcon className="w-5 h-5" />,
      heading: "Focus op Uw Kern",
      paragraph:
        "Wij nemen de complexe taken van marketing en design op ons, zodat u zich kunt richten op wat u het beste doet. Door ons op deze gebieden te specialiseren, zorgen we dat u meer tijd heeft voor uw passies en kernactiviteiten.",
    },
    {
      icon: <BellAlertIcon className="w-5 h-5" />,
      heading: "Innovatieve Oplossingen",
      paragraph:
        "Innoveren en nieuwe oplossingen vinden die passen bij de uitdagingen en doelen van onze klanten. Ons team blijft altijd op de hoogte van de nieuwste technologieën en trends, zodat we voorop lopen in de digitale wereld.",
    },
    {
      icon: <SparklesIcon className="w-5 h-5" />,
      heading: "Transparantie en Integriteit",
      paragraph:
        "Transparantie en integriteit zijn essentieel in alles wat we doen. We communiceren open en eerlijk over onze processen, beslissingen en prijzen, wat zorgt voor vertrouwen en respect in onze relaties met klanten.",
    },
    {
      icon: <IdentificationIcon className="w-5 h-5" />,
      heading: "Klantgerichte Aanpak",
      paragraph:
        "Elke beslissing die we nemen, elk plan dat we ontwikkelen, is met het oog op het succes van onze klanten. We luisteren naar uw behoeften en passen onze strategieën aan om de beste resultaten te behalen.",
    },
    {
      icon: <ArrowTrendingUpIcon className="w-5 h-5" />,
      heading: "Duurzame Groei en Ontwikkeling",
      paragraph:
        "We streven niet alleen naar onmiddellijke successen, maar ook naar duurzame groei en ontwikkeling voor zowel onze klanten als ons zelf. Dit betekent investeren in langetermijnstrategieën die impact hebben.",
    },
  ],
  buttonLabel: "Plan een Vrijblijvend Gesprek in",
};

export default WaarWijVoorStaan;

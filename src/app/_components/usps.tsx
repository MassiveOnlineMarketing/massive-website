import React from "react";

import Title from "@/components/ui/typography/title";
import {
  Heading,
  Paragraph,
  SubHeading,
} from "@/components/ui/typography/typography";

import container from "@/styles/styles";
import { UspsOneSvg } from "../_assets";

export const Usps = () => {
  return (
    <div className={` ${container.sectionGutter} ${container.maxWidthGutter}`}>
      <div
        className={` mt-[60px] md:mt-[130px] px-6 md:px-12 py-12 md:py-24 rounded-[20px]  shadow-inner bg-[url('/home/gradient-background-usps.jpg')] bg-cover bg-center`}
      >
        <Title className="max-w-[750px] mx-auto md:text-center md:items-center">
          <SubHeading
            level="h2"
            size="sm"
            colorScheme="gradient-primary"
            className="pt-[6px]"
          >
            {USPS.title.subHeading}
          </SubHeading>
          <Heading level="h3" size="2xl">
            {USPS.title.heading}
          </Heading>
        </Title>

        <div className="mt-16 grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {USPS.cards.map((card) => (
            <Card key={card.heading} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  key: string;
  card: {
    icon: React.ReactNode;
    heading: string;
    paragraph: string;
  };
}

const Card = ({ card }: CardProps) => {
  return (
    <div className="flex flex-col ">
      {card.icon}
      <Heading level="h4" size="lg" className="font-medium mt-4">
        {card.heading}
      </Heading>
      <Paragraph className="text-gray-700 mt-[8px]">{card.paragraph}</Paragraph>
    </div>
  );
};

const USPS = {
  title: {
    subHeading: "Waarom Ondernemers voor Ons Kiezen",
    heading:
      "Wij combineren ondernemerschap met resultaatgerichte strategieën om uw bedrijf naar een hoger niveau te tillen.",
  },
  cards: [
    {
      icon: <UspsOneSvg />,
      heading: "Open en Transparant",
      paragraph:
        "Frustraties over gebrek aan duidelijkheid? Bij ons vindt u volledige transparantie en heldere communicatie, essentieel voor een vertrouwensrelatie en vruchtbare samenwerking.",
    },
    {
      icon: <UspsOneSvg />,
      heading: "Creatieve Oplossingen",
      paragraph:
        "Teleurgesteld door standaardoplossingen? Wij brengen innovatie en maatwerk, waardoor uw merk opvalt en een onuitwisbare indruk achterlaat.",
    },
    {
      icon: <UspsOneSvg />,
      heading: "Gericht op uw Succes",
      paragraph:
        "Heeft u te maken gehad met bureaus die uw doelen niet begrepen? Als mede-ondernemers staan wij in uw schoenen en zijn toegewijd aan uw groei en succes.",
    },
    {
      icon: <UspsOneSvg />,
      heading: "Diversiteit en Inclusiviteit",
      paragraph:
        "Vastgelopen in een tunnelvisie bij andere bureaus? Ons diverse team brengt nieuwe perspectieven en creatieve oplossingen die uw bedrijf vanuit alle hoeken benaderen.",
    },
  ],
};

export default Usps;

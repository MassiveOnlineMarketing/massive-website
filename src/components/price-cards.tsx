import React from "react";
import { cn } from "@/lib/utils";

import { Heading, Paragraph } from "@/components/ui/typography/typography";
import { ExternalAnchor } from "@/components/ui/link";

import {
  GrayPlusRound,
  GreenCheckmarkRound,
  PurpleCheckmarkRound,
} from "@/assets/icons";
import { MassiveLogoPriceCard } from "@/assets/branding";
import { SquaresPlusIcon } from "@heroicons/react/20/solid";

export type PriceCardProps = {
  title: {
    icon: React.JSX.Element;
    heading: string;
    paragraph: string;
  };
  content: {
    price: string;
    features: string[];
    modules: string[];
  };
};

type MailtoLinksPtops = {
  mailtoLinkButton: string;
  mailtoLinkModule: string;
};

export const PriceCard = ({
  index,
  card,
  mailtoLinks,
}: {
  index: number;
  card: PriceCardProps;
  mailtoLinks: MailtoLinksPtops;
}) => {
  return (
    <div
      className={cn(
        `flex-1 flex flex-col rounded-2xl overflow-hidden bg-gray-50 xs360:min-w-[300px] xs390:min-w-[320px] snap-start `,
        index === 0 && "border-[1.5px] border-gray-200 xl:shadow-lg",
        index === 1 &&
          "relative gradient-mask price-card-gradient xl:shadow-custom-lg",
        index === 2 &&
          "relative gradient-mask price-card-top-gradient border-x-[1.5px] border-b-[1.5px] xl:shadow-lg",
      )}
    >
      {index === 1 && (
        <div className="absolute rotate-[30deg] h-7 top-[2%] left-[37%] w-full flex items-center justify-center   bg-gradient-to-r from-[#FFCFA3] from--4.42% via-[#C176FC] via-14.47% via-[#9076FC] via-54.38% to-[#C6B8FF] to-85.5%">
          <p className=" mr-[18px] text-sm font-semibold text-white">
            Meest populair
          </p>
        </div>
      )}
      {/* title */}
      <div className="p-8 pb-6 flex gap-[18px] bg-white border-b border-gray-200">
        <div className="w-12 h-12 p-3 border border-gary-200 rounded">
          {card.title.icon}
        </div>
        <div>
          <Heading className="font-bold" level="h2" size="2xl">
            {card.title.heading}
          </Heading>
          <Paragraph className="" size="sm" colorScheme="gray-500">
            {card.title.paragraph}
          </Paragraph>
        </div>
      </div>

      {/* Content */}

      {index === 2 ? (
        <>
          <Paragraph size="sm" className="text-right pt-12 mr-[30%]">
            Vanaf
          </Paragraph>
          <Heading level="p" size="5xl" className="text-center pb-6 font-bold">
            {card.content.price}
          </Heading>
        </>
      ) : (
        <Heading
          level="p"
          size="5xl"
          className="text-center pt-12 pb-6 font-bold"
        >
          {card.content.price}
        </Heading>
      )}

      {/* features */}
      <ul className="px-8 py-6 flex flex-col gap-4 border-b border-gray-200">
        {card.content.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-[10px]">
            <PurpleCheckmarkRound className="w-6 h-6" />
            <Paragraph className="font-medium" colorScheme="gray-500">
              {feature}
            </Paragraph>
          </li>
        ))}
      </ul>

      {/* Modules */}
      <div className="p-8 pb-6 flex gap-[18px]">
        <div className="w-12 h-12 p-3 border border-gray-200 rounded">
          <SquaresPlusIcon className="h-6 w-6" />
        </div>
        <div>
          <Paragraph size="lg" className="font-semibold">
            Modules
          </Paragraph>
          <Paragraph size="sm" colorScheme="gray-500">
            Inclusief de volgende functies
          </Paragraph>
        </div>
      </div>

      <ul className="mb-6">
        {card.content.modules.map((module, i) => (
          <li
            key={i}
            className={`flex items-center gap-[10px] px-8 py-3 ${i % 2 !== 0 ? "" : "bg-white"}`}
          >
            <GreenCheckmarkRound className="w-6 h-6" />
            <Paragraph className="font-medium" colorScheme="gray-500">
              {module}
            </Paragraph>
          </li>
        ))}
        <li>
          <ExternalAnchor
            href={mailtoLinks.mailtoLinkModule}
            className="w-full  font-medium text-gray-800 justify-start px-8 py-3"
          >
            <GrayPlusRound className="w-6 h-6 mr-[10px]" />
            Meer Functies nodig?
          </ExternalAnchor>
        </li>
      </ul>

      <div className="mt-auto px-8 py-6 bg-white rounded-b-2xl border-t border-b border-gray-200 shadow-sm">
        <ExternalAnchor
          href={`${mailtoLinks.mailtoLinkButton}%20Pakket%20${card.title.heading}`}
          variant="glass"
          size="md"
          className="w-full mt-8"
        >
          Vraag offerte aan
        </ExternalAnchor>
      </div>

      <div className="flex justify-center items-center gap-4 p-4">
        <p className="text-xs leading-4 text-gray-400">
          <strong>100%</strong> Geleverd door
        </p>
        <MassiveLogoPriceCard />
      </div>
    </div>
  );
};

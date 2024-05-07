import React from "react";
import Image from "next/image";

import {
  SubHeading,
  Heading,
  Paragraph,
} from "@/components/ui/typography/typography";

import { GreenCheckmarkRound } from "@/assets/icons";
import { constants } from "@/styles/styles";

const Card = () => {
  return (
    <div
      className={`max-w-[520px] p-2 ${constants.glassFill2} w-fit h-fit rounded-3xl shadow-custom-lg`}
    >
      <div
        className={`pb-8 px-6 pt-6 ${constants.glassFill} ${constants.glassStroke} shadow-md w-fit h-fit rounded-2xl`}
      >
        <div className="flex gap-4 items-center">
          <Image
            src="/contact/massive-logo-hd-wit-64x64.png"
            width={60}
            height={60}
            alt="contact logo"
            className=" rounded-xl"
          />
          <div>
            <SubHeading level="h4" size="sm" colorScheme="gradient-primary">
              Start vandaag met
            </SubHeading>
            <Heading level="h5" size="3xl">
              Massive Online Marketing
            </Heading>
          </div>
        </div>

        <ul className="mt-8">
          {MODAL_LEFT_SIDE.map((item) => (
            <li key={item} className="flex gap-2 items-center mt-2">
              <GreenCheckmarkRound className="w-6 h-6" />
              <Paragraph>{item}</Paragraph>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;

const MODAL_LEFT_SIDE = [
  "Gratis Consultancy",
  "Op Maat Gemaakt Advies",
  "Ontdek uw Digitaal Potentieel",
  "Langdurige Partnerschappen",
  "All-in-One Online Marketing Bureau",
];

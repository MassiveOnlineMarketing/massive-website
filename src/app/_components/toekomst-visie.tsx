import React from "react";
import Image from "next/image";

import Title from "@/components/ui/typography/title";
import {
  Heading,
  Paragraph,
  SubHeading,
} from "@/components/ui/typography/typography";

import container from "@/styles/styles";

// contact
import { InternalAnchor } from "@/components/ui/link";
import { DEFAULT_MULTISTEP_FORM_ROUTE } from "../../../routes";

const ToekomstVisie = () => {
  return (
    <>
      <div className={`px-4 ${container.maxWidthGutter}`}>
        <div
          className={`mt-[100px] overflow-hidden rounded-[32px] shadow-custom-lg relative gradient-mask  dark-border-gradient z-10`}
        >
          <div className=" px-6 md:px-12 pt-12 pb-6 md:py-[82px] gradient-toekomstvisie ">
            <Image
              src="/home/massive-toekomstvisie-background-image-977x549-XL.png"
              width={977}
              height={484}
              alt="toekomstvisie en ambitie background"
              className="absolute top-0 right-0 h-full"
            />

            <Title className="relative z-20 max-w-[600px]">
              <SubHeading
                level="h2"
                size="sm"
                colorScheme="glass-dark"
                variant="pill"
              >
                {TOEKOMST_VISIE.subHeading}
              </SubHeading>
              <Heading
                level="h3"
                size="4xl"
                colorScheme="white"
                colorSchemeHighlight="gradient-primary"
                highlight="Massive"
              >
                {TOEKOMST_VISIE.heading}
              </Heading>
              <Paragraph colorScheme="white">
                {TOEKOMST_VISIE.paragraph}
              </Paragraph>
            </Title>

            <InternalAnchor
              href={DEFAULT_MULTISTEP_FORM_ROUTE}
              variant="dark"
              size="md"
              className="mt-8 w-full md:w-fit"
            >
              {TOEKOMST_VISIE.buttonLabel}
            </InternalAnchor>
          </div>
        </div>
      </div>
    </>
  );
};

const TOEKOMST_VISIE = {
  subHeading: "Toekomstvisie en Ambities",
  heading: "Bij Massive zijn we voortdurend gericht op de toekomst. ",
  paragraph:
    "We streven ernaar om de nieuwste trends en technologieën voor te zijn. Dit zodat we onze klanten naar nieuwe hoogten van digitale uitmuntendheid kunnen leiden. Onze ambitie is om constant te innoveren en nieuwe grenzen te verkennen, samen met onze klanten en partners.",
  buttonLabel: "Neem contact op",
};

export default ToekomstVisie;

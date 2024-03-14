'use client';

import { Button } from "@/components/ui/button";
import Title from "@/components/ui/typography/title";
import { Heading, Paragraph } from "@/components/ui/typography/typography";
import container, { styles } from "@/styles/styles";
import Image from "next/image";
import React from "react";
import { LinkerKwartSircelLogos, RechterKwartSircelLogos } from "../zakelijke-website-laten-maken/_assets";
import useIsMobile from "@/website/hooks/useIsMobile";
import { cn } from "@/lib/utils";

type InputData = {
  subTitle: {
    icon: React.JSX.Element;
    heading: string;
    description: string;
  };
  heading: string;
  description: string;
  button: { text: string; variant: string }[];
  logo: { src: string; alt: string; width: number; height: number }[];
}

/**
 * Renders the Hero component.
 * 
 * @param {Object} props - The component props.
 * @param {InputData} props.DATA - The input data for the component.
 * @returns {JSX.Element} The rendered Hero component.
 */
export const Hero = ({ DATA, titleStyles }: { DATA: InputData, titleStyles?: string }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen lg:h-screen">
      <div
        className="relative h-full"
      >
        {/* Image */}
        <div className="absolute -z-10 w-full h-full xl:p-10 md:pt-[76px]">
          <div className="relative w-full h-full">
            {isMobile ? (
              <Image
                src="/diensten/hero-background.jpg"
                fill={true}
                priority={true}
                alt="hero background"
                className="md:rounded-4xl object-[20%] object-cover "
              />
            ) : (
              <video autoPlay loop muted preload="none" className="xl:rounded-4xl object-[20%] object-cover w-full h-full">
                <source src="/diensten/0072.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={` ${container.maxWidthGutter} md:px-16 flex flex-col h-full pt-[100px] md:pt-0`}>
          <div className="my-auto  md:pt-[70px] ">
            <Title className={cn(
              "gap-8 max-w-[546px] xs390:px-[12px] md:px-0",
              titleStyles
            )}>
              <div className="flex gap-4">
                <div className={`${styles.glass} w-fit p-3 rounded`}>
                  {DATA.subTitle.icon}
                </div>
                <div>
                  <Heading level="h1" size="base" colorScheme="gray-700">
                    {DATA.subTitle.heading}
                  </Heading>
                  <Paragraph
                    size="sm"
                    colorScheme="muted"
                    className="text-sm md:text-base "
                  >
                    {DATA.subTitle.description}
                  </Paragraph>
                </div>
              </div>
              <Heading level="h2" size="7.5xl" className="font-bold">
                {DATA.heading}
              </Heading>
              <Paragraph size="base" colorScheme="muted" className="xl:text-xl">
                {DATA.description}
              </Paragraph>
              <div className="flex flex-col md:flex-row gap-[10px] px-2 md:px-0">
                {DATA.button.map((button, i) => (
                  <Button key={i} size="md" variant={button.variant as "ts-prop"} mbFull>
                    {button.text}
                  </Button>
                ))}
              </div>
            </Title>
          </div>

          {/* Logo box */}
          <div className="relative mt-12 md:mt-0 xl:min-h-[140px] bg-white rounded-t-4xl  grid grid-cols-2 lg:grid-cols-4 place-items-center">
            {DATA.logo.map((logo, i) => (
              <Image
                key={i}
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt={logo.alt}
                className=" scale-75 md:scale-100 "
              />
            ))}

            {/* Kwart circles */}
            <LinkerKwartSircelLogos className='absolute xl:block bottom-10 left-[-32px] hidden' />
            <RechterKwartSircelLogos className="absolute xl:block bottom-10 right-[-32px] hidden" />
          </div>
        </div>
      </div>
    </div >
  );
};


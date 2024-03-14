import React from 'react'

import Title from '@/components/ui/typography/title';
import { Heading, Paragraph, SubHeading } from '@/components/ui/typography/typography'
import container from '@/styles/styles';

import { PriceCard, PriceCardProps } from '@/components/price-cards';

export type ServicePricingProps = {
    mailtoLinks: {
        mailtoLinkButton: string;
        mailtoLinkModule: string;
    }
    title: {
        icon: React.ReactNode;
        subHeading: string;
        heading: string;
        paragraph: string;
    },
    cards: PriceCardProps[]
}

/**
 * Renders the ServicePricing component.
 *
 * @param {Object} props - The component props.
 * @param {ServicePricingProps} props.DATA - The data for the ServicePricing component.
 * @returns {JSX.Element} The rendered ServicePricing component.
 */
export const ServicePricing = ({ DATA }: { DATA: ServicePricingProps}) => {
    return (
        <div className={` ${container.sectionPadding} bg-primary-50 shadow-base`}>
            <Title className={`mx-auto w-fit items-center max-w-[900px] text-center mb-16 ${container.maxWidthGutter}`} >
                <SubHeading level='h2' size="sm" type='glassPillIcon' colorScheme="text-primary-500">{DATA.title.icon} {DATA.title.subHeading}</SubHeading>
                <Heading level='h3' size="5xl">{DATA.title.heading}</Heading>
                <Paragraph>{DATA.title.paragraph}</Paragraph>
            </Title>
            <div className={` ${container.maxWidthGutter} flex gap-6 md:gap-12 overflow-auto xl:overflow-visible scrollbar-hide snap-x snap-mandatory scroll-px-4`}>
                {DATA.cards.map((card, i) => (
                    <PriceCard card={card} key={i} index={i} mailtoLinks={DATA.mailtoLinks} />
                ))}
            </div>
        </div>
    )
}

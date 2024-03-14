import React from 'react'

import Title from '@/components/ui/typography/title';
import { Heading, Paragraph, SubHeading } from '@/components/ui/typography/typography'
import container from '@/styles/styles';

type FeaturesProps = {
    title: {
        icon: React.ReactNode;
        subHeading: string;
        heading: string;
        paragraph: string;
    },
    cards: {
        icon: React.ReactNode;
        heading: string;
        paragraph: string;
    }[]
}

export const Features = ({ DATA }: { DATA: FeaturesProps }) => {
    return (
        <div className={` ${container.sectionPadding} ${container.maxWidthGutter}`}>
            <Title className="mb-16">
                <SubHeading level='h2' size="sm" type='glassPillIcon' colorScheme="text-primary-500">{DATA.title.icon} {DATA.title.subHeading}</SubHeading>
                <Heading level='h3' size="5xl" className="max-w-[700px]">{DATA.title.heading}</Heading>
                <Paragraph size='lg' className="mt-4 max-w-[800px]">{DATA.title.paragraph}</Paragraph>
            </Title>

            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DATA.cards.map((card) => (
                    <li key={card.heading} className="p-6 bg-primary-50 rounded-lg">
                        <div className="text-primary-500 w-12 h-12 p-3 rounded shadow-base bg-white">
                            {card.icon}
                        </div>
                        <Heading level='h4' size='xl' className="mt-4">{card.heading}</Heading>
                        <Paragraph size="base" colorScheme="gray-800" className="mt-2">{card.paragraph}</Paragraph>
                    </li>
                ))}
            </ul>
        </div>
    )
}

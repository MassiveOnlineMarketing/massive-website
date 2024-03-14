import React from 'react'
import Image from 'next/image'

import { Heading, Paragraph, SubHeading } from '@/components/ui/typography/typography'

import container from '@/styles/styles'
import { GreenCheckmarkRound } from '@/assets/icons'
import { ArrowContactSvg } from '../../app/_assets'

// contact
import { InternalAnchor } from '@/components/ui/link'
import { DEFAULT_MULTISTEP_FORM_ROUTE } from '../../../routes'
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'

const StrategischAdvies = () => {
  return (
    <div className={` ${container.sectionPadding} relative ${container.maxWidthGutter} md:grid grid-cols-2`}>
      <ArrowContactSvg className='md:block absolute top-0 left-1/2 -translate-x-1/2 hidden' />

      <div className={`my-auto ${container.extraPaddingMd}`}>
        <div className='flex flex-col gap-4 pr-4'>
          <SubHeading level='h2' size='lg' colorScheme='text-primary-500' className='py-[6px]'>{SECTION_GESPREK.subheading}</SubHeading>
          <Heading level='h3' size='5xl' >{SECTION_GESPREK.heading}</Heading>
          <Paragraph>{SECTION_GESPREK.paragraph}</Paragraph>
          <div className='h-[1px] w-full bg-gray-300'></div>
        </div>
        <ul className='mt-6'>
          {SECTION_GESPREK.list.map((item) => (
            <li key={item} className='flex flex-row gap-4 items-center mt-4'>
              <GreenCheckmarkRound className='w-6 h-6' />
              <Paragraph className='font-medium'>{item}</Paragraph>
            </li>
          ))}
        </ul>
        <InternalAnchor href={DEFAULT_MULTISTEP_FORM_ROUTE} className='mt-12' size='md' variant='primary'>
          {SECTION_GESPREK.buttonLabel} <ArrowLongRightIcon className='w-5' />
        </InternalAnchor>
      </div>

      <Image src={'/home/massive-gratis-consulting-650x618-XL.png'} width={650} height={618} alt='persoon die belt met massive'  />
    </div>
  )
}

const SECTION_GESPREK = {
  subheading: "Strategisch Online Advies",
  heading: "Gratis Advies, Onbeperkte Mogelijkheden",
  paragraph: "Niet zeker welke marketingdiensten het beste passen bij uw onderneming? Geen zorgen, onze toegewijde specialisten staan klaar om u te begeleiden. Plan een vrijblijvend gesprek in en laten wij samen kijken naar het herdefiniëren van uw online strategie.",
  list: [
    "Op Maat Gemaakt Advies",
    "Ontdek uw Digitaal Potentieel",
    "Gratis en Vrijblijvend"
  ],
  buttonLabel: "Plan een Vrijblijvend Gesprek in"
}

export default StrategischAdvies
import React from 'react'

import Title from '@/components/ui/typography/title'
import { SubHeading, Heading, Paragraph } from '@/components/ui/typography/typography'

import { SoftwareSircle } from '../_assets'

const Integratie = () => {
  return (
    <div className='py-10 md:py-0 relative flex items-center justify-center'>
      <SoftwareSircle className=' max-w-[915px] -z-10 w-full' />

      <Title className=' absolute max-w-[362px] text-center flex items-center'>
        <SubHeading level='h2' size='sm' variant='pill' colorScheme='glass'>{INTERGRATIE.subHeading}</SubHeading>
        <Heading level='h3' size='4xl'>{INTERGRATIE.heading}</Heading>
        <Paragraph>{INTERGRATIE.paragraph}</Paragraph>
      </Title>
    </div>
  )
}
export default Integratie

const INTERGRATIE = {
  subHeading: "Integratie",
  heading: "Flexibiliteit en Krachtige Integratie",
  paragraph: "Op maat gemaakte weboplossingen die feilloos samengaan met diverse databases, API’s en externe diensten."
}

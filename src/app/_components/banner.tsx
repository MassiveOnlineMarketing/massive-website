import React from 'react'
import Image from 'next/image'

import { Heading, Paragraph } from '@/components/ui/typography/typography'
import { InternalAnchor } from '@/components/ui/link'

import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { BannerSvg } from '../_assets'
import container, { constants } from '@/styles/styles'
import { cn } from '@/lib/utils'



export const Banner = ({ containerStyles }: { containerStyles?: string}) => {
  return (
    <div className={cn(
      `relative ${container.maxWidthGutter}`,
      containerStyles
    )}>
      <div className={`relative overflow-hidden  ${constants.glassFill} shadow-custom-lg rounded-[20px] flex flex-row`}>
        <div className='absolute bg-gradient-to-l from-[#FFCFA3] from--4.42% via-[#C176FC] via-14.47% via-[#9076FC] via-54.38% to-[#C6B8FF] to-85.5% h-2 top-0 w-full'></div>
        
        <div className=' p-6 md:pt-12 md:pl-8 md:pb-8 max-w-[650px]'>
          <Heading level='h3' size='3xl' className='font-semibold' >{BANNER.heading}</Heading>
          <Paragraph size='base' className='mt-4' >{BANNER.paragraaf}</Paragraph>
          {/* <Button size='sm' variant='glass' className='mt-6 pr-[10px]'>{BANNER.buttonLabel} <ArrowLongRightIcon className='w-4 h-4'/></Button> */}
          <InternalAnchor href='/vragenlijst'  size='sm' variant='glass' className='mt-6 pr-[10px]'>{BANNER.buttonLabel} <ArrowLongRightIcon className='w-4 h-4'/> </InternalAnchor>
        </div>

        <Image src={'/home/massive-isometric-image-mini-modal-444x257-XL.jpg'} width={447} height={295} alt='banner image' className='lg:block ml-auto mt-auto hidden'/>
      </div>

        <BannerSvg className='container-width:block absolute right-[-29px] bottom-[-39px] hidden' />
    </div>
  )
}


const BANNER = {
  heading: "Realiseer Uw Digitale Ambities",
  paragraaf: "Laat ons uw digitale potentieel ontketenen met strategieën die resultaten leveren. Benieuwd naar de mogelijkheden, plan een kosteloos gesprek met een van onze experts.",
  buttonLabel: "Neem contact op"
}
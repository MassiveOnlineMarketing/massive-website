import React from 'react'
import PageContainer from './page-container'
import AnimateWhenInView from '@/website/features/animated/intersection-observer'
import { Heading, Paragraph, SubHeading } from '@/components/ui/typography/typography'
import { Button } from '@/components/ui/button'
import { LinksRechtsImageUitloopContainer } from '@/website/layouts/link-rechts-image-uitloop'
import Title from '@/components/ui/typography/title'
import { GridHalvePageContainer } from '@/website/layouts/grid-halve-page'
import Image from 'next/image'
import container, { constants } from '@/styles/styles'
import { GridFullPageContainer } from '@/website/layouts/grid-full-page'
import { ComputerDesktopIcon } from '@heroicons/react/20/solid'
import { InternalAnchor } from '@/components/ui/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'


const page = () => {
  return (
    <>
      {/* 1 */}
      <LinksRechtsImageUitloopContainer
        imageSide='left'
      >

        {/* rechter container */}
        <div className='mt-[20%]'>
          <Title>
            <SubHeading level='p' size='lg' colorScheme='purple'>{layout1.title.subHeading}</SubHeading>
            <Heading level='h3' size='4xl'>{layout1.title.heading}</Heading>
            <Paragraph size='base'>{layout1.title.paragraph}</Paragraph>
          </Title>
          <GridHalvePageContainer containerStyles='md:px-0 lg:px-0'>
            {layout1.cards.map((card, index) => (
              <div key={index} className='py-3 px-[12px] flex flex-col gap-2'>
                <Heading level='h3' size='base'>{card.title}</Heading>
                <Paragraph size='sm'>{card.description}</Paragraph>
              </div>
            ))}
          </GridHalvePageContainer>
        </div>

        {/* linker container */}
        <div className='relative'>
          <Image
            src={layout1.image.src}
            alt={layout1.image.alt}
            width={layout1.image.width}
            height={layout1.image.height}
            className='w-fit xl:h-[840px] xl:pr-[84px] object-cover object-right z-10 relative ml-auto'
          />
          {/* Back card */}
          <div className={`absolute max-w-[1545px] top-0 left-0 xl:left-auto xl:right-[84px] w-full h-full scale-[102%] rounded-xl ${constants.darkFill}`}></div>
        </div>



      </LinksRechtsImageUitloopContainer>

      {/* 2 */}
      <LinksRechtsImageUitloopContainer
        imageSide='right'
      >
        {/* Linker container */}
        <div className='mt-[20%]'>
          <Title>
            <SubHeading level='p' size='lg' colorScheme='purple'>{layout1.title.subHeading}</SubHeading>
            <Heading level='h3' size='4xl'>{layout1.title.heading}</Heading>
            <Paragraph size='base'>{layout1.title.paragraph}</Paragraph>
          </Title>
          <GridHalvePageContainer containerStyles='md:px-0 lg:px-0'>
            {layout1.cards.map((card, index) => (
              <div key={index} className='py-3 px-[12px] flex flex-col gap-2'>
                <Heading level='h3' size='base'>{card.title}</Heading>
                <Paragraph size='sm'>{card.description}</Paragraph>
              </div>
            ))}
          </GridHalvePageContainer>
        </div>

        {/* Rechter container */}
        <div className='relative'>
          <Image
            src={layout1.image.src}
            alt={layout1.image.alt}
            width={layout1.image.width}
            height={layout1.image.height}
            className='w-fit xl:h-[840px] xl:ml-[84px] object-cover object-left z-10 relative'
          />
          {/* Back card */}
          <div className={`absolute max-w-[1545px] top-0 xl:right-auto xl:left-[84px] w-full h-full scale-[102%] rounded-xl ${constants.darkFill}`}></div>
        </div>

      </LinksRechtsImageUitloopContainer>

      <div className=' relative'>
          <VerticalLines />

        {/* 3 */}
        <section className={`dark:bg-gray-1100 ${container.sectionPaddingBottom}`}>
          {/*  Container */}
          <div className={`${container.maxWidthGutter} ${container.sectionPaddingTop} border-y border-[#320E79] relative z-20 dark:bg-gray-1100`}>
            <Title className='max-w-[1000px] mx-auto text-center items-center'>
              <SubHeading level='p' size='lg' colorScheme='text-primary-500'>{layout2.title.subHeading}</SubHeading>
              <Heading level='h3' size='4xl'>{layout2.title.heading}</Heading>
              <Paragraph size='base'>{layout2.title.paragraph}</Paragraph>
            </Title>
            <Image
              src={layout2.image.src}
              alt={layout2.image.alt}
              width={layout2.image.width}
              height={layout2.image.height}
              className='mx-auto mt-10'
            />
          </div>
            
          {/* Cards */}
          <GridFullPageContainer
            containerStyles={`mt-12 ${container.maxWidthGutter}`}
          >
            {layout2.cards.map((card, index) => (
              <div key={index} className={cn(
                'p-6 flex flex-col gap-2',
                index === 0 && 'border-t-2 border-primary-500'
              )
                }>
                {card.icon}
                <Heading level='h3' size='base'>{card.title}</Heading>
                <Paragraph size='base'>{card.description}</Paragraph>
                <InternalAnchor variant='text' href={card.readMoreLink}>Lees meer <ArrowRightIcon className='w-5 h-5' /></InternalAnchor>
              </div>
            ))}
          </GridFullPageContainer>
        </section>

      </div>
    </>
  )
}

export default page

const layout1 = {
  title: {
    subHeading: 'Doelgericht Design voor Direct Resultaat',
    heading: 'Waarom Websites van Massive het Verschil Maakt',
    paragraph: 'Onze doelgerichte ontwerpen versterken klant vertrouwen, verbeteren gebruikersinteracties en tillen jouw merk naar nieuwe hoogten. Niet alleen mooi, maar ook resultaatgericht. Waarom settle for less? Ontketen de kracht van jouw zakelijke website met Massive Online Marketing.'
  },
  image: {
    src: '/test/image-6.png',
    alt: 'test',
    width: 1080,
    height: 584
  },
  cards: [
    {
      title: 'Pixel Perfwect',
      description: 'Streven naar perfectie, tot in de kleinste pixel.'
    },
    {
      title: 'Veilig',
      description: 'Waterdichte beveiliging voor jouw gemoedsrust.'
    },
    {
      title: 'Veilig',
      description: 'Waterdichte beveiliging voor jouw gemoedsrust.'
    },
  ]
}

const layout2 = {
  title: {
    subHeading: "Doelgericht Design voor Direct Resultaat",
    heading: "Waarom Websites van Massive het Verschil Maakt",
    paragraph: "Onze doelgerichte ontwerpen versterken klant vertrouwen, verbeteren gebruikersinteracties en tillen jouw merk naar nieuwe hoogten. Niet alleen mooi, maar ook resultaatgericht. Waarom settle for less? Ontketen de kracht van jouw zakelijke website met Massive Online Marketing."
  },
  image: {
    src: "/test/layout2.png",
    alt: "test",
    width: 820,
    height: 457
  },
  cards: [
    {
      icon: <ComputerDesktopIcon className='w-5 h-5 text-primary-500' />,
      title: "Pixel Perfwect",
      description: "Zet uw zakelijke visie om in tastbare sucessen met strategieën die ondernemerschap en resultaatgerichtheid combineren",
      readMoreLink: "#"
    },
    {
      icon: <ComputerDesktopIcon className='w-5 h-5 text-primary-500' />,
      title: "Veilig",
      description: "Zet uw zakelijke visie om in tastbare sucessen met strategieën die ondernemerschap en resultaatgerichtheid combineren",
      readMoreLink: "#"
    }
  ]
}


const VerticalLines = () => {

  return (
    <div className="absolute w-full h-full top-0 left-0 flex justify-center z-10" >
      <div style={{maxWidth: 1420}} className="relative h-full w-full flex items-center justify-center px-[12px] md:px-12  send-to-back">
        <div className={`h-full w-full border-l-[1px] border-r-[1px] border-gray-200 dark:border-[#320E79] -z-10  `}></div>
        <div className="md:block absolute h-full w-[1px] bg-gray-200 dark:bg-[#320E79] left-1/2 top-0 -z-10 hidden"></div>
      </div>
    </div>
  );
};
import React from 'react'
import { Metadata } from 'next'

// assets/ icons
import { PaarseGolf } from '../_assets'
import { ArrowRightIcon, BoltIcon, BuildingStorefrontIcon, CommandLineIcon, ComputerDesktopIcon, DocumentCheckIcon, DocumentMagnifyingGlassIcon, KeyIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { PanelTop } from 'lucide-react'
import { Bars3BottomLeftIcon } from '@heroicons/react/20/solid'
import GebruikersCardSvg from '../_assets/gebruikers-card-svg'
import BestellingenCardSvg from '../_assets/bestellingen-card-svg'

// styles
import container from '@/styles/styles'

// sections
import { VerticalLines } from '@/website/partials/vertical-lines'
import { Hero } from '../_components/hero'
// import { ServicePricing } from '@/website/sections/service-pricing'
import { Features } from '@/website/sections/features'
import StrategischAdvies from '@/website/sections/section-gesprek'

// components 
import Title from '@/components/ui/typography/title'
import { Heading, Paragraph, SubHeading } from '@/components/ui/typography/typography'
import { GridFullPageContainer } from '@/website/layouts/grid-full-page'
import { LinksRechtsImageContainer } from '@/website/layouts/links-rechts-image'
import { InternalAnchor } from '@/components/ui/link'


export const metadata: Metadata = {
  title: "SEO Optimalisatie | SEO Specialist | SEO Expert",
  description: "Hoger komen in Google? Ontdek hoe een SEO specialist jou kan helpen met een SEO optimalisatie traject. Laat ons je de kansen van SEO marketing tonen.",
  keywords: "SEO, Search Engine Optimization, SEO Expert, SEO Specialist, SEO Optimalisatie, SEO Campagne, SEO Bedrijf, SEO-Bedrijf, SEO Marketing, SEO Optimalisatie, SEO Traject, SEO Audit, SEO Strategie, SEO Content, SEO Research ",
}

const page = () => {
  return (
    <>
      <VerticalLines />

      <Hero DATA={HERO} titleStyles='max-w-[713px]'/>



      <section>
        {/* Container for svg  background*/}
        <div className='relative'>
          <PaarseGolf className="xl:absolute hidden xl:block top-1/2 -translate-y-[63%] -z-10 " />

          {/* Section 3.1 */}
          <div className={` ${container.sectionPadding}  ${container.maxWidthGutter}`}>
            {/* Content */}
            <LinksRechtsImageContainer image={SECTION31.image} imageSide="left" containerStyles="gap-20 lg:gap-5 ">
              <div className={`${container.extraPaddingMd}`}>
                <Title>
                  <SubHeading level='p' size="lg" colorScheme="text-primary-500">{SECTION31.content.subHeading}</SubHeading>
                  <Heading level='h3' size="5xl">{SECTION31.content.heading}</Heading>
                  <Paragraph>{SECTION31.content.paragraph}</Paragraph>
                </Title>

                {/* Cards */}
                <ul className='mt-5 grid lg:grid-cols-3 gap-6 lg:gap-3 mb-auto'>
                  {SECTION31.content.list.map((item) => (
                    <li key={item.heading}>
                      <div className='flex gap-[10px] items-center'>
                        {item.icon}
                        <Heading level='h4' size='base'>{item.heading}</Heading>
                      </div>
                      <Paragraph size="sm" className='mt-2'>{item.paragraph}</Paragraph>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cards in image */}
              <div className='inline-flex gap-12 -mt-[10%] justify-center'>
                <div className='max-w-[270px] w-full ml-6'>
                  <GebruikersCardSvg />
                </div>
                <div className='max-w-[270px] w-full mr-6'>
                  <BestellingenCardSvg />
                </div>
              </div>
            </LinksRechtsImageContainer>
          </div>

          {/* Section 3.2 */}
          <div className={` ${container.sectionPadding}  ${container.maxWidth}`}>
            <LinksRechtsImageContainer image={SECTION32.image} imageSide="right" containerStyles={container.sectionGutter} >
              <div className={`${container.extraPaddingMd}`}>
                <Title>
                  <SubHeading level='h2' size="lg" colorScheme="text-primary-500">{SECTION32.content.subHeading}</SubHeading>
                  <Heading level='h3' size="5xl">{SECTION32.content.heading}</Heading>
                  <Paragraph>{SECTION32.content.paragraph}</Paragraph>
                </Title>
                <InternalAnchor variant='text' size='sm' href="/#" className="text-primary-500 mt-6">
                  Lees Meer <ArrowRightIcon className="w-5 h-5" />
                </InternalAnchor>
              </div>
            </LinksRechtsImageContainer>

            {/* Cards */}
            <GridFullPageContainer containerStyles="mt-8 md:px-8 lg:px-16">
              {SECTION32.cards.map((card, i) => (
                <li key={i} className={`py-3 px-6 md:px-5 flex flex-col gap-2 ${i === 0 && ' border-l-2 border-primary-500'}`}>
                  {card.icon}
                  <Heading level='h4' size='base'>{card.heading}</Heading>
                  <Paragraph size="sm" className=''>{card.paragraph}</Paragraph>
                </li>
              ))}
            </GridFullPageContainer>
          </div>
        </div>


        {/* Section 3.3 */}
        <div className={` ${container.sectionPadding} ${container.maxWidthGutter}`}>
          <LinksRechtsImageContainer image={SECTION33.image} imageSide="left" >
            <Title className={`${container.extraPaddingMd}`}>
              <SubHeading level='h2' size="lg" colorScheme="text-primary-500">{SECTION33.content.subHeading}</SubHeading>
              <Heading level='h3' size="5xl">{SECTION33.content.heading}</Heading>
              <Paragraph>{SECTION33.content.paragraph}</Paragraph>
            </Title>
          </LinksRechtsImageContainer>
        </div>
      </section>

      <section>
        <Features DATA={FEATURES} />
      </section>

      <section>
        <StrategischAdvies />
      </section>

    </>
  )
}

export default page

const HERO = {
  subTitle: {
    icon: <ComputerDesktopIcon className="h-6 w-6 text-primary-500" />,
    heading: "Search Engine Optimization",
    description: "Hoe een online SEO-bureau jou kan helpen",
  },
  heading: "Hoger Komen in Google, hoe Werkt dat nou?",
  description:
    "Zoek je manieren om je online zichtbaarheid te vergroten en je bedrijfsresultaten te verbeteren? SEO (Zoekmachine optimalisatie) is de sleutel tot het bereiken van deze doelen. Maar wat houdt SEO precies in? Ontdek hoe wij als SEO experts jouw onderneming helpen transformeren.",
  button: [
    { text: "Neem contact op", variant: "glass" },
    { text: "Neem contact op", variant: "primary" },
  ],
  logo: [
    {
      src: "/logos/google.jpg",
      alt: "google logo",
      width: 137,
      height: 46,
    },
    {
      src: "/logos/facebook.jpg",
      alt: "facebook logo",
      width: 187,
      height: 76,
    },
    {
      src: "/logos/microsoft.jpg",
      alt: "microsoft logo",
      width: 190,
      height: 40,
    },
    {
      src: "/logos/bol.jpg",
      alt: "bol.com logo",
      width: 185,
      height: 70,
    },
  ],
};

const SECTION31 = {
  content: {
    subHeading: "SEO Expert",
    heading: "Wat doet een SEO Specialist en Hoe kan het jou Helpen?",
    paragraph:
      "In de digitale wereld van vandaag is zichtbaar zijn in zoekmachines meer dan een luxe; het is een noodzaak voor elke onderneming die succes wil behalen. Wij als  marketing bureau spelen hierin een cruciale rol door uw website te optimaliseren voor zoekmachines en hoger te komen in Google zoekresultaten.",
    list: [
      {
        icon: <DocumentCheckIcon className="w-5 h-5 text-primary-500" />,
        heading: "SEO Audit",
        paragraph: "Grondige analyse voor inzicht in uw online prestaties.",
      },
      {
        icon: <Bars3BottomLeftIcon className="w-5 h-5 text-primary-500" />,
        heading: "Content Creatie",
        paragraph: "Media die uw doelgroep en onderneming samenbrengt.",
      },
      {
        icon: <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary-500" />,
        heading: "Keyword Research",
        paragraph: "Onderzoek naar de best passende zoekwoorden.",
      },
    ],
  },
  image: {
    src: "/search-engine-optimization/seo-sectie-31-specialist-meeting-met-klant.jpg",
    alt: "blije mensen die een website laten maken",
    width: 1276,
    height: 863,
    className: 'w-full max-h-[440px] lg:max-h-auto'
  },
};

const SECTION32 = {
  content: {
    subHeading: "Snelle en Effectieve SEO Optimalisatie",
    heading: "De Bouwstenen van Effectieve SEO Campagne",
    paragraph:
      "Elk succesvol SEO-traject begint met een grondige audit van uw website. Dit legt de basis voor een op maat gemaakte SEO-strategie die zich richt op het verbeteren van zowel on-page als off-page, evenals technische SEO-aspecten. Cruciaal in dit proces is de ontwikkeling van SEO-vriendelijke content en strategisch keyword research. Deze elementen zijn essentieel voor het aantrekken van het juiste publiek en het verbeteren van uw websites rankings in zoekmachines.",
  },
  image: {
    src: "/search-engine-optimization/seo-sectie-32-bouwblokken.jpg",
    alt: "image alt",
    width: 1276,
    height: 861,
    className: "h-[430px] w-full"
  },
  cards: [
    {
      icon: <PanelTop className='w-5 h-5 text-primary-500 stroke-[1.5px]' />,
      heading: 'On-page SEO',
      paragraph: "Onze websites zijn geoptimaliseerd voor snelheid, met geavanceerde caching, efficiënte code, en de nieuwste technologieën die zorgen voor snellere laadtijden en een soepele gebruikerservaring.",
    },
    {
      icon: <CommandLineIcon className='w-5 h-5 text-primary-500' />,
      heading: 'Off-page SEO',
      paragraph: 'Wij optimaliseren jouw website met geavanceerde analytics en bieden naadloze integraties met diverse systemen en software, wat resulteert in verbeterde prestaties en gebruikerservaring.'
    }
  ]
};

const SECTION33 = {
  content: {
    subHeading: "Wij Regelen de Rest",
    heading: "Kiezen voor het Juiste SEO-Bedrijf",
    paragraph: "Bij ons marketingbureau begrijpen we de unieke uitdagingen waar kleine tot middelgrote bedrijven mee kampen en bieden maatwerk in zoekmachine optimalisatie om je te helpen hoger in Google te komen en uw bedrijf te laten groeien. \n \n Met onze expertise in SEO-optimalisatie en zoekmachine marketing, zijn we de partner die u nodig heeft om hoger in Google te komen en je bedrijf naar nieuwe hoogten te tillen.",
  },
  image: {
    src: "/search-engine-optimization/seo-sectie-33-google-search-console.jpg",
    alt: "blije mensen die een website laten maken",
    width: 1276,
    height: 861,
    className: "mx-auto"
  },
};

const FEATURES = {
  title: {
    icon: <BoltIcon className="h-5 w-5" />,
    subHeading: "Features",
    heading: "Alles Wat je Nodig Hebt Voor Online Groei",
    paragraph: "Ontdek de kracht van volledige digitale integratie met onze unieke aanpak. Wij bieden niet alleen websiteontwikkeling, maar een uitgebreid pakket aan services die uw online aanwezigheid versterken en toekomstbestendig maken.",
  },
  cards: [
    {
      icon: <DocumentMagnifyingGlassIcon />,
      heading: "Zoekwoordonderzoek en Strategie",
      paragraph: "Grondige analyse en identificatie van relevante zoekwoorden en termen die uw doelgroep gebruikt, om de online zichtbaarheid en vindbaarheid van uw website in zoekmachines te verbeteren."
    },
    {
      icon: <CommandLineIcon />,
      heading: "Technische SEO",
      paragraph: "Optimalisatie van de websiteinfrastructuur en -code om te voldoen aan de technische vereisten van zoekmachines, inclusief het verbeteren van de laadsnelheid en toegankelijkheid op mobiele apparaten."
    },
    {
      icon: <Bars3BottomLeftIcon />,
      heading: "Content Optimalisatie en Creatie",
      paragraph: "Ontwikkeling van hoogwaardige, zoekmachine-geoptimaliseerde content die waarde biedt aan uw doelgroep, terwijl het ook bijdraagt aan een betere ranking in zoekmachineresultaten."
    },
    {
      icon: <MapPinIcon />,
      heading: "Lokale SEO",
      paragraph: "Gerichte optimalisatie van uw online aanwezigheid om hoger te ranken in lokale zoekresultaten, essentieel voor bedrijven die een specifiek geografisch gebied bedienen."
    },
    {
      icon: <BuildingStorefrontIcon />,
      heading: "Google Mijn Bedrijf Optimalisatie",
      paragraph: "Optimalisatie gericht op lokale zoekresultaten om fysieke winkels effectief onder de aandacht te brengen bij jouw doelgroep."
    },
    {
      icon: <MagnifyingGlassIcon />,
      heading: "Verbetering en Analyse",
      paragraph: "Gebruikers optimalisatie om bezoekers langer vast te houden en conversies te verhogen. Inclusief gedetaieerde analyse en rapportage."
    }
  ]
}
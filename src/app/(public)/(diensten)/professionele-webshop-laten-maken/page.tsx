import React from 'react'
import Script from 'next/script'
import generateSchema from '@/website/schema/generate-schema'
import { Metadata } from 'next'

// assets/ icons
import { ArrowRightIcon, ArrowsPointingOutIcon, CheckBadgeIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, FingerPrintIcon, PuzzlePieceIcon, Square3Stack3DIcon } from '@heroicons/react/20/solid'
import { BoltIcon, BuildingStorefrontIcon, ChartBarIcon, ChatBubbleLeftEllipsisIcon, CreditCardIcon, IdentificationIcon, MegaphoneIcon, RocketLaunchIcon, SparklesIcon, Square3Stack3DIcon as Square3Stack3DIconOutline, StarIcon, TruckIcon } from '@heroicons/react/24/outline'
import { BarcodeIcon, LanguagesIcon } from 'lucide-react'
import { PaarseGolf } from '../_assets'
import KlantBetrokkenheidSVG from './_assets/klant-betrokkenheid-svg'
import GemiddeldeBestellingWaardeSVG from './_assets/gemidelde-bestelling-waarde-svg'
import BestellingenCardSvg from '../_assets/bestellingen-card-svg'
import GebruikersCardSvg from '../_assets/gebruikers-card-svg'

// styles
import container from '@/styles/styles'

// sections
import { VerticalLines } from '@/website/partials/vertical-lines'
import { Hero } from '../_components/hero'
import { ServicePricing } from '@/website/sections/service-pricing'
import { Features } from '@/website/sections/features'
import StrategischAdvies from '@/website/sections/section-gesprek'

// components 
import Title from '@/components/ui/typography/title'
import { Heading, Paragraph, SubHeading } from '@/components/ui/typography/typography'
import { GridFullPageContainer } from '@/website/layouts/grid-full-page'
import { LinksRechtsImageContainer } from '@/website/layouts/links-rechts-image'
import { InternalAnchor } from '@/components/ui/link'




const schemaData = {
  name: 'name',
  serviceType: 'servceType',
  description: 'description',
  seviceCategory: 'seviceCategory',
  serviceUrl: 'serviceUrl',
  // offers: [
  //   {
  //     name: 'name',
  //     description: 'description',
  //     sameAs: 'sameAs'
  //   },
  //   {
  //     name: 'name',
  //     description: 'description',
  //   },
  // ]
  serviceOutput: [
    'responsive webshop',
    'gebruikersvriendelijke webshop',
    'gepersonaliseerde webshop',
    'webshop met marketing- en promotietools',
    'webshop met analytics en rapportage',
    'webshop met betalingsverwerking en integraties'
  ]

}

export const metadata: Metadata = {
  title: 'Professionele Webshop Laten Maken | Webshop op Maat voor Jouw Succes',
  description: 'Boost je online verkoop met een op maat gemaakte webshop. Ontworpen voor jouw succes en groei. Start nu en onderscheid je van de concurrentie.',
  keywords: 'webshop laten maken, webshop op maat, professionele webshop laten maken, webshop laten bouwen, webshop laten maken prijs, webshop laten maken kosten, webshop laten maken prijslijst, webshop laten maken offerte',
}

const page = () => {

  const schema = generateSchema('Service', schemaData)

  return (
    <>
      <Script type="application/ld+json" id={`service-website`}>
        {JSON.stringify(schema)}
      </Script>

      <VerticalLines />

      <Hero DATA={HERO} />

      <GridFullPageContainer containerStyles={`${container.maxWidthGutterExtraPaddingMd} ${container.sectionPaddingTop} gap-8`}>
        {FIRST_USPS.map((item, i) => (
          <li key={i}>
            <div className="text-primary-500 w-12 h-12 p-3 rounded shadow-base bg-white ">
              {item.icon}
            </div>
            <Heading level='h3' size='xl' className="mt-6">{item.heading}</Heading>
            <Paragraph size="base" colorScheme='gray-500' className="mt-2">{item.paragraph}</Paragraph>
          </li>
        ))}
      </GridFullPageContainer>

      <section>
        {/* Container for svg  background*/}
        <div className='relative'>
          <PaarseGolf className="xl:absolute hidden xl:block top-1/2 -translate-y-[63%] -z-10 " />

          {/* Section 3.1 */}
          <div className={` ${container.sectionPadding}  ${container.maxWidthGutter} red-500`}>
            {/* Content */}
            <LinksRechtsImageContainer
              image={SECTION31.image}
              imageSide="left"
              containerStyles="gap-20 lg:gap-5"
            >
              <div className={`${container.extraPaddingMd} `}>
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
          <div className={`${container.sectionPadding}  ${container.maxWidth}`}>
            <LinksRechtsImageContainer
              image={SECTION32.image}
              imageSide="right"
              containerStyles={container.sectionGutter}
              contentContainerStyles='flex flex-col justify-end'
              imageContainerStyles='relative '
            >
              <div className={`${container.extraPaddingMd} `}>
                <Title>
                  <SubHeading level='h2' size="lg" colorScheme="text-primary-500">{SECTION32.content.subHeading}</SubHeading>
                  <Heading level='h3' size="5xl">{SECTION32.content.heading}</Heading>
                  <Paragraph>{SECTION32.content.paragraph}</Paragraph>
                </Title>
                <InternalAnchor variant='text' size='sm' href="/blog/webshop-personalisatie-klantenbinding-verkoop" className="text-primary-500 mt-6">
                  Lees Meer <ArrowRightIcon className="w-5 h-5" />
                </InternalAnchor>
              </div>

              {/* Cards in image */}
              <div className='absolute w-full top-1/3 flex flex-row gap-8 md:gap-12 justify-center '>
                <div className='w-[40%] max-w-[260px]'>
                  <KlantBetrokkenheidSVG />
                </div>
                <div className='w-[50%] max-w-[300px] mt-[75px]'>
                  <GemiddeldeBestellingWaardeSVG />
                </div>
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
        <ServicePricing DATA={PRICING} />
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
    heading: "Professionele Webshop Laten Maken",
    description: "Stijg uit boven je concurrentie",
  },
  heading: "Webshop op Maat voor Jouw Succes",
  description:
    "Boost je online verkoop met een op maat gemaakte webshop. Ontworpen voor jouw succes en groei. Start nu en onderscheid je van de concurrentie.",
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

const FIRST_USPS = [
  {
    icon: <MegaphoneIcon />,
    heading: "Marketing- en promotietools",
    paragraph: "Zet gepersonaliseerde marketingcampagnes op met geautomatiseerde e-mails, segmentatie, en loyalty programma's."
  },
  {
    icon: <ChartBarIcon />,
    heading: "Analytics en rapportage",
    paragraph: "Gedetailleerde analytics en rapportagemogelijkheden om inzicht te krijgen in klantgedrag, verkoopprestaties, en andere belangrijke metrics."
  },
  {
    icon: <CreditCardIcon />,
    heading: "Betalingsverwerking en Integraties",
    paragraph: "Vereenvoudig transacties met diverse betaalopties en integreer moeiteloos met je boekhoudsysteem."
  }
]

const SECTION31 = {
  content: {
    subHeading: "Maximale Conversie met Professioneel gebouwde webshop",
    heading: "Transformeer Bezoekers in Kopers met op maat Gebouwde Webshop",
    paragraph:
      " Veel ondernemers ervaren frustratie en verloren inkomsten door een verouderde en gebruiksonvriendelijke webshop. Dit kost niet alleen waardevolle verkoopkansen maar creëert ook een negatief merkimago. Met onze gebruiksvriendelijke en geoptimaliseerde webshops bieden wij een naadloze winkelervaring die bezoekers moeiteloos in klanten transformeert, je verkoop verhoogt en je merk versterkt.",
    list: [
      {
        icon: <ComputerDesktopIcon className="w-5 h-5 text-primary-500" />,
        heading: "Conversie Optimalisatie",
        paragraph: "Ontworpen om verkoop te maximaliseren.",
      },
      {
        icon: <FingerPrintIcon className="w-5 h-5 text-primary-500" />,
        heading: "Gebruikerservaring",
        paragraph: "Geoptimaliseerd voor gebruikers en conversie.",
      },
      {
        icon: <DevicePhoneMobileIcon className="w-5 h-5 text-primary-500" />,
        heading: "Responsive",
        paragraph: "Professionele website’s voor elk type schermformaat.",
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
    subHeading: "Gepersonaliseerde Klantbeleving",
    heading: "Exclusieve Ervaringen voor Jouw Klanten met Webwinkel Personalisatie",
    paragraph:
      "Het niet aanbieden van een gepersonaliseerde winkelervaring kan je klanten vervreemden en leiden tot een afname in loyaliteit en verkoop. Onze webshopoplossingen zijn gericht op het creëren van een diepe verbinding met je klanten door middel van gepersonaliseerde content, aanbevelingen en promoties, wat resulteert in een toename van klanttevredenheid en herhaalaankopen.",
  },
  image: {
    src: "/professionele-webshop-laten-maken/mobiel-mockup-met-fietswinkel.png",
    alt: "Infographic Webshop laten Maken Automatisering",
    width: 531,
    height: 1102,
    className: "h-[385px] md:h-[548px] w-fit mx-auto  shadow-custom-lg"
  },
  cards: [
    {
      icon: <IdentificationIcon className='w-5 h-5 text-primary-500' />,
      heading: 'Personalisatie en Klantsegmentatie',
      paragraph: "We benutten geavanceerde algoritmes voor het analyseren van surf- en koopgedrag, waardoor we elke klant een op maat gemaakte ervaring kunnen bieden met persoonlijke productaanbevelingen en promoties. Dit verhoogt de conversieratio's en klantloyaliteit aanzienlijk.",
    },
    {
      icon: <LanguagesIcon className='w-5 h-5 text-primary-500' />,
      heading: 'Meertalige Ondersteuning',
      paragraph: 'Onze webshops ondersteunen meerdere talen, wat ons in staat stelt om wereldwijd klanten te bereiken met cultureel relevante content. Automatische taaldetectie en de integratie van lokale betaalmethoden verbeteren de gebruikerservaring en conversiekansen.'
    }
  ]
};

const SECTION33 = {
  content: {
    subHeading: "Verhoog Efficiëntie & Verminder Werklast ",
    heading: "Webshop laten bouwen met Krachtige Automatisering & Integratie",
    paragraph: "Het beheren van een online winkel vereist een constante balans tussen klanttevredenheid, voorraadbeheer, marketing, en logistiek. Zonder de juiste tools kan dit een overweldigende hoeveelheid werk met zich meebrengen. Onze webshop oplossingen zijn speciaal ontwikkeld om deze uitdagingen aan te pakken door middel van geavanceerde automatisering en naadloze integraties.",
  },
  image: {
    src: "/professionele-webshop-laten-maken/webshop-automatisering-illustratie.jpg",
    alt: "blije mensen die een website laten maken",
    width: 1252,
    height: 995,
    className: "mx-auto",
    quality: 100,
  },
};

const PRICING = {
  mailtoLinks: {
    mailtoLinkButton: "mailto:info@massiveonlinemarketing.nl?subject=Webshop%20Laten%20Maken%20Offerte%20Aanvraag",
    mailtoLinkModule: "mailto:info@massiveonlinemarketing.nl?subject=Webshop%20Laten%20Maken%20Module%20Interesse",
  },
  title:
  {
    icon: <Square3Stack3DIcon className="h-6 w-6" />,
    subHeading: "Prijzenlijst",
    heading: "Op Maat Gemaakte Web Oplossingen",
    paragraph: "Zet uw zakelijke visie om in tastbare successen met strategieën die ondernemerschap en resultaatgerichtheid combineren",
  },
  cards: [
    {
      title: {
        icon: <RocketLaunchIcon className="h-6 w-6" />,
        heading: "Startende Webshop",
        paragraph: "Klaar om online te gaan?",
      },
      content: {
        price: "€4500,-",
        features: [
          "Tot 25 producten",
          "SSL & GDPR Certificaat t.w.v. €300",
          "Data Bescherming",
          "Basis SEO-Optimalizatie",
          "Laadtijd < 4 Seconden",
          "Passend op elk Schermformaat",
          "Standaard Layouts",
        ],
        modules: [
          "Contactformulier",
          "Cookies & Tracking",
          "Mobiel Responsief",
          "Custom Domain",
        ],
      }
    },
    {
      title: {
        icon: <SparklesIcon className="h-6 w-6" />,
        heading: "Webshop Premium",
        paragraph: "Klaar zijn om online te schalen?",
      },
      content: {
        price: "€10.500,-",
        features: [
          "Tot 100 producten",
          "SSL & GDPR Certificaat t.w.v. €300",
          "Data Bescherming",
          "Geavanceerde SEO-optimalisatie",
          "Laadtijd < 2,5 Seconden",
          "Passend op elk Schermformaat",
          "Geavanceerde Layouts",
          "Basis Analytics Setup",
          "Verbinding met Google Kanalen",
        ],
        modules: [
          "Contactformulier",
          "Cookies & Tracking",
          "Mobiel Responsief",
          "Custom Domain",
          "Social Media Integratie",
        ],
      }
    },
    {
      title: {
        icon: <Square3Stack3DIconOutline className="h-6 w-6" />,
        heading: "Webshop Maatwerk",
        paragraph: "Uw Zakelijke Ambieties worden Werkelijkheid",
      },
      content: {
        price: "€18.000,-",
        features: [
          "100+ producten",
          "SSL & GDPR Certificaat t.w.v. €300",
          "Data Bescherming",
          "Uitgebreide SEO-Optimalizatie",
          "Laadtijd < 1,5 Seconden",
          "Passend op elk Schermformaat",
          "Custom Layouts",
          "Uitgebreide Analytics Setup",
          "Verbinding met Google Kanalen",
          "Conversie Optimalisatie",
        ],
        modules: [
          "Contactformulier",
          "Cookies & Tracking",
          "Mobiel Responsief",
          "Custom Domain",
          "Social Media Integratie",
          "Klantsegmentatie + Lead Gen",
          "+200 API Integratie Mogelijkheden",
        ],
      }
    }
  ]
}
const FEATURES = {
  title: {
    icon: <BoltIcon className="h-5 w-5" />,
    subHeading: "Features",
    heading: "Duurzame Groei en Schaalbaar",
    paragraph: "In de dynamische wereld van e-commerce is het cruciaal om een stap voor te blijven. Onze geavanceerde webshopoplossingen zijn speciaal ontworpen om niet alleen aan de huidige behoeften van jouw bedrijf te voldoen, maar ook om toekomstige groei te ondersteunen.",
  },
  cards: [
    {
      icon: <ArrowsPointingOutIcon />,
      heading: "Duurzame Groei en Schaalbaar",
      paragraph: "We zijn niet alleen gericht op het maken van websites, maar ondersteunen ook de langetermijngroei en schaalbaarheid van je online aanwezigheid, zodat jouw bedrijf kan blijven groeien en ontwikkelen."
    },
    {
      icon: <CheckBadgeIcon />,
      heading: "Online en offline winkelintegratie",
      paragraph: "Makkelijk alles in een systeem. Verbind je huidige winkel met onze POS systemen voor een naadloze verbinding tussen online en offline verkooppunten."
    },
    {
      icon: <CreditCardIcon />,
      heading: "Naadloze Betalingen",
      paragraph: "Ondersteuning voor meerdere betalingsmethoden en -gateways, zodat klanten gemakkelijk kunnen betalen met hun voorkeursbetaalmethode."
    },
    {
      icon: <PuzzlePieceIcon />,
      heading: "Aanpasbaarheid",
      paragraph: "Uitgebreide aanpassingsopties om de look en feel van de webshop aan te passen aan de merkidentiteit, inclusief aanpasbare thema's en de mogelijkheid om eigen code toe te voegen."
    },
    {
      icon: <TruckIcon />,
      heading: "Logistieke Synchronisatie",
      paragraph: "Stroomlijn je verzendproces met automatische berekeningen, trackinginformatie, en eenvoudige retouren."
    },
    {
      icon: <BarcodeIcon />,
      heading: "Productmanagement",
      paragraph: "Geavanceerde mogelijkheden voor productbeheer, inclusief voorraadbeheer, productvarianten, en dynamische prijsstelling."
    },
    {
      icon: <ChatBubbleLeftEllipsisIcon />,
      heading: "Klantenservice Tools",
      paragraph: "Een live chat voor onmiddellijke hulp tot geautomatiseerde ticketing voor complexere vragen, zorg je voor een vlotte en responsieve klantenservice ervaring."
    },
    {
      icon: <BuildingStorefrontIcon />,
      heading: "Verbinding met Marktplaatsen",
      paragraph: "Met onze geïntegreerde aanpak kun je moeiteloos meerdere verkoopkanalen beheren. Hierdoor verbreed je je bereik wat leidt tot verhoogde verkoopkansen."
    },
    {
      icon: <StarIcon />,
      heading: "Beoordelingen en Ratings",
      paragraph: "Positieve klantbeoordelingen zijn goud waard. Verzamel feedback van klanten met onze geïntegreerde reviewfuncties."
    }
  ]
}
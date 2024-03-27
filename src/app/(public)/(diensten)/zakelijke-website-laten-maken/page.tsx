import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'

// assets/ icons
import { ArrowRightIcon, ArrowsPointingOutIcon, CheckBadgeIcon, ComputerDesktopIcon, CpuChipIcon, DevicePhoneMobileIcon, FingerPrintIcon, FunnelIcon, LinkIcon, LockClosedIcon, PhotoIcon, RocketLaunchIcon, Square3Stack3DIcon, CursorArrowRaysIcon } from '@heroicons/react/20/solid'
import { BoltIcon, SparklesIcon, Square3Stack3DIcon as Square3Stack3DIconOutline } from '@heroicons/react/24/outline'
import GebruikersCardSvg from '../_assets/gebruikers-card-svg'
import BestellingenCardSvg from '../_assets/bestellingen-card-svg'

// styles
import container, { styles } from '@/styles/styles'

// sections
import { VerticalLines } from '@/website/partials/vertical-lines'
import { Hero } from '../_components/hero'
import { ServicePricing, ServicePricingProps } from '@/website/sections/service-pricing'
import { Features } from '@/website/sections/features'
import StrategischAdvies from '@/website/sections/section-gesprek'

// components 
import Title from '@/components/ui/typography/title'
import { Heading, Paragraph, SubHeading } from '@/components/ui/typography/typography'
import { GridFullPageContainer } from '@/website/layouts/grid-full-page'
import { LinksRechtsImageContainer } from '@/website/layouts/links-rechts-image'
import { InternalAnchor } from '@/components/ui/link'
import { PaarseGolf } from '../_assets'
import { cn } from '@/lib/utils'
import { HogerInGoogleSvg } from './_assets/HogerInGoogleSvg'
import { VerhoogdeCROSvg } from './_assets/VerhoogdeCROSvg'
import { LinksRechtsContainer } from '@/website/layouts/links-rechts'
import { GridHalvePageContainer } from '@/website/layouts/grid-halve-page'


export const metadata: Metadata = {
    title: "Zakelijke Website Laten Maken | Wij Ontwikkelen Websites",
    description: "Wij ontwikkelen professionele websites die aansluiten bij jouw bedrijfsmodel, die verkeer genereren en de resultaten opleveren die jij zoekt.",
    keywords: "Zakelijke website laten maken, website laten maken, website ontwikkeling, webdesign, webontwikkeling, webdesign bureau",
}

const page = () => {
    return (
        <>
            <VerticalLines />

            <Hero DATA={HERO} />

            <section className={`${container.sectionPadding}`}>
                <div className={`${container.maxWidthGutter}`}>
                    <LinksRechtsImageContainer image={SECTION4.image} imageSide='right'>
                        <div>
                            <Title>
                                <SubHeading level='p' size='lg' colorScheme='text-primary-500'>{SECTION4.content.subHeading}</SubHeading>
                                <Heading level='h3' size='5xl'>{SECTION4.content.heading}</Heading>
                                <Paragraph>{SECTION4.content.paragraph}</Paragraph>
                            </Title>
                        </div>
                    </LinksRechtsImageContainer>
                </div>
                <GridFullPageContainer containerStyles={`${container.maxWidthGutter} mt-10 gap-2`}>
                    {SECTION4.cards.map((item, i) => (
                        <li key={i}>
                            <div className="text-primary-500 w-12 h-12 p-3 rounded shadow-base bg-white ">
                                {item.icon}
                            </div>
                            <Heading level='h3' size='xl' className="mt-2">{item.heading}</Heading>
                            <Paragraph size="base" colorScheme='gray-500' className="mt-2">{item.paragraph}</Paragraph>
                        </li>
                    ))}
                </GridFullPageContainer>

            </section>

            <section className={`dark:bg-gray-1100 ${container.sectionPaddingBottom}`}>
                {/*  Container */}
                <div className={`${container.maxWidthGutter} ${container.sectionPaddingTop} dark:border-y border-[#320E79] relative z-20 dark:bg-gray-1100`}>
                    <Title className='max-w-[1000px] mx-auto text-center items-center'>
                        <SubHeading level='p' size='lg' colorScheme='text-primary-500'>{layout2.title.subHeading}</SubHeading>
                        <Heading level='h3' size='4xl'>{layout2.title.heading}</Heading>
                        <Paragraph size='base'>{layout2.title.paragraph}</Paragraph>
                    </Title>
                    <div className='mx-auto max-w-[576px] mt-10'>
                        <HogerInGoogleSvg />
                    </div>
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
                            {/* <InternalAnchor variant='text' href={card.readMoreLink}>Lees meer <ArrowRightIcon className='w-5 h-5' /></InternalAnchor> */}
                        </div>
                    ))}
                </GridFullPageContainer>
            </section>

            <section>
                {/* Section 3.2 */}
                <div className={` ${container.sectionPadding}  ${container.maxWidth}`}>
                    <LinksRechtsImageContainer image={SECTION32.image} imageSide="left" containerStyles={container.sectionGutter} >
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
            </section>

            <section>
                {/* Section 3.3 */}
                <div className={` ${container.sectionPadding}  ${container.maxWidth}`}>
                    <LinksRechtsImageContainer image={SECTION33.image} imageSide="right" containerStyles={container.sectionGutter} >
                        <div className={`${container.extraPaddingMd}`}>
                            <Title>
                                <SubHeading level='h2' size="lg" colorScheme="text-primary-500">{SECTION33.content.subHeading}</SubHeading>
                                <Heading level='h3' size="5xl">{SECTION33.content.heading}</Heading>
                                <Paragraph>{SECTION33.content.paragraph}</Paragraph>
                            </Title>
                            <InternalAnchor variant='text' size='sm' href="/blog/wordpress-vs-maatwerk-cms-keuze" className="text-primary-500 mt-6">
                                Lees Meer <ArrowRightIcon className="w-5 h-5" />
                            </InternalAnchor>
                        </div>

                        {/* Cards in image */}
                        <div className=' inline-flex flex-auto justify-center  -mt-[18%]'>
                            <Image src="/zakelijke-website-laten-maken/omzet-deze-maand-kaart.jpg" alt="omzet deze maand" width={884} height={298} className='shadow-custom-lg md:max-w-[440px] rounded-lg' />
                            {/* <OmzetDezeMaand className='shadow-custom-lg max-w-[440px] rounded-lg'/> */}
                        </div>
                    </LinksRechtsImageContainer>

                    {/* Cards */}
                    <GridFullPageContainer containerStyles={`mt-8 gap-6 ${container.maxWidthGutter}`}>
                        {SECTION33.cards.map((card, i) => (
                            <li key={i} className={`py-3 px-[12px] md:py-6 flex flex-col gap-2 ${i === 0 && 'border-primary-500 border-t-2'}`}>
                                {card.icon}
                                <Heading level='h4' size='base'>{card.heading}</Heading>
                                <Paragraph size="sm" className=''>{card.paragraph}</Paragraph>
                            </li>
                        ))}
                    </GridFullPageContainer>
                </div>
            </section>

            <section className={`${container.sectionPadding}`}>
                <div className={`${container.maxWidthGutter}`}>
                    <Title className='max-w-[1000px]'>
                        <SubHeading level='p' size='lg' colorScheme='text-primary-500'>{SECTION5.content.subHeading}</SubHeading>
                        <Heading level='h3' size='5xl'>{SECTION5.content.heading}</Heading>
                        <Paragraph>{SECTION5.content.paragraph}</Paragraph>
                    </Title>
                    <LinksRechtsImageContainer image={SECTION5.image} imageSide='left'>
                        <div>
                            <ul>
                                {SECTION5.cards.map((card, i) => (
                                    <li key={i} className='flex gap-4 items-center mt-6'>
                                        <div>
                                            <Heading level='h4' size='base'>{card.heading}</Heading>
                                            <Paragraph size='base'>{card.paragraph}</Paragraph>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </LinksRechtsImageContainer>
                </div>
            </section>

            <section className={`${container.sectionPadding}`}>
                <div className={`${container.maxWidthGutter}`}>
                    <LinksRechtsContainer secondContainerSide='left' firstContainerStyles=' my-auto' >
                        <VerhoogdeCROSvg />
                        <div>
                            <Title>
                                <SubHeading level='p' size='lg' colorScheme='text-primary-500'>{SECTION6.content.subHeading}</SubHeading>
                                <Heading level='h3' size='5xl'>{SECTION6.content.heading}</Heading>
                                <Paragraph>{SECTION6.content.paragraph}</Paragraph>
                            </Title>
                            <GridHalvePageContainer containerStyles='mt-5'>
                                {SECTION6.cards.map((card, i) => (
                                    <li key={card.heading}>
                                        <div className='flex gap-[10px] items-center'>
                                            {card.icon}
                                            <Heading level='h4' size='base'>{card.heading}</Heading>
                                        </div>
                                        <Paragraph size="sm" className='mt-2'>{card.paragraph}</Paragraph>
                                    </li>
                                ))}
                            </GridHalvePageContainer>
                        </div>
                    </LinksRechtsContainer>
                </div>
            </section>

            <section className={`${container.sectionPadding}`}>
                <div className={`${container.maxWidthGutter}`}>
                    <Title className='max-w-[900px] mx-auto items-center text-center'>
                        <SubHeading level='p' size='lg' colorScheme='text-primary-500'>{TESTEMONIALS.title.subHeading}</SubHeading>
                        <Heading level='h3' size='5xl'>{TESTEMONIALS.title.heading}</Heading>
                        <Paragraph>{TESTEMONIALS.title.paragraph}</Paragraph>
                    </Title>
                </div>
                <GridFullPageContainer containerStyles='mt-10 gap-6'>
                    {TESTEMONIALS.cards.map((card, i) => (
                        <li key={i} className='p-8 bg-white shadow-base rounded-lg'>
                            <Paragraph size='base' colorScheme='gray-800'>{card.paragraph}</Paragraph>
                            <div className='mt-6 flex flex-row gap-3 items-center'>
                                <div className='w-16 h-16 bg-gray-500 rounded-full'></div>
                                <div>
                                    <Paragraph size='base' colorScheme='gray-800' className='font-semibold'>{card.name}</Paragraph>
                                    <Paragraph size='base' colorScheme='gray-600'>{card.position}</Paragraph>
                                </div>
                            </div>
                        </li>
                    ))}
                </GridFullPageContainer>
            </section>

            <section className={`${container.sectionPadding}`}>
                <div className={`${container.maxWidthGutter}`}>
                    <Title>
                        <Heading level='h3' size='5xl'>{PROCESS.title.heading}</Heading>
                    </Title>
                    <GridFullPageContainer containerStyles='gap-6' columns={2}>
                        {PROCESS.stappen.map((card, i) => (
                            <li key={i} className='p-8 bg-white shadow-base rounded-lg'>
                                <SubHeading level='h4' size='base'>{card.subHeading}</SubHeading>
                                <Heading level='h4' size='base'>{card.heading}</Heading>
                                <Paragraph size='base'>{card.paragraph}</Paragraph>
                            </li>
                        ))}
                    </GridFullPageContainer>
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
        heading: "Zakelijke Website Laten Maken",
        description: "Stijg uit boven je concurrentie",
    },
    heading: "Websites op Maat voor Jouw Succes",
    description:
        "Websites die aansluiten bij jouw bedrijfsmodel, die verkeer genereren en de resultaten opleveren die jij zoekt.",
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
        subHeading: "Professionele Website",
        heading: "Professionele Website Laten Maken met Duidelijke Boodschap",
        paragraph:
            " Een niet onderhouden website leidt tot lage conversieratio's en verloren kansen, waardoor klanten worden afgeschrikt en jouw bedrijf niet opvalt. Kies voor een website die klanten aantrekt en jouw bedrijf onderscheidt.\n \n Onze deskundige webontwikkeling en optimalisatiediensten zorgen ervoor dat je website klaar is voor de toekomst.",
        list: [
            {
                icon: <ComputerDesktopIcon className="w-5 h-5 text-primary-500" />,
                heading: "Webdesign",
                paragraph: "Uniek ontwerp om uw merk perfect te weerspiegelen.",
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
        height: 861,
        className: 'w-full max-h-[440px] lg:max-h-auto '
    },
};

const SECTION32 = {
    content: {
        subHeading: "Snelle, veilige en betrouwbare websites",
        heading: "Breek vrij van WordPress en andere CMS-beperkingen",
        paragraph:
            "De trage prestaties en veiligheidsrisico’s van WordPress zijn verleden tijd met onze op maat gemaakte website oplossingen. Vermijden deze veel voorkomende valkuilen en bieden superieure functionaliteit en prestaties. Wij leveren oplossingen die uw site veilig, snel, betrouwbaar en vooral schaalbaar maken. Hierdoor kun je jouw online aanwezigheid versterken en meer klanten aantrekken in de toekomst.",
    },
    image: {
        src: "/zakelijke-website-laten-maken/sectie-32-cms-beperkingen-code.jpg",
        alt: "image alt",
        width: 1276,
        height: 861,
        className: "h-[430px] w-full"
    },
    cards: [
        {
            icon: <RocketLaunchIcon className='w-5 h-5 text-primary-500' />,
            heading: 'Supersnelle website < 2 Sec',
            paragraph: 'Onze websites zijn geoptimaliseerd voor snelheid, met geavanceerde caching, efficiënte code, en de nieuwste technologieën die zorgen voor snellere laadtijden en een soepele gebruikerservaring.'
        },
        {
            icon: <CpuChipIcon className='w-5 h-5 text-primary-500' />,
            heading: 'Data gedreven website & intergratie mogelijkheden',
            paragraph: 'Wij optimaliseren jouw website met geavanceerde analytics en bieden naadloze integraties met diverse systemen en software, wat resulteert in verbeterde prestaties en gebruikerservaring.'
        }
    ]
};

const SECTION33 = {
    content: {
        subHeading: "Uw Sleutel tot een Betrouwbaar Merkimago",
        heading: "Versterk Klantvertrouwen met een Krachtige Website",
        paragraph:
            "Het niet effectief overbrengen van uw merkidentiteit en boodschap op uw website kan leiden tot een aanzienlijk verlies van klantvertrouwen. Dit is niet alleen een gemiste kans, maar kan ook resulteren in meetbare kosten voor uw bedrijf, zoals een verminderde gemiddelde orderwaarde en klantloyaliteit.",
    },
    image: {
        src: "/zakelijke-website-laten-maken/zakelijke-website-laten-maken-meeting-klant-Copy.jpg",
        alt: "Meeting Zakelijke Website Laten Maken",
        width: 1229,
        height: 861,
        className: "h-[430px] w-full"
    },
    cards: [
        {
            icon: <CursorArrowRaysIcon className='w-5 h-5 text-primary-500' />,
            heading: 'Verhoogde Orderwaarde met SEO',
            paragraph: 'Onze websites scoren technisch hoog in Google door een combinatie van SEO en overtuigende presentatie. Dit trekt niet alleen meer bezoekers, maar ook betrokken leads die sneller tot aankoop overgaan. De kracht ligt in de synergie tussen wat u vertelt en hoe u het presenteert.'
        },
        {
            icon: <ComputerDesktopIcon className='w-5 h-5 text-primary-500' />,
            heading: 'Langdurige Klantrelaties',
            paragraph: 'Naast de inhoudelijke boodschap draagt een professioneel ogende en gebruiksvriendelijke website bij aan een positieve gebruikerservaring.  Klanten zijn bereid meer te betalen voor merken die kwaliteit en professionaliteit uitstralen in hun online presentatie.'
        }
    ]
};


const PRICING: ServicePricingProps = {
    mailtoLinks: {
        mailtoLinkButton: "mailto:info@massiveonlinemarketing.nl?subject=Website%20Laten%20Maken%20Offerte%20Aanvraag",
        mailtoLinkModule: "mailto:info@massiveonlinemarketing.nl?subject=Website%20Laten%20Maken%20Module%20Interesse"
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
                heading: "Website Snel Online",
                paragraph: "Binnen twee weken online? Dat kan!",
            },
            content: {
                price: "€1500,-",
                features: [
                    "Inc. 6 Pagina's",
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
                heading: "Website Premium",
                paragraph: "Klaar zijn om online te schalen?",
            },
            content: {
                price: "€3500,-",
                features: [
                    "Extra Pagina + €300",
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
                heading: "Website Maatwerk",
                paragraph: "Uw Zakelijke Ambieties worden Werkelijkheid",
            },
            content: {
                price: "€10.000,-",
                features: [
                    "Extra Pagina + €250",
                    "SSL & GDPR Certificaat t.w.v. €300",
                    "Data Bescherming",
                    "Uitgebreide SEO-Optimalizatie",
                    "Laadtijd < 1,5 Seconden",
                    "Passend op elk Schermformaat",
                    "Custom Layouts",
                    "Uitgebreide Analytics Setup",
                    "Verbinding met Google Kanalen",
                    "Conversie Optimalizatie",
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
        heading: "Alles Wat je Nodig Hebt Voor Online Groei",
        paragraph: "Ontdek de kracht van volledige digitale integratie met onze unieke aanpak. Wij bieden niet alleen websiteontwikkeling, maar een uitgebreid pakket aan services die uw online aanwezigheid versterken en toekomstbestendig maken.",
    },
    cards: [
        {
            icon: <ArrowsPointingOutIcon />,
            heading: "Duurzame groei en schaalbaarheid",
            paragraph: "We zijn niet alleen gericht op het maken van websites, maar ondersteunen ook de langetermijngroei en schaalbaarheid van je online aanwezigheid, zodat jouw bedrijf kan blijven groeien en ontwikkelen."
        },
        {
            icon: <CheckBadgeIcon />,
            heading: "Social Media Integratie",
            paragraph: "Als je je bereik wilt vergroten, bieden wij ook social media advertising aan. Hierbij zetten wij advertentiecampagnes op die naadloos integreren met jouw website voor een omnichannel-ervaring."
        },
        {
            icon: <FunnelIcon />,
            heading: "Analyse en Continue Verbetering",
            paragraph: "Met onze expertise in website analytics, bieden wij inzichten die je helpen jouw online prestaties te begrijpen. We staan klaar om jou te ondersteunen en jouw digitale strategieën te verfijnen en verbeteren."
        },
        {
            icon: <LinkIcon />,
            heading: "+200 Integratiemogelijkheden",
            paragraph: "Bij het ontwikkelen van jouw website bieden wij meer dan 200 integratiemogelijkheden zonder dat uw website traag wordt."
        },
        {
            icon: <LockClosedIcon />,
            heading: "SSL & GDPR Gecertificeerd",
            paragraph: "Wij zorgen ervoor dat alle websites die wij ontwikkelen uitgerust zijn met SSL certificaten en GDPR complient zijn."
        },
        {
            icon: <PhotoIcon />,
            heading: "Bewerking en postproductie",
            paragraph: "In een wereld waar visuele content regeert, bieden wij professionele fotografie- en videodiensten aan om jouw merkverhaal op je nieuwe website te versterken"
        },
    ]
}


const layout2 = {
    title: {
        subHeading: "Slecht vindbaar online?",
        heading: "Word zichtbaar in zoekmachines en trek nieuwe klanten aan met een nieuwe website",
        paragraph: "Een slechte vindbaarheid in zoekmachines is alsof u een winkel heeft in een verlaten steegje; potentiële klanten weten niet dat u er bent. Dit beperkt uw groeikansen en resulteert in gemiste verkoop. Door gericht SEO toe te passen tijdens het ontwikkelen van je nieuwe website, maken we jouw website zichtbaar. Dit vergroot uw bereik en biedt nieuwe groeimogelijkheden in een competitieve markt"
    },
    cards: [
        {
            icon: <ComputerDesktopIcon className='w-5 h-5 text-primary-500' />,
            title: "SEO Implementatie",
            description: "Door SEO-best practices te integreren tijdens het ontwikkelen van de nieuwe website, kunnen we ervoor zorgen dat deze optimaal geoptimaliseerd is voor zoekmachines. Dit omvat het gebruik van relevante zoekwoorden, het optimaliseren van metadata, het verbeteren van de laadsnelheid, het creëren van kwalitatieve inhoud",
            readMoreLink: "#"
        },
        {
            icon: <ComputerDesktopIcon className='w-5 h-5 text-primary-500' />,
            title: "Lokaal vindbaar",
            description: "Voor lokale bedrijven is lokale vindbaarheid essentieel. Met een nieuwe website geoptimaliseerd voor lokale zoekresultaten, zorgen we ervoor dat uw bedrijf gemakkelijk gevonden wordt. We gebruiken lokale zoekwoorden, optimaliseren Google Mijn Bedrijf-vermeldingen, verkrijgen positieve recensies en integreren geografische informatie op uw site.",
            readMoreLink: "#"
        }
    ]
}

const SECTION4 = {

    image: {
        src: "/test/modern-website-1.jpg",
        alt: "omzet deze maand",
        width: 1000,
        height: 600
    },
    content: {
        subHeading: "Vernieuwen van Website Design",
        heading: "Maak een sterke eerste indruk met een modern websiteontwerp",
        paragraph: "Een verouderd of onprofessioneel websiteontwerp kan potentiële klanten afschrikken en schaden aan uw merkimago. Een fris en modern ontwerp kan daarentegen een positieve eerste indruk creëren en bezoekers langer op uw site houden. Wij kunnen uw website een complete make-over geven met een responsive, gebruiksvriendelijk en visueel aantrekkelijk ontwerp dat uw merkwaarden uitstraalt."
    },
    cards: [
        {
            icon: <ComputerDesktopIcon />,
            heading: "Professioneel Webdesign",
            paragraph: "Een uniek ontwerp dat uw merk perfect weerspiegelt en uw bedrijf onderscheidt van de concurrentie.",
        },
        {
            icon: <FingerPrintIcon />,
            heading: "Gebruikerservaring",
            paragraph: "Een geoptimaliseerde gebruikerservaring die de conversie verhoogt en bezoekers aanzet tot actie.",
        },
        {
            icon: <DevicePhoneMobileIcon />,
            heading: "Responsive Design",
            paragraph: "Een professioneel ontwerp dat er geweldig uitziet op elk apparaat en schermformaat.",
        }
    ]
}

const SECTION5 = {
    image: {
        src: "/test/Untitled.png",
        alt: "omzet deze maand",
        width: 600,
        height: 650
    },
    content: {
        subHeading: 'Gebruiksvriendelijkheid',
        heading: 'Zorg voor een soepele gebruikerservaring en houd bezoekers betrokken',
        paragraph: 'Een slechte gebruikerservaring kan bezoekers frustreren en ervoor zorgen dat ze uw site verlaten zonder actie te ondernemen. Een goed ontworpen en gebruiksvriendelijke website zorgt ervoor dat bezoekers gemakkelijk kunnen navigeren, informatie kunnen vinden en actie kunnen ondernemen. Wij kunnen uw website optimaliseren voor een soepele gebruikerservaring en hogere conversiepercentages.'
    },
    cards: [
        {
            icon: <ComputerDesktopIcon />,
            heading: "Intuïtieve Navigatie",
            paragraph: "Een duidelijke en intuïtieve navigatiestructuur die bezoekers helpt snel en gemakkelijk te vinden wat ze zoeken.",
        },
        {
            icon: <FingerPrintIcon />,
            heading: "Gebruiksvriendelijk Ontwerp",
            paragraph: "Een gebruiksvriendelijk ontwerp dat de interactie met uw website vereenvoudigt en de betrokkenheid van bezoekers vergroot.",
        },
        {
            icon: <DevicePhoneMobileIcon />,
            heading: "Toegankelijkheid",
            paragraph: "Een toegankelijk ontwerp dat voldoet aan de WCAG-richtlijnen en ervoor zorgt dat uw website voor iedereen bruikbaar is.",
        }
    ]
}

const SECTION6 = {
    content: {
        subHeading: "Verhoogde Conversie",
        heading: "Verhoog de conversie en genereer meer leads en verkopen",
        paragraph: "Een hoge conversieratio is essentieel voor het succes van uw website. Of het nu gaat om het genereren van leads, het stimuleren van verkopen of het vergroten van de betrokkenheid, een effectieve conversiestrategie kan uw bedrijf naar nieuwe hoogten brengen. Wij kunnen uw website optimaliseren voor maximale conversie en resultaten."
    },
    cards: [
        {
            icon: <CursorArrowRaysIcon className='w-5 h-5 text-primary-500' />,
            heading: "Landingspagina's",
            paragraph: "Geoptimaliseerde landingspagina's die bezoekers aantrekken en aanzetten tot actie.",
        },
        {
            icon: <CursorArrowRaysIcon className='w-5 h-5 text-primary-500' />,
            heading: "A/B-Testen",
            paragraph: "A/B-testen om de effectiviteit van uw website te meten en te optimaliseren voor maximale conversie.",
        },
        {
            icon: <CursorArrowRaysIcon className='w-5 h-5 text-primary-500' />,
            heading: "Conversie Tracking",
            paragraph: "Geavanceerde conversietracking om de prestaties van uw website te meten en te verbeteren.",
        }
    ]
}

const TESTEMONIALS = {
    title: {
        subHeading: "Wat Onze Klanten Zeggen",
        heading: "Nog niet overtuigd? Lees wat onze klanten te zeggen hebben.",
        paragraph: "Onze klanten zijn onze grootste supporters. Ontdek wat ze te zeggen hebben over hun ervaring met ons bedrijf en hoe onze producten en diensten hun bedrijf hebben geholpen groeien en gedijen."
    },
    cards: [
        {
            paragraph: 'Ze ontwikkelden op maat gemaakte producten die perfect aansluiten bij mijn merk en doelgroep. De resultaten spreken voor zich - meer verkeer, meer leads en uiteindelijk meer omzet. Een echte gamechanger!',
            name: 'Tom Jones',
            position: 'E-Commerce Strijder',
            image: {
                src: '',
                alt: '',
            }
        }, {
            paragraph: 'Ze ontwikkelden op maat gemaakte producten die perfect aansluiten bij mijn merk en doelgroep. De resultaten spreken voor zich - meer verkeer, meer leads en uiteindelijk meer omzet. Een echte gamechanger!',
            name: 'Tom Jones',
            position: 'E-Commerce Strijder',
            image: {
                src: '',
                alt: '',
            }
        }, {
            paragraph: 'Ze ontwikkelden op maat gemaakte producten die perfect aansluiten bij mijn merk en doelgroep. De resultaten spreken voor zich - meer verkeer, meer leads en uiteindelijk meer omzet. Een echte gamechanger!',
            name: 'Tom Jones',
            position: 'E-Commerce Strijder',
            image: {
                src: '',
                alt: '',
            }
        }
    ]
}

const PROCESS = {
    title: {
        heading: "Onze eenvoudige workflow om jouw website droom waar te maken",
    },
    stappen: [
        {
            subHeading: "Stap 1",
            heading: "Overleg met de klant",
            paragraph: "We beginnen met een grondige analyse van jouw bedrijf, doelstellingen en doelgroep om een duidelijk beeld te krijgen van wat je wilt bereiken met jouw nieuwe website.",
        },
        {
            subHeading: "Stap 2",
            heading: "Strategie Ontwikkeling",
            paragraph: "Op basis van de informatie die we hebben verzameld, ontwikkelen we een strategie die aansluit bij jouw bedrijfsdoelstellingen en de behoeften van jouw doelgroep. We werken nauw samen met jou om ervoor te zorgen dat de website voldoet aan jouw verwachtingen en doelstellingen.",
        },
        {
            subHeading: "Stap 3",
            heading: "Uitvoering en optimalisatie",
            paragraph: "Na goedkeuring van het ontwerp en de strategie, gaan we aan de slag met de ontwikkeling van de website. We zorgen ervoor dat de website voldoet aan de hoogste normen op het gebied van design, functionaliteit en gebruiksvriendelijkheid. We voeren uitgebreide tests uit om ervoor te zorgen dat de website goed werkt op alle apparaten en browsers.",
        },
        {
            subHeading: "Stap 4",
            heading: "Meten en evaluatie",
            paragraph: "Na de lancering van jouw nieuwe website blijven we werken aan het optimaliseren van de prestaties en het verbeteren van de gebruikerservaring om ervoor te zorgen dat jouw website blijft groeien en bloeien.",
        }
    ]
}
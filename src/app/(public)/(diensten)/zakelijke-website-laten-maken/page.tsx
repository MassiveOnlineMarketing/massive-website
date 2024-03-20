import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'

// assets/ icons
import { ArrowRightIcon, ArrowsPointingOutIcon, CheckBadgeIcon, ComputerDesktopIcon, CpuChipIcon, DevicePhoneMobileIcon, FingerPrintIcon, FunnelIcon, LinkIcon, LockClosedIcon, PhotoIcon, RocketLaunchIcon, Square3Stack3DIcon, CursorArrowRaysIcon } from '@heroicons/react/20/solid'
import { BoltIcon, SparklesIcon, Square3Stack3DIcon as Square3Stack3DIconOutline } from '@heroicons/react/24/outline'
import GebruikersCardSvg from '../_assets/gebruikers-card-svg'
import BestellingenCardSvg from '../_assets/bestellingen-card-svg'

// styles
import container from '@/styles/styles'

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
import { Button } from '@/components/ui/button'
import Title from '@/components/ui/typography/title'
import { Heading, Paragraph, SubHeading } from '@/components/ui/typography/typography'
import container from '@/styles/styles'
import { GridFullPageContainer } from '@/website/layouts/grid-full-page'
import { LinksRechtsImageContainer } from '@/website/layouts/links-rechts-image'
import { Bars2Icon } from '@heroicons/react/20/solid'
import { ArrowTrendingUpIcon, CalendarDaysIcon, Cog6ToothIcon, DocumentChartBarIcon, DocumentMagnifyingGlassIcon, FunnelIcon, MagnifyingGlassCircleIcon, PresentationChartLineIcon, TagIcon } from '@heroicons/react/24/outline'
import { ShieldEllipsisIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <>
      <div className={`${container.maxWidthGutter} ${container.sectionPadding} flex flex-row gap-5 justify-between`}>
        <div className='flex-1 min-w-fit min-h-full flex items-center'>
          <div className=' max-w-[650px] h-fit flex flex-col gap-2'>
            <Heading level='h1' size='7xl'>Boost jouw zichtbaarheid in de zoekmachines</Heading>
            <Paragraph>Track je zoekwoorden, analyseer concurenten en optimaliseer jouw campanges moeiteloos</Paragraph>
            <Button variant='primary' size='md'>Schrijf je gratis in</Button>
          </div>
        </div>
        <Image className='flex-1' src='/serp/keyword-tracking-dashboard-overview-hero.png' width={1832} height={1178} alt='serp keyword tracking dashboard overview' />
      </div>

      <div className={`${container.maxWidthGutter} ${container.sectionPadding}`}>
        <Title>
          <Heading level='h2' size='5xl' className="mx-auto text-center max-w-[750px]">Organiseer, Analyseer en Volg met Precisie</Heading>
          <Paragraph className='max-w-[850px] mx-auto text-center'>Organiseer moeiteloos trefwoorden met tags om uw SEO-strategie te optimaliseren. Analyseer gefilterde campagnestatistieken en monitor positiewijzigingen vanuit één intuïtief dashboard.</Paragraph>
        </Title>
        <Image src='/serp/serp-dashboard.png' className='mt-8 mx-auto' width={2412} height={1221} alt='serp keyword tracker dashboard' />

        <GridFullPageContainer columns={3} containerStyles='mt-8 gap-8'>
          {
            features.cards.map((card, i) => (
              <div key={i} className=''>
                {card.icon}
                <Heading level='h3' size='lg'>{card.title}</Heading>
                <p>{card.description}</p>
              </div>
            ))
          }
        </GridFullPageContainer>
      </div>

      <div className={`${container.maxWidthGutter} ${container.sectionPadding}`}>
        <Title>
          <Heading level='h2' size='5xl' className="mx-auto text-center max-w-[750px]">Gedetailleerd resultaat en zoekwoord inzichten</Heading>
          <Paragraph className="max-w-[650px] mx-auto text-center">Onze tool biedt real-time dagelijkse updates van uw keyword prestaties, zodat u fluctuaties snel kunt detecteren en uw concurrentievoordeel kunt behouden.</Paragraph>
        </Title>
        <LinksRechtsImageContainer
          image={
            {
              src: '/serp/competitors-graph.png',
              alt: 'serp competitor insights',
              width: 1170,
              height: 387
            }
          }
          imageSide='left'
          containerStyles='mt-8'
          contentContainerStyles='flex items-center min-h-full'
        >
          <div className='h-fit'>
            <Heading level='h3' size='lg'>Concurenten Volgen</Heading>
            <Paragraph>Houd de positie van uw concurrenten in de gaten en kijk hoe jij je verhoudt.</Paragraph>
          </div>
        </LinksRechtsImageContainer>
        <LinksRechtsImageContainer
          image={{
            src: '/serp/result-overview.png',
            alt: 'serp user result overview',
            width: 1018,
            height: 633
          }}
          imageSide='right'
          containerStyles='flex items-center min-h-full'
        >
          <div>
            <Heading level='h3' size='lg'>Resultaten Overzicht</Heading>
            <Paragraph>Volg de huidige positie van uw trefwoord en krijg feedback over de prestaties.</Paragraph>

            <Heading level='h3' size='lg' className='mt-8'>Prestatie statestieken</Heading>
            <Paragraph>Bewaak cruciale statistieken zoals trefwoordpositie, gemiddelde maandelijkse zoekopdrachten, concurrentieniveau en biedprijzen.</Paragraph>

            <button>Probeer het nu</button>
          </div>
        </LinksRechtsImageContainer>
      </div>

      <div className={`${container.maxWidthGutter} ${container.sectionPadding}`}>
        <Title>
          <Heading level='h2' size='5xl' className="mx-auto text-center max-w-[750px]">Enhanced met jouw Google Search Console data</Heading>
          <Paragraph className="text-center">Blijf voorop lopen en optimaliseer je strategie met extra bruikbare data.</Paragraph>
        </Title>
        <LinksRechtsImageContainer
          image={{
            src: '/serp/google-search-console-metrics-cards.png',
            alt: 'google search console metrics cards with graphs',
            width: 786,
            height: 445
          }}
          imageSide='right'
          containerStyles='mt-8 flex items-center min-h-full'
        >
          <Paragraph className='max-w-[500px]'>Koppel je Google Search Console-account om gedetailleerde metrixen te krijgen zoals klikken, CTR, positie en vertoningen voor elk gevonden resultaat.</Paragraph>
        </LinksRechtsImageContainer>
      </div>

      <div className={`${container.maxWidthGutter} ${container.sectionPadding}`}>
        <Heading level='h2' size='5xl' className="mx-auto text-center max-w-[750px]">Waarom het bijhouden van je zoekwoorden cruciaal is</Heading>
        <GridFullPageContainer columns={2} containerStyles='mt-8 max-w-[1000px] mx-auto' >
          {
            importancy.cards.map((card, i) => (
              <div key={i} className='px-6 py-3 flex flex-col gap-2'>
                {card.icon}
                <Heading level='h3' size='lg'>{card.title}</Heading>
                <Paragraph>{card.description}</Paragraph>
              </div>
            ))
          }
        </GridFullPageContainer>
      </div>

      <div className={`${container.maxWidthGutter} ${container.sectionPadding}`}>
        <Heading level='h2' size='5xl' className="mx-auto text-center max-w-[750px]">Waarom het bijhouden van je zoekwoorden cruciaal is</Heading>
        <GridFullPageContainer columns={2} containerStyles='mt-8 max-w-[1000px] mx-auto' >
          {
            benefits.cards.map((card, i) => (
              <div key={i} className='px-6 py-3 flex flex-col gap-2'>
                {card.icon}
                <Heading level='h3' size='lg'>{card.title}</Heading>
                <Paragraph>{card.description}</Paragraph>
              </div>
            ))
          }
        </GridFullPageContainer>
      </div>

      <div className={`${container.maxWidthGutter} ${container.sectionPadding}`}>
        <Heading level='h2' size='5xl' className="mx-auto text-center max-w-[750px]">See How Our Tool Transforms SEO Challenges into Success Stories</Heading>
        <GridFullPageContainer columns={3} containerStyles='mt-8 max-w-[1000px] mx-auto' >
          {
            reviews.map((card, i) => (
              <div key={i} className='px-6 py-3 flex flex-col gap-2'>
                <Paragraph>{card.review}</Paragraph>
                <Paragraph className='text-right'>- {card.name}</Paragraph>
              </div>
            ))
          }
        </GridFullPageContainer>
      </div>

      <div className={`${container.maxWidthGutter} ${container.sectionPadding}`}>
        <Title>
          <Heading level='h2' size='5xl' className="mx-auto text-center max-w-[750px]">Supercharge Your SEO Strategy Today!</Heading>
          <Paragraph className="text-center">Unlock Powerful Insights and Stay Ahead of the Competition.</Paragraph>
          <button className='mt-8'>Start gratis proefperiode</button>
        </Title>
      </div>


    </>
  )
}


const features = {
  cards: [
    {
      icon: <TagIcon className='w-6 h-6 text-primary-500' />,
      title: 'Tags',
      description: 'Gebruik tags om jouw zoekwoorden te categoriseren en filteren voor eenvoudiger beheer.'
    },
    {
      icon: <FunnelIcon className='w-6 h-6 text-primary-500' />,
      title: 'Gesegmenteerde inzichten',
      description: 'Analyseer gefilterde campagnestatistieken op basis van uw getagde trefwoorden.',
    },
    {
      icon: <ArrowTrendingUpIcon className='w-6 h-6 text-primary-500' />,
      title: 'Prestaties volgen',
      description: 'Monitor gemiddelde posities en volg verbeteringen of dalingen.',
    }
  ]
}

const importancy = {
  cards: [
    {
      icon: <Cog6ToothIcon className='w-6 h-6 text-primary-500' />,
      title: 'Inspelen op Algoritmewijzigingen',
      description: 'Zoekmachine-algoritmen veranderen vaak. Door bij te houden, kun je je strategieën snel aanpassen om je rankings te behouden en te verbeteren.'
    },
    {
      icon: <PresentationChartLineIcon className='w-6 h-6 text-primary-500' />,
      title: 'Maximaliseer ROI',
      description: 'Door te begrijpen welke zoekwoorden verkeer en conversies genereren, kun je je middelen effectiever toewijzen en je rendement op investering maximaliseren.'
    },
    {
      icon: <Bars2Icon className='w-6 h-6 text-primary-500' />,
      title: 'Nieuwe kansen identificeren',
      description: 'Door regelmatig bij te houden, kun je nieuwe kansen identificeren en je strategieën aanpassen om je zichtbaarheid te vergroten.'
    },
    {
      icon: <ShieldEllipsisIcon className='w-6 h-6 text-primary-500' />,
      title: 'Voorblijven op de concurrentie',
      description: 'Door je zoekwoorden regelmatig bij te houden, blijf je de concurrentie voor door hun sterke en zwakke punten te identificeren.'
    }
  ]
}

const benefits = {
  cards: [
    {
      icon: <CalendarDaysIcon className='w-6 h-6 text-primary-500' />,
      title: 'Strategische Planning',
      description: 'Gebruik de inzichten van zoekwoordtracking en concurrentieanalyse om je SEO-strategieën te verfijnen en de zichtbaarheid van je website te verbeteren.'
    },
    {
      icon: <DocumentMagnifyingGlassIcon className='w-6 h-6 text-primary-500' />,
      title: 'Prestatiemonitoring',
      description: 'Monitor continu de impact van je SEO-inspanningen en neem datagestuurde beslissingen om de prestaties te verbeteren.'
    },
    {
      icon: <PresentationChartLineIcon className='w-6 h-6 text-primary-500' />,
      title: 'Middelen toewijzen',
      description: 'Wijs middelen effectiever toe door waardevolle zoekwoorden te identificeren en je inspanningen te richten op gebieden met het grootste potentiële rendement.'
    },
    {
      icon: <DocumentChartBarIcon className='w-6 h-6 text-primary-500' />,
      title: 'Uitgebreide rapportage',
      description: 'Genereer gedetailleerde rapporten die kunnen worden gedeeld met belanghebbenden om de effectiviteit van je SEO-strategieën aan te tonen.'
    },
  ]
}

const reviews = [
  {
    name: 'Amanda Johnson, Marketing Manager',
    review: "Before, understanding my website's search engine visibility was a challenge, leaving me frustrated and uncertain about our online presence. Now, this tool has provided clear insights into our SEO performance. I feel empowered to make informed decisions that positively impact our rankings and traffic."
  },
  {
    name: 'Ryan Smith, Content Strategist',
    review: "Before I was struggling with understanding my website's SEO performance, and it made me feel overwhelmed and unsure about our online visibility. Now, with this tool, I have achieved clarity and actionable insights into our keyword rankings and competitor strategies. I feel empowered and confident in our SEO efforts."
  },
  {
    name: "Michael Thompson, SEO Consultant",
    review: "Before, keeping up with our competitors' SEO tactics was challenging, leaving me anxious about falling behind in our industry. Now, thanks to this tool, I have a comprehensive view of competitor movements and strategies. I feel proactive and confident in our ability to maintain and grow our market share."
  }
]

export default page
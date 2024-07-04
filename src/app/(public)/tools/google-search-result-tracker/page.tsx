import container, { styles } from '@/styles/styles'
import { GridFullPageContainer } from '@/website/layouts/grid-full-page'
import { LinksRechtsImageContainer } from '@/website/layouts/links-rechts-image'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <>
      <div className={`${container.maxWidthGutter} ${container.sectionPadding}`}>
        <div className='max-w-[650px]'>
          <h1>Boost jouw zichtbaarheid in de zoekmachines</h1>
          <p>Track je zoekwoorden, analyseer concurenten en optimaliseer jouw campanges moeiteloos</p>
          <button>Schrijf je gratis in</button>
        </div>
        <div>
          hero image
        </div>
      </div>

      <div className={`${container.maxWidthGutter} ${container.sectionPadding}`}>
        <h2 className='text-center'>Organiseer, Analyseer en Volg met Precisie</h2>
        <p className='text-center'>Organiseer moeiteloos trefwoorden met tags om uw SEO-strategie te optimaliseren. Analyseer gefilterde campagnestatistieken en monitor positiewijzigingen vanuit één intuïtief dashboard.</p>
        <Image src='/serp/serp-dashboard.png' className='mx-auto' width={1200} height={800} alt='serp keyword tracker dashboard' />
      </div>

      <GridFullPageContainer columns={3} containerStyles={`${container.maxWidthGutterExtraPaddingMd} gap-8`}>
        {
          features.cards.map((card, i) => (
            <div key={i} className=''>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))
        }
      </GridFullPageContainer>

      <div className={`${container.maxWidthGutter} ${container.sectionPadding}`}>
        <h2 className="text-center">Gedetailleerd resultaat en zoekwoord inzichten</h2>
        <p className="text-center">Onze tool biedt real-time dagelijkse updates van uw keyword prestaties, zodat u fluctuaties snel kunt detecteren en uw concurrentievoordeel kunt behouden.</p>
        <LinksRechtsImageContainer
          image={
            {
              src: '/serp/competitors-graph.png',
              alt: 'serp competitor insights',
              width: 750,
              height: 500
            }
          }
          imageSide='left'
          contentContainerStyles='flex items-center min-h-full'
        >
          <div className='h-fit'>
            <h3>Concurenten Volgen</h3>
            <p>Houd de positie van uw concurrenten in de gaten en kijk hoe jij je verhoudt.</p>
          </div>
        </LinksRechtsImageContainer>
        <LinksRechtsImageContainer
          image={{
            src: '/serp/result-overview.png',
            alt: 'serp user result overview',
            width: 750,
            height: 600
          }}
          imageSide='right'
          containerStyles='flex items-center min-h-full'
        >
          <div>
            <h3>Resultaten Overzicht</h3>
            <p>Volg de huidige positie van uw trefwoord en krijg feedback over de prestaties.</p>

            <h3>Prestatie statestieken</h3>
            <p>Bewaak cruciale statistieken zoals trefwoordpositie, gemiddelde maandelijkse zoekopdrachten, concurrentieniveau en biedprijzen.</p>

            <button>Probeer het nu</button>
          </div>
        </LinksRechtsImageContainer>
      </div>
    </>
  )
}


const features = {
  cards: [
    {
      title: 'Tags',
      description: 'Gebruik tags om jouw zoekwoorden te categoriseren en filteren voor eenvoudiger beheer.'
    },
    {
      title: 'Gesegmenteerde inzichten',
      description: 'Analyseer gefilterde campagnestatistieken op basis van uw getagde trefwoorden.',
    },
    {
      title: 'Prestaties volgen',
      description: 'Monitor gemiddelde posities en volg verbeteringen of dalingen.',
    }
  ]
}

export default page
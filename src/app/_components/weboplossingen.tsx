import React from 'react'

// assets
import container from '@/styles/styles'
import { LockClosedIcon, RocketLaunchIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { CodeScreenWeb } from '../_assets';

// components
import Title from "@/components/ui/typography/title";
import { Paragraph, SubHeading, Heading } from '@/components/ui/typography/typography';

const Weboplossingen = () => {
  return (
    <div className="pb-[45px] pt-[216px] md:pb-[90px]  bg-[url('/home/mesh-gradient-weboplossingen-achtergrond-1920x794.jpg')] bg-cover">
      <div className={` ${container.maxWidthGutter}`}>
        <div className='grid mlg:grid-cols-2'>

          {/* title */}
          <Title className='max-w-[536px]'>
            <SubHeading level='h2' size='sm' colorScheme='gradient-primary'>{WEBOPLOSSINGEN.title.heading}</SubHeading>
            <Heading level='h3' size='4xl'>{WEBOPLOSSINGEN.title.subHeading}</Heading>
            <Paragraph>{WEBOPLOSSINGEN.title.paragraph}</Paragraph>
          </Title>

          {/* img */}
          <div className='relative'>
            <div className='mt-6 mlg:mt-0 mlg:absolute bottom-0 w-full' >
              <CodeScreenWeb className='shadow-custom-lg rounded-[20px] transition ease-out hover:-translate-y-2' />
              <Paragraph size='sm' className="mt-6 max-w-[550px]"> Nieuwste webtechnologieën met onze op maat gemaakte oplossingen, die een geavanceerde en toekomstbestendige online aanwezigheid garanderen.</Paragraph>
            </div>
          </div>

        </div>

        <div className='grid md:grid-cols-2 mlg:grid-cols-3 gap-8 mt-20'>
          {WEBOPLOSSINGEN.cards.map((card, index) => (
            <Card key={card.heading} card={card} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Weboplossingen




interface CardProps {
  key: string
  card: {
    icon: React.ReactNode
    heading: string
    paragraph: string
  }
}
const Card = ({ card }: CardProps) => {
  return (
    <div>
      <div className='w-8 h-8 p-[6px] bg-primary-500/15 text-primary-500 rounded'>{card.icon}</div>
      <Heading level='h4' size='lg' className='mt-3'>{card.heading}</Heading>
      <Paragraph className='mt-2'>{card.paragraph}</Paragraph>
    </div>
  )
}



const WEBOPLOSSINGEN = {
  title: {
    heading: "Geavanceerde Weboplossingen",
    subHeading: "Onze Weboplossingen VS traditionele CMS Systemen",
    paragraph: "Uw ambities verdienen een op maat gemaakte aanpak. Ons team is toegewijd aan het bieden van innovatieve oplossingen die specifiek op uw zakelijke uitdagingen zijn gericht. Laten we samen uw visie omzetten in meetbare resultaten."
  },
  cards: [
    { icon: <RocketLaunchIcon />, heading: "Performance en Snelheid", paragraph: "Ontdek ongeëvenaarde snelheid met onze custom weboplossingen. Vergeet trage laadtijden en geniet van een soepele, snelle gebruikerservaring." },
    { icon: <LockClosedIcon />, heading: "Veilig & SSL Gecertificeerd", paragraph: "Kies voor superieure veiligheid met onze op maat gemaakte weboplossingen, die robuuster zijn tegen cyberdreigingen dan standaard CMS-systemen." },
    { icon: <MagnifyingGlassIcon />, heading: "SEO-Optimalisatie", paragraph: "Verhoog uw zoekmachine zichtbaarheid. Onze op maat gemaakte oplossingen zorgen voor snellere laadsnelheden en geoptimaliseerde content, wat leidt tot betere zoekresultaten." },
  ]
}




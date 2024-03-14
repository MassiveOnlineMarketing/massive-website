import { Accordion, AccordionContainer, AccordionContent, AccordionHeader } from '@/website/features/accordion'
import container, { constants } from '@/styles/styles'
import React from 'react'

import Title from '@/components/ui/typography/title';
import { Heading, SubHeading } from '@/components/ui/typography/typography';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { AchterGrondFAQ } from '../_assets';

// contact
import { InternalAnchor } from '@/components/ui/link';
import { DEFAULT_MULTISTEP_FORM_ROUTE } from '../../../routes';

const Faq = () => {
  return (
    <div className={`relative mt-[100px] pb-[176px] flex flex-col  ${container.sectionGutter} overflow-hidden`}>
      <AchterGrondFAQ className='absolute bottom-0 left-1/2 -translate-x-1/2 -z-10' />

      <Title className='items-center mb-12'>
        <SubHeading level='h2' size='sm' variant='pill' type='icon' colorScheme='glass' className='pr-6'> <QuestionMarkCircleIcon className='w-6 h-6' /> {FAQ.title.subHeading}</SubHeading>
        <Heading level='h3' size='2xl' className='text-2xl'>{FAQ.title.heading}</Heading>
      </Title>
      <AccordionContainer className='max-w-[750px]'>
        {FAQ.accordion.map((item, index) => (
          <Accordion key={index} className={`${constants.glassFill} backdrop-blur-lg rounded-xl shadow-custom-lg relative gradient-mask faq-gradient`} >
            <AccordionHeader level='h4' size='lg' className="rounded-lg text-gray-800 p-4 font-medium text-base text-left md:text-center hover:text-primary-500" activeClassName='text-primary-500'>{item.header}</AccordionHeader>
            <AccordionContent >{item.content}</AccordionContent>
          </Accordion>
        ))}
      </AccordionContainer>

      <InternalAnchor href={DEFAULT_MULTISTEP_FORM_ROUTE} size='md' variant='primary' className='mt-16 mx-auto'>
        Neem Contact Op
      </InternalAnchor>
      <p className='text-center md:text-left text-sm font-normal leading-5 text-gray-500 mx-auto mt-4'>Of neem direct contact op <a className='font-semibold' href="mailto:info@massiveonlinemarketing.nl">info@massiveonlinemarketing.nl</a></p>
    </div>
  )
}

export default Faq

const FAQ = {
  title: {
    subHeading: "FAQ",
    heading: "Veelgestelde vragen",
  },
  accordion: [
    { header: "Wat maakt Massive uniek in de digitale marketingwereld?", content: "Massive Online Marketing onderscheidt zich door onze unieke combinatie van creativiteit, innovatie, en data-gedreven strategieën. Onze toewijding aan transparantie, klantgerichte aanpak, en het aanbieden van op maat gemaakte oplossingen stelt ons in staat om unieke en effectieve digitale marketingstrategieën te ontwikkelen die echt resoneren met uw publiek." },
    { header: "Hoe kan Massive mijn bedrijf helpen groeien?", content: "We helpen uw bedrijf groeien door een holistische benadering van digitale marketing. Dit omvat het ontwikkelen van een sterke online aanwezigheid via website- en e-commerce-ontwikkeling, SEO en SEA strategieën, en innovatieve online marketingcampagnes. We richten ons op het leveren van meetbare resultaten en duurzame groei." },
    { header: "Biedt Massive ook ondersteuning na de lancering van een project?", content: "Ja, we bieden voortdurende ondersteuning en begeleiding na de lancering van elk project. Onze focus ligt op het bouwen van langdurige relaties met onze klanten, en we streven ernaar om uw digitale marketinginspanningen voortdurend te optimaliseren voor aanhoudend succes." },
    { header: "Hoe benadert Massive projecten voor verschillende industrieën?", content: "We benaderen elk project met een frisse blik, volledig afgestemd op de specifieke behoeften en uitdagingen van uw industrie. Onze diversiteit en ervaring stellen ons in staat om strategieën te creëren die aansluiten bij uw unieke marktpositie en doelgroep." },
    { header: "Welke technologieën en tools gebruikt Massive om resultaten te leveren?", content: "We gebruiken een scala aan geavanceerde digitale marketingtools en technologieën, waaronder de nieuwste in SEO en SEA, content management systemen, data-analyse en inzichten, en creatieve design software. Deze tools stellen ons in staat om effectieve, data-gedreven strategieën te ontwikkelen en uit te voeren." },
    { header: "Hoe meet Massive het succes van hun digitale marketingcampagnes?", content: "We meten het succes van onze campagnes door een reeks van prestatie-indicatoren en analytics te gebruiken. Dit omvat, maar is niet beperkt tot, websiteverkeer, engagement, conversiepercentages, en ROI. We bieden regelmatige rapportages en analyses aan onze klanten om de effectiviteit van onze strategieën te tonen." },

  ]
}
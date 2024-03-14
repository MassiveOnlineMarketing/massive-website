'use client'

import React, { useState, useEffect } from 'react';
import container, { styles } from '@/styles/styles';
import '@/styles/animations.css'
import { cn } from '@/lib/utils';
import { GrijsBol, PaarsBol } from '../_assets';

import { useSwipeable } from 'react-swipeable';
import { Heading, Paragraph, SubHeading } from '@/components/ui/typography/typography';

import { InternalAnchor } from '@/components/ui/link';
import { DEFAULT_MULTISTEP_FORM_ROUTE } from '../../../routes';

const OnsProces = () => {
  const [clicked, setClicked] = useState(0);
  const [card1Class, setCard1Class] = useState('');
  const [card2Class, setCard2Class] = useState('translate-x-[-66px] scale-[0.9]');
  const [card3Class, setCard3Class] = useState('translate-x-[-132px] scale-[0.8]');

  const buttonClick = (index: number) => {
    if (index === 0) {
      animateCard(index);
      setClicked(0);
    } else if (index === 1) {
      animateCard(index);
      setClicked(1);
    } else if (index === 2) {
      animateCard(index);
      setClicked(2);
    }

  }

  const animateCard = (index: number) => {
    if (index === 0) {
      if (clicked === 2) {
        setCard1Class('');
        setCard2Class('translate-x-[-66px] scale-[0.9]');
        setCard3Class('translate-x-[-132px] scale-[0.8]');
      } else if (clicked === 1) {
        setCard1Class('');
        setCard2Class('translate-x-[-66px] scale-[0.9]');
        setCard3Class('translate-x-[-132px] scale-[0.8]');
      } else {
        setCard1Class('');
        setCard2Class('translate-x-[-66px] scale-[0.9]');
        setCard3Class('translate-x-[-132px] scale-[0.8]');
      }
    } else if (index === 1) {
      if (clicked === 0) {
        setCard1Class('translate-x-[66px] scale-[1.1] opacity-0');
        setCard2Class('');
        setCard3Class('transform translate-x-[-50px] scale-[0.9]');
      } else if (clicked === 2) {
        setCard1Class('translate-x-[66px] scale-[1.1] opacity-0');
        setCard2Class('');
        setCard3Class('translate-x-[-66px] scale-[0.9]');
      } else {
        setCard1Class('translate-x-[66px] scale-[1.1] opacity-0');
        setCard2Class('');
        setCard3Class('transform translate-x-[-50px] scale-[0.9]');
      }
    } else if (index === 2) {
      if (clicked === 0) {
        setCard1Class('translate-x-[66px] scale-[1.1] opacity-0');
        setCard2Class('translate-x-[66px] scale-[1.1] opacity-0');
        setCard3Class('');
      } else if (clicked === 1) {
        setCard1Class('translate-x-[66px] scale-[1.1] opacity-0');
        setCard2Class('translate-x-[66px] scale-[1.1] opacity-0');
        setCard3Class('');
      } else {
        setCard1Class('translate-x-[66px] scale-[1.1] opacity-0');
        setCard2Class('translate-x-[66px] scale-[1.1] opacity-0');
        setCard3Class('');
      }
    }
  }



  const contentRefs = [React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null)];

  useEffect(() => {
    contentRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.maxHeight = clicked === index ? `${ref.current.scrollHeight}px ` : '0';
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setClicked(prev => (prev < 2 ? prev + 1 : prev));
      if (clicked < 3) {
        animateCard(clicked + 1);
      }
    },
    onSwipedRight: () => {
      setClicked(prev => (prev > 0 ? prev - 1 : prev));
      if (clicked > 0) {
        animateCard(clicked - 1);
      }
    }
  });


  return (
    <div className='overflow-hidden'>
      <div className={`${container.maxWidthGutter} mt-[120px] border border-red`}>
        <div className='grid md:grid-cols-2'>

          {/* left side */}
          <div className='flex flex-col w-full max-w-[500px] my-auto'>
            {/* title */}
            <div className='flex flex-col gap-2 mb-10'>
              <SubHeading level='h2' size='sm' colorScheme='gradient-primary' >{ONS_PROCES.title.subHeading}</SubHeading>
              <Heading level='h3' size='4xl'>{ONS_PROCES.title.heading}</Heading>
              <Paragraph>{ONS_PROCES.title.description}</Paragraph>
            </div>

            {/* index card */}
            {ONS_PROCES.title.cards.map((card, index) => (
              <div key={index} onClick={() => buttonClick(index)}>
                {/* title */}
                <Title index={index} clicked={clicked}>
                  <Heading level='h4' size='lg' className={cn(
                    'font-medium',
                    `${clicked === index ? 'text-gray-800' : 'text-gray-500'}`,
                  )} >
                    {card.index.title} {/* Use card data here */}
                  </Heading>
                </Title>

                {/* content */}
                <div
                  ref={contentRefs[index]}
                  className={cn(
                    'transition-all duration-500 ease-in-out  overflow-hidden',
                    clicked === index ? '' : 'opacity-0 '
                  )}>
                  <div className='flex gap-2  '>
                    <div className='min-w-[19px] flex justify-center '>
                      <div className={`w-[1.5px] ${clicked === index ? 'bg-[#7857FF]' : 'bg-gray-300'} `}></div>
                    </div>
                    <p className=' pb-4 border-b-[1.5px] border-gray-300'>{card.index.description}</p>
                  </div>
                </div>
              </div>
            ))}


            {/* CTA */}
            <InternalAnchor href={DEFAULT_MULTISTEP_FORM_ROUTE} className='mt-12'>
              Plan gesprek in
            </InternalAnchor>
          </div>

          {/* right side */}
          <div {...handlers} className="relative bg-red-500 w-full my-10 h-[478px] ">
            <div className={cn(
              `w-full max-w-[449px] h-[478px] ${styles.glass} absolute right rounded-2xl flex items-center justify-center transition-all duration-500 bg-green-500 `,
              `${card3Class}`
            )}>
              Card 3
            </div>
            <div className={cn(
              `w-full max-w-[449px] h-[478px] ${styles.glass} absolute right rounded-2xl flex items-center justify-center transition-all duration-500 bg-yellow-500 `,
              `${card2Class}`
            )}>
              Card 2
            </div>
            <div className={cn(
              `w-full max-w-[449px] h-[478px] ${styles.glass} absolute right rounded-2xl flex items-center justify-center transition-all duration-500 bg-red-500 `,
              'rounded-2xl ',
              `${card1Class}`
            )}>
              Card 1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnsProces

const ONS_PROCES = {
  title: {
    subHeading: 'titleSubHeading',
    heading: 'titleHeading',
    description: 'titleDescription',
    cards: [
      {
        index: {
          title: 'indexTitle',
          description: 'indexDescription'
        },
        card: {
          heading: 'cardHeading',
          steps: [
            'stap1',
            'stap2',
            'stap3',
            'stap4',
          ]
        }
      },
      {
        index: {
          title: 'indexTitle2',
          description: 'indexDescription2'
        },
        card: {
          heading: 'cardHeading2',
          steps: [
            'stap1',
            'stap2',
            'stap3',
            'stap4',
          ]
        }
      },
      {
        index: {
          title: 'indexTitle3',
          description: 'indexDescription3'
        },
        card: {
          heading: 'cardHeading3',
          steps: [
            'stap1',
            'stap2',
            'stap3',
            'stap4',
          ]
        }
      }
    ]
  }
}

const Title = ({
  index,
  clicked,
  children
}: {
  index: number,
  clicked: number,
  children: React.ReactNode
}) => {

  return (
    <>
      <div className={`flex gap-2 items-center relative  ${index !== 0 ? 'pt-4' : ''}`}>
        {clicked === index ? <PaarsBol /> : <GrijsBol />}
        {children}
        <div className={cn(
          `absolute w-[1.5px] h-full  left-[8.5px] `,
          `${clicked === index ? 'bg-[#7857FF]' : 'bg-gray-300'}`,
          `${index === 0 ? 'h-1/2 bottom-0' : 'top-0'}`,
          `${index === 2 ? 'h-2/3 top-0' : 'bottom-0'}`,
          { 'h-full': index === 2 && clicked === 2 }
        )}>
        </div>
      </div>
    </>
  )
}
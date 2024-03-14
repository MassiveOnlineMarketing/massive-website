'use client'

import React, { useState, useEffect } from 'react'

import { Heading } from '@/components/ui/typography/typography'
import { InputField, TestInput, Textarea } from '@/components/ui/input/fields';
import { MultiStepContactFormChildProps } from './contact-form';


export const EcommerceStep: React.FC<MultiStepContactFormChildProps> = ({ register, watch, errors }) => {

  // Use for showing the other reason textarea
  const [showOtherReasonEcomFunctionality, setShowOtherReasonEcomFunctionality] = useState(false);
  const webshopFunctionaliteit = watch('webshopFunctionaliteit');

  useEffect(() => {
    console.log(webshopFunctionaliteit);
      if (Array.isArray(webshopFunctionaliteit)) {
          setShowOtherReasonEcomFunctionality(webshopFunctionaliteit.includes('Aangepaste oplossing'));
      }
  }, [webshopFunctionaliteit]);

  return (
    <>
      <Heading level='h4' size='base' colorScheme='dark'>Heeft U al een website?</Heading>
      <div className='flex flex-col gap-3 mt-3'>
        {HEEFT_WEBSITE.map((item, index) => (
          <TestInput
            key={index}
            type='radio'
            label={item.option}
            value={item.option}
            {...register('heeftWebsite')}
          />
        ))}
      </div>
      {watch('heeftWebsite') === 'Ja' && (
        <InputField
          type='text'
          placeholder='Uw website url...'
          {...register('websiteURL')}
        />
      )}
      <p>{errors.heeftWebsite?.message}</p>

      <Heading level='h4' size='base' colorScheme='dark' className='mt-6'>Naar welke functionaliteit bent u op zoek?</Heading>
      <div className='flex flex-col gap-3 mt-3'>
        {WEBSHOP_PLATFORM.map((item, index) => (
          <TestInput
            key={index}
            type='checkbox'
            label={item.option}
            value={item.option}
            {...register('webshopFunctionaliteit')}
          />
        ))}
      </div>
      {showOtherReasonEcomFunctionality && (
        <Textarea
          rows={2}
          placeholder='Gelieve te specificeren...'
          {...register('otherReasonWebshopFunctionaliteit')}
        />
      )}
      <p>{errors.websiteURL?.message}</p>

      <Heading level='h4' size='base' colorScheme='dark' className='mt-6'>Naar welke functionaliteit bent u op zoek?</Heading>
      <div className='flex flex-col gap-3 mt-3'>
        {WEBSHOP_PRODUCTS.map((item, index) => (
          <TestInput
            key={index}
            type='radio'
            label={item.option}
            value={item.option}
            {...register('webshopProducten')}
          />
        ))}
      </div>
    </>
  )
}


const HEEFT_WEBSITE = [
  { option: 'Ja' },
  { option: 'Nee' }
]

// EcommerceAndWebWinkel
const WEBSHOP_PLATFORM = [
  {option: "Shopify" },
  {option: "WooCommerce" },
  {option: "Magento" },
  {option: "Aangepaste oplossing" },
];

const WEBSHOP_PRODUCTS = [
  {option: "Minder dan 50" },
  {option: "50 tot 200" },
  {option: "200 tot 1000" },
  {option: "Meer dan 1000" },
];
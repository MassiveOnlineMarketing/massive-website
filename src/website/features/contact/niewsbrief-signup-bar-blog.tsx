'use client';

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NiewsbriefSignupBarSchama } from './schema'
import { z } from 'zod'
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { styles } from '@/styles/styles';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { submitNiewsbriefSignup } from './actions/submit-niewsbrief-signup';
import { useToast } from '../toast/use-toast';

type Schema = z.infer<typeof NiewsbriefSignupBarSchama>

const NiewsbriefSignupBarBlog = ({ containerStyles }: { containerStyles?: string }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Schema>()

  const { toast } = useToast()

  const onSubmit: SubmitHandler<Schema> = async data => {
    const result = await submitNiewsbriefSignup(data)
    console.log(result)

    if (result?.error ) {
      toast({
        // @ts-ignore
        description: result?.error?.email?._errors[0] || 'Er is een fout opgetreden',
        variant: 'destructive',
        duration: 5000,
      })
    } else if (result?.success) {
      toast({
        description: 'U bent ingeschreven voor de nieuwsbrief',
        variant: 'success',
        duration: 5000,
      })

      reset()
    }
  }

  return (
    <div className={cn(
      `w-fit mx-auto flex flex-col gap-[30px]`,
      containerStyles
    )}>
      <form className={`flex flex-row rounded-lg items-center p-[2px] relative ${styles.glass}`} >
        <input className='py-3 px-5 rounded-lg w-full outline-none  focus:ring-2 focus:ring-inset focus:ring-primary-500' {...register('email')} placeholder='Uw Email...' />
        <EnvelopeIcon className='w-6 h-6 text-gray-400 absolute right-5 top-1/2 transform -translate-y-1/2' />
      </form>

      <Button variant='outline' size='md' className='mx-auto bg-white' type='submit' onClick={handleSubmit(onSubmit)}>Schrijf in</Button>
    </div>
  )
}

export default NiewsbriefSignupBarBlog
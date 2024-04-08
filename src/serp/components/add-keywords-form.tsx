'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useProjectDetails } from '../project-details-context'
import { useProcessNewKeywords } from '../hooks/useProcessNewKeywords'

// utils
import { KeywordsSchema } from '../schema'
import { z } from 'zod'
import { splitAndTrimKeywords } from '../lib/utils'

// components
import { Dialog, DialogContent, DialogHeader, DialogTriggerNoButton } from '@/website/features/dialog/dialog'
import { useToast } from '@/website/features/toast/use-toast'

type Schema = z.infer<typeof KeywordsSchema>

const AddKeywordsFrom = ({ children, buttonClassName }: { children: React.ReactNode , buttonClassName?: string}) => {
  const [open, setOpen] = React.useState(false)
  const { projectDetails } = useProjectDetails()
  const { processNewKeywords, isLoading, error } = useProcessNewKeywords()
  const {toast} = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Schema>({})

  useEffect(() => {
    if (error) {
      toast({
        description: error,
        variant: 'destructive',
        duration: 3000
      })
    }
  }, [error])


  const onSubmit = async (data: Schema) => {
    setOpen(false)

    if (!projectDetails) {
      return
    }

    const keywordsArray = splitAndTrimKeywords(data.keywords)

    processNewKeywords(keywordsArray, projectDetails)

    if (!isLoading) {
      reset()
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTriggerNoButton className={buttonClassName} onClick={() => setOpen(true)}>
          {children}
        </DialogTriggerNoButton>
        <DialogContent>
          <DialogHeader>
            Please enter the keywords you want to track
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2'
          >
            <textarea
              className="border-2 border-black"
              rows={10}
              {...register("keywords")}
            />
            <button type="submit">Add</button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddKeywordsFrom

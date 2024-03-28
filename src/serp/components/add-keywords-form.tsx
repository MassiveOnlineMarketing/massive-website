'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { KeywordsSchema } from '../schema'

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/website/features/dialog/dialog'
import { useProjectDetails } from '../project-details-context'
import { useKeywords } from '../hooks/useKeywords'
import { splitAndTrimKeywords } from '../lib/utils'
import { useProcessNewKeywords } from '../hooks/useProcessNewKeywords'

type Schema = z.infer<typeof KeywordsSchema>

type ResultResponse = {
  keywordId: string;
  keywordName: string;
  position: number;
  url: string;
  metaTitle: string;
  metaDescription: string;
  firstPosition: number;
  bestPosition: number;
}

const AddKeywordsFrom = ({ children, buttonClassName }: { children: React.ReactNode , buttonClassName?: string}) => {
  const [open, setOpen] = React.useState(false)
  const { projectDetails } = useProjectDetails()
  const { processNewKeywords, isLoading } = useProcessNewKeywords()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Schema>({})

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
        <DialogTrigger className={buttonClassName}>
          {children}
        </DialogTrigger>
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

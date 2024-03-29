'use client'

import { useEffect, useState } from "react"
import { useProjectDetails } from "../project-details-context"

import { z } from "zod"
import { UpdateProjectSchema } from "../schema"
import { useForm } from "react-hook-form"

import { updateProjectDetails } from "../data/project"
import { useToast } from "@/website/features/toast/use-toast"

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/website/features/dialog/dialog'
import { PencilIcon } from "@heroicons/react/24/outline"



type Schema = z.infer<typeof UpdateProjectSchema>


/**
 * Component for updating project information.
 * 
 * @returns JSX.Element
 */
export const UpdateProjectInfoForm = () => {

  const { toast } = useToast()
  const [ open, setOpen ] = useState(false)
  const { updateProjectDetailsState, projectDetails } = useProjectDetails()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<Schema>();

  useEffect(() => {
    if (projectDetails) {
      setValue("projectName", projectDetails.projectName);
      setValue("domainUrl", projectDetails.domainUrl);
      setValue("language", projectDetails.language);
      setValue("country", projectDetails.country);
    }
  }, [projectDetails, setValue]);

  const onSubmit = async (data: Schema) => {
    const result = await updateProjectDetails(projectDetails!.id, data)

    if (result.id) {
      setOpen(false)
      reset()
      toast({
        description: 'Project updated',
        variant: "success",
        duration: 4000,
      })
      
      updateProjectDetailsState(result)
    } else {
      toast({
        description: 'Error updating project',
        variant: "destructive",
        duration: 4000,
      })
    }
  } 

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger>
          <PencilIcon className="h-4 w-4" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            Please enter the project details you want to update
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col w-full gap-4 mx-auto'
          >
            {/* 1. text field project name */}
            <p>Project Name</p>
            <input
              className="border-2 border-black"
              type="text"
              {...register("projectName", { required: true })}
            />
            {errors.projectName && <span>This field is required</span>}

            {/* 2. text field project domain */}
            <p>Domain URL</p>
            <input
              className="border-2 border-black"
              type="text"
              {...register("domainUrl", { required: true })}
            />
            {errors.domainUrl && <span>This field is required</span>}

            {/* 3. multi selector language, should give us formated language code */}
            <p>Language</p>
            <select
              className="border-2 border-black"
              {...register("language", { required: true })}
            >
              <option value="en">English</option>
              <option value="de">German</option>
              <option value="nl">Dutch</option>
            </select>
            {errors.language && <span>This field is required</span>}

            {/* 4. multi selector country, should give us formatted country code */}
            <p>Country</p>
            <select
              className="border-2 border-black"
              {...register("country", { required: true })}
            >
              <option value="us">United States</option>
              <option value="de">Germany</option>
              <option value="nl">Netherlands</option>
            </select>
            {errors.country && <span>This field is required</span>}

            <button type="submit">Save</button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
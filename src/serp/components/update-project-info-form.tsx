'use client'

import { useEffect, useState } from "react"
import axios from "axios"

// From
import { z } from "zod"
import { UpdateProjectSchema } from "../schema"
import { useForm } from "react-hook-form"
import { useProjectDetailsStore } from "@/lib/zustand/project-details-store"

// Hooks
import { useToast } from "@/website/features/toast/use-toast"
import { useSession } from "next-auth/react"
import { useIsGscAuthenticated } from "@/auth/hooks/use-is-gsc-authenticated"

import { updateProjectDetails } from "../data/project"

// components
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/website/features/dialog/dialog'
import { PencilIcon } from "@heroicons/react/24/outline"




type Schema = z.infer<typeof UpdateProjectSchema>

type Site = {
  premissionLevel: string,
  siteUrl: string,
}

/**
 * Component for updating project information.
 * 
 * @returns JSX.Element
 */
export const UpdateProjectInfoForm = () => {

  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const updateProjectDetailsState = useProjectDetailsStore((state) => state.updateProjectDetails)
  
  const user = useSession()
  const isGscAuthenticated = useIsGscAuthenticated()
  
  // Form data
  const [sites, setSites] = useState<Site[]>()
  const projectDetails = useProjectDetailsStore(state => state)

  useEffect(() => {
    if (open) {
      let refreshToken = null as string | null

      if (projectDetails.projectName && projectDetails.domainUrl && projectDetails.language && projectDetails.country) {
        setValue("projectName", projectDetails.projectName);
        setValue("domainUrl", projectDetails.domainUrl);
        setValue("language", projectDetails.language);
        setValue("country", projectDetails.country);
        if (projectDetails.gscUrl) {
          setValue("gscSite", projectDetails.gscUrl);
        }
      }

      if (user.data?.refreshToken && isGscAuthenticated) {

        refreshToken = user.data.refreshToken
        fetchConnectedSites(refreshToken);
      } else {
        console.log('No Token')
      }

    }
  }, [open, projectDetails.gscUrl]);

  const fetchConnectedSites = async (refreshToken: string) => {
    const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/get_sites?refresh_token=${refreshToken}`
    const res = await axios(url)
    setSites(res.data.siteEntry)
  }



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<Schema>();


  const onSubmit = async (data: Schema) => {

    if (!projectDetails.id) throw new Error("No project id found")
    const result = await updateProjectDetails(projectDetails.id, data)

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
        <DialogTrigger >
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

            <p>Connect Google Search Console</p>
            {isGscAuthenticated ? (
              <>
                <p>Authenticated</p>
                <select
                  className="border-2 border-black"
                  {...register("gscSite", { required: false })}
                >
                  <option value="">Select a site</option>
                  {sites && sites.map((site: Site) => {
                    return <option key={site.siteUrl} value={site.siteUrl}>{site.siteUrl}</option>
                  })}
                </select>
              </>
            ) : (
              <p>Not authenticated</p>
            )}

            <button type="submit">Save</button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
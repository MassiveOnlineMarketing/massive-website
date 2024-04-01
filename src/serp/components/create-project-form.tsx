'use client';

import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form"
import { ProjectSchema } from "../schema"
// import { createProject } from "../actions/create-project";
import { useRouter } from "next/navigation";

import { z } from "zod"
import { useToast } from "@/website/features/toast/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/website/features/dialog/dialog'
import { TextButton } from "@/components/ui/text-button";
import { useCurrentUser } from "@/auth/hooks/use-current-user";
import { createProject } from "../data/project";
import { useKeywords } from "../hooks/useKeywords";
import { splitAndTrimKeywords } from "../lib/utils";
import { useProject } from "../hooks/useProject";
import { useProcessNewKeywords } from "../hooks/useProcessNewKeywords";


type Schema = z.infer<typeof ProjectSchema>

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

export const CreateProjectForm = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const user = useCurrentUser()
  const { createNewProjectAndToast } = useProject()
  const { processNewKeywords } = useProcessNewKeywords()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Schema>({})

  const onSubmit: SubmitHandler<Schema> = async data => {
    // TODO: Toast
    console.log('we are setting up the project, you will be redirected once it is done')
    if (!user?.id) {
      return
    }

    const projectResponse = await createNewProjectAndToast(user.id, data.projectName, data.domainUrl, data.language, data.country)

    if (!projectResponse) {
      return
    }


    reset()
    router.push(`/app/search/tracker/${projectResponse.project.id}`)
    setOpen(false)

    if (!data.keywords) {
      return
    }

    const keywordsArray = splitAndTrimKeywords(data.keywords)

    processNewKeywords(keywordsArray, projectResponse.project)
  }


  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <TextButton>
            Create Project
          </TextButton>

        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            Please enter the project details
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

            {/* 5. text area where user can optionaly input keywords seperated by line */}
            <p>Keywords</p>
            <textarea
              className="border-2 border-black"
              rows={10}
              {...register("keywords")}
            />

            <button type="submit">Submit</button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
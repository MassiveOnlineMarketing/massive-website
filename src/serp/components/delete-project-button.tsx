'use client'

import { Button } from "@/components/ui/button"
import { deleteProjectById } from "../data/project"
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/website/features/dialog/dialog"
import { useRouter } from "next/navigation"
import { useToast } from "@/website/features/toast/use-toast"
import { TextButton } from "@/components/ui/text-button"

export const DeleteProjectButton = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleClick = async () => {
    deleteProjectById(projectId)

    router.push('dashboard/serp-tracker')
    toast({
      title: 'Project deleted',
      variant: 'success',
      duration: 2000
    })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <TextButton>
            Delete Project
          </TextButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            are you sure you want to delete this project?
          </DialogHeader>
          <Button onClick={handleClick}>
            Yes, delete
          </Button>
        </DialogContent>
      </Dialog>

    </>
  )

}

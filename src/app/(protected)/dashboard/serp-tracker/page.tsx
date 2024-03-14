"use client";

import { useEffect, useState } from 'react'

import { CreateProjectForm } from '@/serp/components/create-project-form'
import { deleteProjectById, getProjectByUserId } from '@/serp/data/project'
import { ProjectTable } from './project-table'
import { columns } from './columns'
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { useToast } from '@/website/features/toast/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Project } from '@prisma/client';
import { useKeywords } from '@/serp/hooks/useKeywords';


const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [projects, setProjects] = useState<Project[]>()
  const [projectToDelete, setprojectToDelete] = useState<string | null>(null);

  const { toast } = useToast()

  const user = useCurrentUser()
  const userId = user?.id
  // const userId = 'clsf91aug0082ldvepngnelh6'

  const { resetResults } = useKeywords()


  useEffect(() => {
    async function fetchProjects() {
      if (!userId) return
      const projects = await getProjectByUserId(userId)

      setProjects(projects)
    }
    
    resetResults()
    fetchProjects()
  }, [userId]);

  if (!userId) return <div>Not able to acces</div>

  



  // row actions
  const handleProjectDelete = (projectId: string) => {
    console.log('delete', projectId)
    setprojectToDelete(projectId);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    if (projectToDelete !== null) {
      const response = await deleteProjectById(projectToDelete)
      if (response.projectName) {
        toast({
          title: 'Project deleted',
          description: `The project ${response.projectName} has been deleted.`,
          variant: 'success',
        })

        // remove the project from the list
        setProjects(prevProjects => prevProjects ? prevProjects.filter(project => project.id !== projectToDelete): []);
      }
      setIsDialogOpen(false);
    }
  }
  const cancelDelete = () => {
    setIsDialogOpen(false);
  }


  return (
    // <div className='animate-pulse bg-green-50/10'>
    <div>

      <CreateProjectForm />
      {projects &&
        <ProjectTable columns={columns(handleProjectDelete)} data={projects} />

      }


      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className='bg-white'>
          <AlertDialogHeader>Are you sure you want to delete this project?</AlertDialogHeader>
          <AlertDialogFooter>

            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className='bg-red-200 hover:bg-red-300 text-red-500 hover:text-red-600 border border-red-300 px-[24px] py-[12px] rounded-lg'>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

export default Page
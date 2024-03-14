/**
 * Custom hook for creating a new project and displaying a toast notification.
 * 
 * @returns An object containing the `createNewProjectAndToast` function.
 */
import { useToast } from "@/website/features/toast/use-toast";
import { createProject } from "../data/project";


export const useProject = () => {
  const { toast } = useToast();

  /**
   * ? Creates a new project and displays a toast notification.
   * 
   * @param userId - The ID of the user creating the project.
   * @param projectName - The name of the project.
   * @param domainUrl - The domain URL of the project.
   * @param language - The language of the project.
   * @param country - The country of the project.
   * @returns An object containing the success status and the created project.
   */
  const createNewProjectAndToast = async (
    userId: string,
    projectName: string,
    domainUrl: string,
    language: string,
    country: string
  ) => {
    const projectResponse = await createProject(userId, projectName, domainUrl, language, country)

    if (!projectResponse.id) {
      toast({
        description: "Error creating project, please try again later.",
        variant: "destructive",
        duration: 5000,
      })
      return
    }

    toast({
      description: "Project created successfully",
      variant: "success",
      duration: 5000,
    })

    return { success: true, project: projectResponse }
  }

  return {
    createNewProjectAndToast
  }
}
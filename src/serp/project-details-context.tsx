'use client'

import { FC, createContext, useContext, useState } from "react";
import { projectRouteAuth } from "./utils";
import { getProjectById } from "./data/project";
import { Project } from "@prisma/client";



interface ProjectDetailsContextType {
  projectDetails: Project | null;
  authorized: boolean;
  fetchProjectDetails: (projectId: string) => void;
  updateProjectDetailsState: (newProjectInfo: Project) => void;
}

const ProjectDetailsContext = createContext<ProjectDetailsContextType | undefined>(undefined);

interface ProjectDetailsProviderProps {
  children: React.ReactNode;
}

export const ProjectDetailsProvider: FC<ProjectDetailsProviderProps> = ({ children }) => {
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [authorized, setAuthorized] = useState<boolean>(false)

  const fetchProjectDetails = async (projectId: string) => {

    const auth = await projectRouteAuth(projectId)
    setAuthorized(auth)
    if (!auth) {
      return
    }

    const projectDetails = await getProjectById(projectId)
    setProjectDetails(projectDetails)
  }


  const updateProjectDetailsState = (newProjectInfo: Project) => {
    setProjectDetails(newProjectInfo)
  }


  return (
    <ProjectDetailsContext.Provider value={{ projectDetails, authorized, fetchProjectDetails, updateProjectDetailsState }}>
      {children}
    </ProjectDetailsContext.Provider>
  );
}

export const useProjectDetails = (): ProjectDetailsContextType => {
  const context = useContext(ProjectDetailsContext)
  if (context === undefined) {
    throw new Error('useProjectDetails must be used within a ProjectDetailsProvider')
  }
  return context
}
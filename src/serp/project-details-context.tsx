'use client'

import { FC, createContext, useContext, useState } from "react";
import { projectRouteAuth } from "./utils";
import { getProjectById } from "./data/project";
import { Project, ProjectResult } from "@prisma/client";
import { getLatestProjectResult, getYesterdayProjectResults } from "./data/project-result";



interface ProjectDetailsContextType {
  projectDetails: Project | null;
  authorized: boolean;
  fetchProjectDetails: (projectId: string) => void;
  updateProjectDetailsState: (newProjectInfo: Project) => void;
  latestResult: ProjectResult | null;
  yesterdaysResult: ProjectResult | null;
  loading: boolean;
}

const ProjectDetailsContext = createContext<ProjectDetailsContextType | undefined>(undefined);

interface ProjectDetailsProviderProps {
  children: React.ReactNode;
}

export const ProjectDetailsProvider: FC<ProjectDetailsProviderProps> = ({ children }) => {
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [authorized, setAuthorized] = useState<boolean>(false)

  const [latestResult, setLatestResult] = useState<ProjectResult | null>(null);
  const [yesterdaysResult, setYesterdaysResult] = useState<ProjectResult | null>(null);

  const [loading, setLoading] = useState<boolean>(false)

  const fetchProjectDetails = async (projectId: string) => {
    setLoading(true)

    const auth = await projectRouteAuth(projectId)
    setAuthorized(auth)
    if (!auth) {
      setLoading(false)
      return
    }

    const projectDetails = await getProjectById(projectId)
    setProjectDetails(projectDetails)

    const latestResult = await getLatestProjectResult(projectId)
    setLatestResult(latestResult)

    const yesterdaysResult = await getYesterdayProjectResults(projectId)
    setYesterdaysResult(yesterdaysResult)
    
    setLoading(false)
  }


  const updateProjectDetailsState = (newProjectInfo: Project) => {
    setProjectDetails(newProjectInfo)
  }

  const values = {
    projectDetails,
    authorized,
    fetchProjectDetails,
    updateProjectDetailsState,
    latestResult,
    yesterdaysResult,
    loading
  }

  return (
    <ProjectDetailsContext.Provider value={values}>
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
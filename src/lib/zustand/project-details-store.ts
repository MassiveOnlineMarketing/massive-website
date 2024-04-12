import { Project } from '@prisma/client'
import { create } from 'zustand'


export type ProjectDetailsActions = {
    setProjectDetails: (projectDetails: Project) => void;
    updateProjectDetails: (projectDetails: Project) => void;
}

export type ProjectDetailsState = {
    id: string | null;
    userId: string | null;
    projectName: string | null;
    domainUrl: string | null;
    language: string | null;
    country: string | null;
    gscUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export type ProjectDetailsStore = ProjectDetailsState & ProjectDetailsActions


export const useProjectDetailsStore = create<ProjectDetailsStore>((set) => ({
    id: null,
    userId: null,
    projectName: null,
    domainUrl: null,
    language: null,
    country: null,
    gscUrl: null,
    createdAt: null,
    updatedAt: null,
    setProjectDetails: (projectDetails: Project) => {
        set({
            id: projectDetails.id,
            userId: projectDetails.userId,
            projectName: projectDetails.projectName,
            domainUrl: projectDetails.domainUrl,
            language: projectDetails.language,
            country: projectDetails.country,
            gscUrl: projectDetails.gscUrl,
            createdAt: projectDetails.createdAt,
            updatedAt: projectDetails.updatedAt
        })
    },

    updateProjectDetails: (projectDetails: Project) => {
        set((state) => ({
            id: projectDetails.id,
            userId: projectDetails.userId,
            projectName: projectDetails.projectName,
            domainUrl: projectDetails.domainUrl,
            language: projectDetails.language,
            country: projectDetails.country,
            gscUrl: projectDetails.gscUrl,
            createdAt: projectDetails.createdAt,
            updatedAt: projectDetails.updatedAt
        }))
    }
}));


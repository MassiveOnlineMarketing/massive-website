

import { GoogleSearchProject } from '@prisma/client'
import { create } from 'zustand'


export type GoogleSearchProjectDetailsActions = {
    setProjectDetails: (projectDetails: GoogleSearchProject) => void;
}

export type GoogleSearchConsoleProjectDetails = {
    id: string;
    userId: string;
    projectName: string;
    domainUrl: string;
    language: string;
    country: string;
    gscUrl: string | null;
    createdAt: Date ;
    updatedAt: Date;
    websiteId: string;
}

export type ProjectDetailsState = {
    ProjectDetails: GoogleSearchConsoleProjectDetails | null;
}

export type GoogleSearchProjectDetailsStore = ProjectDetailsState & GoogleSearchProjectDetailsActions


export const useGoogleSearchProjectDetailsStore = create<GoogleSearchProjectDetailsStore>((set) => ({
    ProjectDetails: null,

    setProjectDetails: (projectDetails: GoogleSearchProject | null) => {
        set({
            ProjectDetails: projectDetails
        })
    },

}));


import { GoogleSearchCompetitor, GoogleSearchProject } from "@prisma/client";
import { create } from "zustand";

// ! Competitors is currently not being used

export type GoogleSearchProjectDetailsActions = {
  setProjectDetails: (projectDetails: GoogleSearchProject) => void;
  // setCompetitors: (competitors: GoogleSearchCompetitor[] | null) => void;
};

export type GoogleSearchConsoleProjectDetails = {
  id: string;
  userId: string;
  projectName: string;
  domainUrl: string;
  language: string;
  country: string;
  gscUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  websiteId: string;
};

export type ProjectDetailsState = {
  ProjectDetails: GoogleSearchConsoleProjectDetails | null;
  // Competitors: GoogleSearchCompetitor[] | null;
};

export type GoogleSearchProjectDetailsStore = ProjectDetailsState &
  GoogleSearchProjectDetailsActions;

export const useGoogleSearchProjectDetailsStore =
  create<GoogleSearchProjectDetailsStore>((set) => ({
    ProjectDetails: null,
    // Competitors: null,

    setProjectDetails: (projectDetails: GoogleSearchProject | null) => {
      set({
        ProjectDetails: projectDetails,
      });
    },

    // setCompetitors: (competitors: GoogleSearchCompetitor[] | null) => {
    //   set({
    //     Competitors: competitors,
    //   });
    // }

  }));

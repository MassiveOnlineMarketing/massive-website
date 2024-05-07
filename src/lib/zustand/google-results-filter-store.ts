import { GoogleResultFilterWithUrls } from "@/dashboard/types";
import { GoogleResultFilter } from "@prisma/client";
import { create } from "zustand";


export type GoogleResultFilterActions = {
  setGoogleResultFilter: (filter: GoogleResultFilterWithUrls[]) => void;
  setSelectedResultsFilter: (filter: GoogleResultFilterWithUrls[]) => void;
};


export type GoogleResultFilterState = {
  googleResultFilter: GoogleResultFilterWithUrls[] | [];
  selectedResultsFilter: GoogleResultFilterWithUrls[];
};


export type GoogleResultFilterStore = GoogleResultFilterState & GoogleResultFilterActions;


export const useGoogleFilterStore = create<GoogleResultFilterStore>((set) => ({

  googleResultFilter: [],
  selectedResultsFilter: [],

  setGoogleResultFilter: (filter: GoogleResultFilterWithUrls[]) => {
    set({
      googleResultFilter: filter,
    });
  },

  setSelectedResultsFilter: (filter: GoogleResultFilterWithUrls[]) => {
    set({
      selectedResultsFilter: filter,
    });
  },
}));
import { GoogleResultFilterWithUrls } from "@/dashboard/types";
import { GoogleResultFilter } from "@prisma/client";
import { create } from "zustand";


export type GoogleResultFilterActions = {
  setGoogleResultFilter: (filter: GoogleResultFilterWithUrls[]) => void;
  addGoogleResultFilter: (filterToAdd: GoogleResultFilterWithUrls) => void;
  removeGoogleResultFilter: (filterToRemove: GoogleResultFilter) => void;

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

  addGoogleResultFilter: (filterToAdd) =>{ 
    set((state) => ({
      googleResultFilter: [...state.googleResultFilter, filterToAdd]
    }))
  },

  removeGoogleResultFilter: (filterToRemove: GoogleResultFilter) => {
    set((state) => ({
      googleResultFilter: state.googleResultFilter.filter(
        filter => filter.id !== filterToRemove.id
      )
    }))
  },

  setSelectedResultsFilter: (filter: GoogleResultFilterWithUrls[]) => {
    set({
      selectedResultsFilter: filter,
    });
  },
}));
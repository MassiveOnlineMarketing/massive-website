'use client';

import { Website } from "@prisma/client";
import { create } from "zustand";

export type WebsiteDetailsActions = {
  setWebsiteDetails: (websiteDetails: Website) => void;
};

export type WebsiteDetailsState = {
  WebsiteDetails: Website | null;
};

export type WebsiteDetailsStore = WebsiteDetailsState & WebsiteDetailsActions;

export const useWebsiteDetailsStore = create<WebsiteDetailsStore>((set) => {

  return {
    WebsiteDetails: null,

    setWebsiteDetails: (websiteDetails: Website) => {
      set({
        WebsiteDetails: websiteDetails,
      });
      sessionStorage.setItem("websiteDetails", JSON.stringify(websiteDetails));
    },
  };
});
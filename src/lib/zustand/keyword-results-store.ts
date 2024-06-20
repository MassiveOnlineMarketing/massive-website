import { LatestResultsDTO } from "@/dashboard/google-search/serp-types";
import { create } from "zustand";

export type KeywordResultsActions = {
  setKeywordResults: (keywordResults: LatestResultsDTO[]) => void;
  updateKeywordResults: (newKeywordResults: LatestResultsDTO[]) => void;
  resetKeywordResults: () => void;
  setSelectedTags: (tags: string[]) => void;
  removeSelectedTag: (tag: string) => void;

  resetSelectedTags: () => void;
};

export type KeywordResultsState = {
  keywordResults: LatestResultsDTO[] | [];
  selectedTags: string[];
};

export type KeywordResultsStore = KeywordResultsState & KeywordResultsActions;

/**
 * Custom hook that creates a Zustand store for managing keyword results and selected tags.
 * @returns An object containing the keywordResults and selectedTags state variables, as well as setter functions for updating them.
 */
export const useKeywordResultsStore = create<KeywordResultsStore>((set) => ({
  keywordResults: [],
  selectedTags: [],

  setKeywordResults: (keywordResults: LatestResultsDTO[]) => {
    set({
      keywordResults: keywordResults,
    });
  },
  updateKeywordResults: (newKeywordResults: LatestResultsDTO[]) => {
    set((state) => ({
      keywordResults: [...state.keywordResults, ...newKeywordResults],
    }));
  },
  resetKeywordResults: () => {
    set({
      keywordResults: [],
    });
  },

  setSelectedTags: (tags: string[]) => {
    set({
      selectedTags: tags,
    });
  },

  removeSelectedTag: (tag: string) => {
    set((state) => ({
      selectedTags: state.selectedTags.filter((t) => t !== tag),
    }));
  },

  resetSelectedTags: () => {
    set({
      selectedTags: [],
    });
  },
}));

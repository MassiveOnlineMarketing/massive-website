import { KeywordResultWithTagProp } from "@/serp/serp-types";
import { create } from "zustand"


export type KeywordResultsActions = {
    setKeywordResults: (keywordResults: KeywordResultWithTagProp[]) => void;
    setSelectedTags: (tags: string[]) => void;
    updateKeywordResults: (newKeywordResults: KeywordResultWithTagProp[]) => void;
}

export type KeywordResultsState = {
    keywordResults: KeywordResultWithTagProp[] | []
    selectedTags: string[]
}

export type KeywordResultsStore = KeywordResultsState & KeywordResultsActions

/**
 * Custom hook that creates a Zustand store for managing keyword results and selected tags.
 * @returns An object containing the keywordResults and selectedTags state variables, as well as setter functions for updating them.
 */
export const useKeywordResultsStore = create<KeywordResultsStore>((set) => ({
    keywordResults: [],
    selectedTags: [],

    setKeywordResults: (keywordResults: KeywordResultWithTagProp[]) => {
        set({
            keywordResults: keywordResults
        })
    },
    updateKeywordResults: (newKeywordResults: KeywordResultWithTagProp[]) => {
        set((state) => ({
            keywordResults: [...state.keywordResults, ...newKeywordResults]
        }))
    },

    setSelectedTags: (tags: string[]) => {
        set({
            selectedTags: tags
        })
    },
}))
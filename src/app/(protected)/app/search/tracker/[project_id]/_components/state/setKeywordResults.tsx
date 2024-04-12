'use client';

import React from 'react'

import { useKeywordResultsStore } from '@/lib/zustand/keyword-results-store';
import { KeywordResultWithTagProp } from '@/serp/serp-types';

/**
 * 
 * This component is responsible for setting the initial state of keyword results in the Zustand store
 * after the data is retrieved from the server. It also resets the selected tags to an empty array on each render.
 * It should only be run once to initialize the state.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {KeywordResultWithTagProp[]} props.keywordResults - The initial keyword results data retrieved from the server.
 * 
 * @returns {null} This component does not render anything, it only sets the initial state.
 */
const SetKeywordResults = ({ keywordResults }: { keywordResults: KeywordResultWithTagProp[] }) => {

    const setKeywordResults = useKeywordResultsStore(state => state.setKeywordResults)
    const setSelectedTags = useKeywordResultsStore(state => state.setSelectedTags)

    React.useEffect(() => {
        setSelectedTags([])
        setKeywordResults(keywordResults)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keywordResults])

    return null
}

export default SetKeywordResults
import React from 'react'
import { auth } from '@/auth/auth'

// types
import { KeywordResultWithTagProp } from '@/serp/serp-types'

import { getProjectById } from '@/serp/data/project'
import { getLatestKeywordResultWithTags, projectRouteAuth } from '@/serp/utils/utils'

import Test from './test'

// state setting components 
import SetProjectDetails from './_components/state/setProjectDetails'
import SetKeywordResults from './_components/state/setKeywordResults'


type pageProps = {
    params: {
        project_id: string
    }
}

const Page = async ({ params }: pageProps) => {
    const projectId = params.project_id

    let isUserAuthorized = false
    isUserAuthorized = await projectRouteAuth(projectId)
    if (!isUserAuthorized) {
        return <div>not authorized</div>
    }

    // * Fetch initial state for the project details
    const projectDetails = await getProjectById(projectId)

    // * Fetch initial state for the keyword results
    // TODO: extract to a function
    let keywordResults: KeywordResultWithTagProp[] = []
    try {
        const result = await getLatestKeywordResultWithTags(projectId);
        if (result && result.length > 0) {

            const flattenedKeywords = result.flat();
            const filteredKeywords = flattenedKeywords.filter(result => result !== undefined) as KeywordResultWithTagProp[];

            // check if the result is empty, happens after routing to project page when keywords are processed yet
            if (filteredKeywords[0].id === undefined) {
                console.log('no result')
            } else {
                keywordResults = filteredKeywords
            }

        } else {
            throw new Error("Failed to fetch keywords.");
        }
    } catch (error) {
        console.error("Failed to fetch keywords:", error);
    }


    if (!projectDetails) {
        return <div className='w-full h-full flex items-center justify-center'>loading...</div>
    }

    // * Fetch the refresh token
    const user = await auth()

    return (
        <div className='p-6 mb-16'>
            {projectDetails && <SetProjectDetails projectDetails={projectDetails} />}
            {keywordResults && <SetKeywordResults keywordResults={keywordResults} />}
            <Test
                refresh_token={user?.refreshToken}
            />
        </div>
    )
}

export default Page


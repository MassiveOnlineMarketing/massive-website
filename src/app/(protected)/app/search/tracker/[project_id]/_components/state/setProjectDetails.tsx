'use client';

import React from 'react'

import { useProjectDetailsStore } from '@/lib/zustand/project-details-store';
import { Project } from '@prisma/client'

/**
 * 
 * This component is responsible for setting the initial state of project details in the Zustand store
 * after the data is retrieved from the server. It should only be run once to initialize the state.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Project} props.projectDetails - The initial project details data retrieved from the server.
 * 
 * @returns {null} This component does not render anything, it only sets the initial state.
 */
const SetProjectDetails = ({ projectDetails }: { projectDetails: Project }) => {
    const setProjectDetails = useProjectDetailsStore(state => state.setProjectDetails)

    React.useEffect(() => {
        setProjectDetails(projectDetails)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectDetails])

    return null
}

export default SetProjectDetails
import { useProjectDetailsStore } from '@/lib/zustand/project-details-store'
import { UpdateProjectInfoForm } from '@/serp/components/update-project-info-form'
import { Project } from '@prisma/client'
import React from 'react'

type Props = {
    projectDetails: Project
}

const ProjectDetails = () => {
    const projectDetails = useProjectDetailsStore(state => state)

    if (!projectDetails) (
        <div>Loading...</div>
    )

    return (
        <div className="rounded-2xl shadow-sm bg-white p-4">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Project Stats</h2>
                <UpdateProjectInfoForm />
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                project name: {projectDetails.projectName} - project domain: {projectDetails.domainUrl} - project language: {projectDetails.language} - project country: {projectDetails.country}
            </p>
        </div>
    )
}

export default ProjectDetails
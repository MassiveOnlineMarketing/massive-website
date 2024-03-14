import React from 'react'
import Sidebar from './_components/sidebar'
import { ProjectDetailsProvider } from '@/serp/project-details-context'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ProjectDetailsProvider>
          <Sidebar>
            {children}
          </Sidebar>
      </ProjectDetailsProvider>
    </div>
  )
}

export default layout
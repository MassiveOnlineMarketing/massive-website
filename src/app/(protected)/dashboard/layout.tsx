import React from 'react'
import Sidebar from './_components/sidebar'
import { ProjectDetailsProvider } from '@/serp/project-details-context'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-primary-50'>
      <ProjectDetailsProvider>
          <Sidebar>
            {children}
          </Sidebar>
      </ProjectDetailsProvider>
    </div>
  )
}

export default layout
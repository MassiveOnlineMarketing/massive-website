import React from 'react'
import { ProjectDetailsProvider } from '@/serp/project-details-context'
import { Topbar } from '@/website/partials/topbar'
import { usePathname } from 'next/navigation'
import DashboardLayout from './_components/dashboard-layout'

const layout = ({ children }: { children: React.ReactNode }) => {


  return (
    <ProjectDetailsProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProjectDetailsProvider>
  )
}

export default layout
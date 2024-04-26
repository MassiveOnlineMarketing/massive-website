import React from 'react'
import DashboardLayout from './_components/dashboard-layout'
import TestProvider from './_components/test-provider'

const layout = ({ children }: { children: React.ReactNode }) => {


  return (
    <TestProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </TestProvider>
  )
}

export default layout
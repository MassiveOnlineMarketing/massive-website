'use client'

import React from 'react'
import { KeywordsProvider } from '@/serp/keywords-context'


const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div>
      <KeywordsProvider>
        {children}
      </KeywordsProvider>
    </div>
  )
}

export default layout
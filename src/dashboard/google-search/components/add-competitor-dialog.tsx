import { InputFieldApp } from '@/components/ui/input/fields'
import { useGoogleSearchProjectDetailsStore } from '@/lib/zustand/google-search-details-store'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/website/features/dialog/dialog'
import React from 'react'
import { createCompetitor } from '../data/google-search-competitor'

const AddCompetitorDialog = () => {
  const projectId = useGoogleSearchProjectDetailsStore((state) => state.ProjectDetails?.id)

  const [competitorDomain, setCompetitorDomain] = React.useState<string | null>(null)

  const onSubmit = async () => {
    console.log('submit')
    console.log('projectId', projectId)
    console.log('competitor-domain', competitorDomain)

    if (!projectId || !competitorDomain) return
    const res = await createCompetitor(competitorDomain, projectId)
    console.log('res', res)
  }
  return (
    <Dialog>
      <DialogTrigger>
        Add Competitor
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <p>Add a competitor to your project</p>
        </DialogTitle>
        <p>Content</p>
        <InputFieldApp 
          label="Competitor domain"
          name="competitor-domain"
          placeholder="Enter competitor domain"
          
          onChange={(e) => setCompetitorDomain(e.target.value)}
        />
        <button onClick={onSubmit}>Submit</button>
      </DialogContent>
    </Dialog>
  )
}

export default AddCompetitorDialog
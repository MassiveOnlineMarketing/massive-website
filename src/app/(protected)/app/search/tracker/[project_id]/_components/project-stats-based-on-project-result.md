# On the page
const [sevenLatestProjectResults, setSevenLatestProjectResults] = useState<ProjectResult[]>([])

  useEffect(() => {
    async function fetchResults() {
      if (projectId) {
        const res = await fetch7LatestResults(projectId);

        if (res) {
          setSevenLatestProjectResults(res);
        } else {
          console.error('Failed to fetch 7 latest results');
        }
      }
    }

    fetchResults();
  }, []);


# Component
'use client'

import React from 'react'
import { ProjectResult } from '@prisma/client'
import { KeywordResultWithTagProp } from '@/serp/keywords-context'
import ProjectStatsPieChart from './project-stats-pie-chart'

interface ProjectStatsProps {
    projectResults: ProjectResult[]
    filteredResults: KeywordResultWithTagProp[]
}

const ProjectStats = ({ projectResults, filteredResults }: ProjectStatsProps) => {

    console.log('🟢 filteredResults', filteredResults)
    console.log('🟢 projectResults', projectResults)


    if (!projectResults) {
        return null
    }

    const projectResult: ProjectResult = projectResults[0]



    const data = [
        {
            title: 'Top 3',
            pieColor: '#374151',
            data: [
                { name: 'Top 3', value: projectResult.topThree },
                { name: 'Other', value: projectResult.total - projectResult.topThree }
            ]
        },
        {
            title: 'Top 10',
            pieColor: '#374151',
            data: [
                { name: 'Top 10', value: projectResult.topTen },
                { name: 'Other', value: projectResult.total - projectResult.topTen }
            ]
        },
        {
            title: 'Top 100',
            pieColor: '#374151',
            data: [
                { name: 'Top 100', value: projectResult.topHundred },
                { name: 'Other', value: projectResult.total - projectResult.topHundred }
            ]
        },
        {
            title: 'Average Position',
            pieColor: '#374151',
            data: [
                { name: 'Average Position', value: projectResult.averagePosition },
                { name: 'Other', value: projectResult.total - projectResult.averagePosition }
            ]
        },
        {
            title: 'Improved',
            pieColor: '#28a745',
            data: [
                { name: 'Improved', value: projectResult.improved },
                { name: 'Other', value: projectResult.total - projectResult.improved }
            ]
        },
        {
            title: 'Worsened',
            pieColor: '#dc3545',
            data: [
                { name: 'Worsened', value: projectResult.worsened },
                { name: 'Other', value: projectResult.total - projectResult.worsened }
            ]
        },
    ]

    return (
        <div className='mt-4 w-full grid grid-cols-4 gap-2'>
            {/* Keywords Card*/}
            <div className='py-4 px-6 bg-white rounded-xl shadow-sm w-full h-full flex gap-6 items-center'>
                <p className='text-4xl font-semibold text-gray-700 w-[60px] h-[60px] flex items-center justify-center'>{projectResult.total}</p>
                <div className='h-fit'>
                    <h2 className='mr-auto mb-[20px] text-lg font-semibold text-gray-800'>Keywords</h2>
                    <p className='text-sm text-gray-500 '></p>
                </div>
            </div>
            {/* Other Cards*/}
            {data.map((item, index) => (
                <ProjectStatsPieChart key={index} data={item.data} title={item.title} pieColor={item.pieColor} />
            ))}
        </div>
    )
}

export default ProjectStats


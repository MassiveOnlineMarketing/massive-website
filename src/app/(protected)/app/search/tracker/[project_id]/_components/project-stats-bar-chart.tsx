
import React from 'react'
import { ProjectResult } from '@prisma/client'
import { KeywordResultWithTagProp } from '@/serp/keywords-context'
import ProjectStatsPieChart from './project-stats-pie-chart'

interface ProjectStatsProps {
    filteredResults: KeywordResultWithTagProp[]
}

const ProjectStats = ({ filteredResults }: ProjectStatsProps) => {

    console.log('Render ProjectStats')

    const keywords = filteredResults

    const numberOfKeywords = keywords.length
    let numberOfKeywordsInTop3 = 0
    let numberOfKeywordsInTop10 = 0
    let numberOfKeywordsInTop100 = 0
    let numberOfKeyowrdsBettered = 0
    let numberOfKeyowrdsWorsened = 0
    let averagePosition = 99
    let positionSum = 0

    keywords.forEach(keyword => {
        if (keyword.position && keyword.position <= 3) {
            numberOfKeywordsInTop3++
        }
        if (keyword.position && keyword.position <= 10) {
            numberOfKeywordsInTop10++
        }
        if (keyword.position && keyword.position <= 100) {
            numberOfKeywordsInTop100++
        }
        if (keyword.latestChange && keyword.latestChange > 0) {
            numberOfKeyowrdsBettered++
        }
        if (keyword.latestChange && keyword.latestChange < 0) {
            numberOfKeyowrdsWorsened++
        }
        if (keyword.position) {
            positionSum += keyword.position
        }
    })

    // averagePosition = numberOfKeywords !== 0 ? positionSum / numberOfKeywords : 0;


    const data = [
        {
            title: 'Top 3',
            pieColor: '#374151',
            data: [
                { name: 'Top 3', value: numberOfKeywordsInTop3 },
                { name: 'Other', value: numberOfKeywords - numberOfKeywordsInTop3 }
            ]
        },
        {
            title: 'Top 10',
            pieColor: '#374151',
            data: [
                { name: 'Top 10', value: numberOfKeywordsInTop10 },
                { name: 'Other', value: numberOfKeywords - numberOfKeywordsInTop10 }
            ]
        },
        {
            title: 'Top 100',
            pieColor: '#374151',
            data: [
                { name: 'Top 100', value: numberOfKeywordsInTop100 },
                { name: 'Other', value: numberOfKeywords - numberOfKeywordsInTop100 }
            ]
        },
        {
            title: 'Average Position',
            pieColor: '#374151',
            data: [
                { name: 'Average Position', value: numberOfKeywords },
                { name: 'Other', value: numberOfKeywords - numberOfKeywords }
            ]
        },
        {
            title: 'Improved',
            pieColor: '#28a745',
            data: [
                { name: 'Improved', value: numberOfKeyowrdsBettered },
                { name: 'Other', value: numberOfKeywords - numberOfKeyowrdsBettered }
            ]
        },
        {
            title: 'Worsened',
            pieColor: '#dc3545',
            data: [
                { name: 'Worsened', value: numberOfKeyowrdsWorsened },
                { name: 'Other', value: numberOfKeywords - numberOfKeyowrdsWorsened }
            ]
        },
    ]

    return (
        <div className='mt-4 w-full grid grid-cols-4 gap-2'>
            {/* Keywords Card*/}
            <div className='py-4 px-6 bg-white rounded-xl shadow-sm w-full h-full flex gap-6 items-center'>
                <p className='text-4xl font-semibold text-gray-700 w-[60px] h-[60px] flex items-center justify-center'>{numberOfKeywords}</p>
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


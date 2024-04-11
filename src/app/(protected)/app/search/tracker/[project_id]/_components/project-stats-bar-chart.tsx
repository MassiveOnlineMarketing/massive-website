'use client'

import React from 'react'
import { ProjectResult } from '@prisma/client'

import { format, parse } from 'date-fns';

interface ChartProps {
    id: string,
    projectId: string,
    improved: number,
    worsened: number,
    total: number,
    topThree: number,
    topTen: number,
    topHundred: number,
    noChange: number,
    notFound: number,
    averagePosition: number,
    createdAt: string
}

const ProjectStatsBarChart = ({ props }: { props: ProjectResult[] }) => {

    if (!props) {
        return null
    }
    let reversedData = [...props].reverse().map(item => {
        let date = new Date(item.createdAt);
        return { ...item, createdAt: date.toLocaleDateString('en-GB') };
    });

    console.log('reversedProps', reversedData)

    let chartData = reversedData.map(item => ({ ...item }));

    console.log('props', reversedData.length)
    if (reversedData.length < 7) {
        const additionalEntries = 7 - reversedData.length;
        for (let i = 0; i < additionalEntries; i++) {
            chartData.push({
                improved: 0,
                worsened: 0,
                total: 0,
                topThree: 0,
                topTen: 0,
                topHundred: 0,
                noChange: 0,
                notFound: 0,
                averagePosition: 0,
                createdAt: '0',
                id: '',
                projectId: ''
            })
        }
        console.log('test', chartData)
    }



    return (
        <div className='flex gap-2 w-full h-[160px]'>
            <div className='w-full'>
                chart 1
            </div>
            <div className='w-full'>
                chart 2
            </div>
            <div className='w-full'>
                chart 3
            </div>
            <div className='w-full'>
                chart 4
            </div>
        </div>
    )
}

export default ProjectStatsBarChart


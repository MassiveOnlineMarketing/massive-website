'use client';

import React from 'react'
import { LatestResultsDTO } from '@/dashboard/google-search/serp-types'

import { useKeywords } from "@/dashboard/google-search/hooks/useKeywords";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";

const ResultsNotFound = () => {

  const {
    isDialogOpen,
    setIsDialogOpen,
    confirmDelete,
    cancelDelete,
  } = useKeywords();

  return (
    <div>
      <ProjectStats filteredResults={[]} />
      <DataTable columns={columns('')} data={[]} />

      {/* Dialog for deleting keyword */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            Are you sure you want to delete this keyword?
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-200 hover:bg-red-300 text-red-500 hover:text-red-600 border border-red-300 px-[24px] py-[12px] rounded-lg"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// charts
import { Cell, Pie, PieChart } from "recharts";
import DataTable from '../google-search/_components/table/keyword-table';
import { columns } from '../google-search/_components/table/columns';

export const ProjectStats = ({ filteredResults }: { filteredResults: LatestResultsDTO[] | [] }) => {

  const numberOfKeywords = filteredResults.length;
  let numberOfKeywordsInTop3 = 0;
  let numberOfKeywordsInTop10 = 0;
  let numberOfKeywordsInTop100 = 0;
  let numberOfKeyowrdsBettered = 0;
  let numberOfKeyowrdsWorsened = 0;
  let positionSum = 0;

  filteredResults.forEach((keyword) => {
    if (keyword.position) {
      positionSum += keyword.position;
    }
    if (keyword.position && keyword.position <= 3) {
      numberOfKeywordsInTop3++;
    }
    if (keyword.position && keyword.position <= 10) {
      numberOfKeywordsInTop10++;
    }
    if (keyword.position && keyword.position <= 100) {
      numberOfKeywordsInTop100++;
    }
    if (keyword.latestChange && keyword.latestChange > 0) {
      numberOfKeyowrdsBettered++;
    }
    if (keyword.latestChange && keyword.latestChange < 0) {
      numberOfKeyowrdsWorsened++;
    }
  });

  const data = [
    {
      title: "Top 3",
      pieColor: "#374151",
      data: [
        { name: "Top 3", value: numberOfKeywordsInTop3 },
        { name: "Other", value: numberOfKeywords - numberOfKeywordsInTop3 },
      ],
    },
    {
      title: "Top 10",
      pieColor: "#374151",
      data: [
        { name: "Top 10", value: numberOfKeywordsInTop10 },
        { name: "Other", value: numberOfKeywords - numberOfKeywordsInTop10 },
      ],
    },
    {
      title: "Top 100",
      pieColor: "#374151",
      data: [
        { name: "Top 100", value: numberOfKeywordsInTop100 },
        { name: "Other", value: numberOfKeywords - numberOfKeywordsInTop100 },
      ],
    },
    // {
    //   title: "Average Position",
    //   pieColor: "#374151",
    //   data: [
    //     { name: "Average Position", value: numberOfKeywords },
    //     { name: "Other", value: numberOfKeywords - numberOfKeywords },
    //   ],
    // },
    {
      title: "Improved",
      pieColor: "#28a745",
      data: [
        { name: "Improved", value: numberOfKeyowrdsBettered },
        { name: "Other", value: numberOfKeywords - numberOfKeyowrdsBettered },
      ],
    },
    {
      title: "Worsened",
      pieColor: "#dc3545",
      data: [
        { name: "Worsened", value: numberOfKeyowrdsWorsened },
        { name: "Other", value: numberOfKeywords - numberOfKeyowrdsWorsened },
      ],
    },
  ];

  return (
    <div className="mt-4 w-full grid grid-cols-4 gap-2">
      {/* Keywords Card*/}
      <div className="py-4 px-6 bg-white rounded-xl shadow-sm w-full h-full flex gap-6 items-center">
        <p className="text-4xl font-semibold text-gray-700 w-[60px] h-[60px] flex items-center justify-center">
          {numberOfKeywords}
        </p>
        <div className="h-fit">
          <h2 className="mr-auto mb-[20px] text-lg font-semibold text-gray-800">
            Keywords
          </h2>
        </div>
      </div>
      {/* Other Cards*/}
      {data.map((item, index) => (
        <div
          key={item.title}
          className="py-4 px-6 bg-white rounded-xl shadow-sm w-full h-full flex gap-6 items-center"
        >
          <PieChart width={60} height={60}>
            <Pie
              data={item.data}
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={30}
              fill="#8884d8"
              dataKey="value"
            >
              <Cell fill={item.pieColor} />
              <Cell fill="#cbd5e1" />
            </Pie>
            <g>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#28a745"
              >
                {item.data[0].value}
              </text>
            </g>
          </PieChart>
          <div className="h-fit">
            <h2 className="mr-auto text-lg font-semibold text-gray-800">
              {item.title}
            </h2>
            <p className="text-sm text-gray-500 ">Vs Yesterday</p>
          </div>
        </div>
      ))}
      {/* Avg pos Card*/}
      <div className="py-4 px-6 bg-white rounded-xl shadow-sm w-full h-full flex gap-6 items-center">
        <p className="text-4xl font-semibold text-gray-700 w-[60px] h-[60px] flex items-center justify-center">
          {(positionSum / numberOfKeywords).toFixed(1)}
        </p>
        <div className="h-fit">
          <h2 className="mr-auto mb-[20px] text-lg font-semibold text-gray-800">
            Average Position
          </h2>
        </div>
      </div>
    </div>
  );
};



export default ResultsNotFound
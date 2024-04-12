import { KeywordResultWithTagProp, useKeywordResults } from "@/serp/keywords-context";
import { UpdateProjectInfoForm } from "@/serp/components/update-project-info-form";
import { useProjectDetails } from "@/serp/project-details-context";
import { cn } from "@/lib/utils";

export const ProjectStats = ({ data }: { data: KeywordResultWithTagProp[] }) => {
  const { projectDetails, latestResult, yesterdaysResult, loading } = useProjectDetails()
  const { selectedTags } = useKeywordResults()
  console.log('re render project stats')
  // console.log('tags', selectedTags)

  if (loading) {
    return <div>loading...</div>
  }

  // if (!latestResult || !yesterdaysResult) {
  //   return <div>no data</div>
  // }

  const keywords = data

  const numberOfKeywords = keywords.length
  let numberOfKeywordsInTop3 = 0
  let numberOfKeywordsInTop10 = 0
  let numberOfKeywordsInTop100 = 0
  let numberOfKeyowrdsBettered = 0
  let numberOfKeyowrdsWorsened = 0

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
  })

  // console.log('latestResult', latestResult)
  // console.log('yesterdaysResult', yesterdaysResult)

  return (
    <>
      <div className="rounded-2xl shadow-sm bg-white p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Project Stats</h2>
          <UpdateProjectInfoForm />
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          project name: {projectDetails!.projectName} - project domain: {projectDetails!.domainUrl} - project language: {projectDetails!.language} - project country: {projectDetails!.country}
        </p>
      </div>



      <div className="grid grid-cols-4 mt-4 gap-4">
        {selectedTags.length > 0 ? (
          <>
            <Card title="Keywords" number={numberOfKeywords} />
            <Card title="Top 3" number={numberOfKeywordsInTop3} numberOfKeywords={numberOfKeywords} />
            <Card title="Top 10" number={numberOfKeywordsInTop10} numberOfKeywords={numberOfKeywords} />
            <Card title="Top 100" number={numberOfKeywordsInTop100} numberOfKeywords={numberOfKeywords} />
            <Card title="Bettered" number={numberOfKeyowrdsBettered} numberOfKeywords={numberOfKeywords} />
            <Card title="Worsend" number={numberOfKeyowrdsWorsened} numberOfKeywords={numberOfKeywords} />
          </>
        ) : (
          <>
            <Card title="Keywords" number={latestResult?.total ?? 0} />
            <Card title="Top 3" number={latestResult?.topThree ?? 0} yesterdaysNumber={yesterdaysResult?.topThree ?? 0} numberOfKeywords={latestResult?.total ?? 0} />
            <Card title="Top 10" number={latestResult?.topTen ?? 0} yesterdaysNumber={yesterdaysResult?.topTen ?? 0} numberOfKeywords={latestResult?.total ?? 0} />
            <Card title="Top 100" number={latestResult?.topHundred ?? 0} yesterdaysNumber={yesterdaysResult?.topHundred ?? 0} numberOfKeywords={latestResult?.total ?? 0} />
            <Card title="Bettered" number={latestResult?.improved ?? 0} yesterdaysNumber={yesterdaysResult?.improved ?? 0} numberOfKeywords={latestResult?.total ?? 0} />
            <Card title="Worsend" number={latestResult?.worsened ?? 0} yesterdaysNumber={yesterdaysResult?.worsened ?? 0} numberOfKeywords={latestResult?.total ?? 0} />
          </>
        )}
      </div> 

    </>
  )
}

type CardProps = {
  title: string;
  number: number;
  yesterdaysNumber?: number;
  numberOfKeywords?: number;
}


const Card = ({ title, number, yesterdaysNumber, numberOfKeywords }: CardProps) => {
  // console.log('number', numberOfKeywords)

  let percentageDifference = 0;
  if (yesterdaysNumber) {
    percentageDifference = parseFloat((((number - yesterdaysNumber) / yesterdaysNumber) * 100).toFixed(0));
  }

  return (
    <div className="w-full h-full rounded-2xl shadow-sm p-6 bg-white">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
      <p className={cn(
        "mt-2 text-4xl font-semibold text-gray-700",
      )}>{number}</p>
      {yesterdaysNumber &&
        <div className='mt-4 inline-flex items-center gap-2 text-xs'>
          <p className={cn(
            percentageDifference > 0 ? "bg-green-100 text-green-500" : percentageDifference < 0 ? "bg-red-100 text-red-500" : "bg-white text-gray-800",
            'px-2 py-1 w-fit rounded-[4px]'
          )}>{percentageDifference}%</p>
          <p>vs Yesterday</p>
        </div>
      }
    </div>
  )
}

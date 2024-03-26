import { KeywordResultWithTagProp } from "@/serp/keywords-context";
import { UpdateProjectInfoForm } from "@/serp/components/update-project-info-form";
import { useProjectDetails } from "@/serp/project-details-context";

export const ProjectStats = ({ data }: { data: KeywordResultWithTagProp[] }) => {
  const { projectDetails } = useProjectDetails()

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
      <div>
        <div className="flex items-center justify-between mt-4 gap-4">
          <Card title="Keywords" number={numberOfKeywords} />
          <Card title="Top 3" number={numberOfKeywordsInTop3} numberOfKeywords={numberOfKeywords} />
          <Card title="Top 10" number={numberOfKeywordsInTop10} numberOfKeywords={numberOfKeywords} />
          <Card title="Top 100" number={numberOfKeywordsInTop100} numberOfKeywords={numberOfKeywords} />
          <Card title="Bettered" number={numberOfKeyowrdsBettered} numberOfKeywords={numberOfKeywords} />
          <Card title="Worsend" number={numberOfKeyowrdsWorsened} numberOfKeywords={numberOfKeywords} />
        </div>
      </div>
    </>
  )
}

type CardProps = {
  title: string
  number: number
  numberOfKeywords?: number
}


const Card = ({ title, number, numberOfKeywords }: CardProps) => {
  console.log(number)
  console.log(title)
  return (
    <div className="w-full rounded-2xl shadow-sm p-6 bg-white">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
      <p className="mt-2 text-4xl font-semibold text-gray-700">{number}</p> 
      <div className="mt-4 px-2 py-1 bg-red-50 text-red-600 w-fit rounded-[4px]">13%</div>
    </div>
  )
}
import { KeywordResultWithTagProp } from "@/serp/keywords-context";
import { UpdateProjectInfoForm } from "@/serp/components/update-project-info-form";
import { useProjectDetails } from "@/serp/project-details-context";

export const ProjectStats = ({data}: {data: KeywordResultWithTagProp[]}) => { 
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
      <div className="rounded-md border p-4">
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
          <div className="text-sm w-full text-center py-6 rounded-md border">
            <p className="text-neutral-500 dark:text-neutral-400">Keywords</p>
            <p className="text-lg font-semibold">{numberOfKeywords}</p>
          </div>
          <div className="text-sm w-full text-center py-6 rounded-md border">
            <p className="text-neutral-500 dark:text-neutral-400">Top 3</p>
            <p className="text-lg font-semibold">{numberOfKeywordsInTop3}/{numberOfKeywords}</p>
          </div>
          <div className="text-sm w-full text-center py-6 rounded-md border">
            <p className="text-neutral-500 dark:text-neutral-400">Top 10</p>
            <p className="text-lg font-semibold">{numberOfKeywordsInTop10}/{numberOfKeywords}</p>
          </div>
          <div className="text-sm w-full text-center py-6 rounded-md border">
            <p className="text-neutral-500 dark:text-neutral-400">Top 100</p>
            <p className="text-lg font-semibold">{numberOfKeywordsInTop100}/{numberOfKeywords}</p>
          </div>
          <div className="text-sm w-full text-center py-6 rounded-md border">
            <p className="text-neutral-500 dark:text-neutral-400">Bettered</p>
            <p className="text-lg font-semibold text-green-500">{numberOfKeyowrdsBettered}/{numberOfKeywords}</p>
          </div>
          <div className="text-sm w-full text-center py-6 rounded-md border">
            <p className="text-neutral-500 dark:text-neutral-400">Worsened</p>
            <p className="text-lg font-semibold text-red-500">{numberOfKeyowrdsWorsened}/{numberOfKeywords}</p>
          </div>
        </div>
      </div>
    </>
  )
}
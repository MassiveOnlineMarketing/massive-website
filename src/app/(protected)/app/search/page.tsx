"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

import HomeScreenBanner from "../_components/home-screen-banner";

import {
  TabContainer,
  TabContent,
  TabIndicatorLineAnimated,
  TabTitle,
} from "@/components/ui/tabs";
import { useCurrentUser } from "@/auth/hooks/use-current-user";

// Table
import {
  getUsersGoogleSearchProjectsWithLatestProjectResult,
  GoogleSearchProjectsWithLatestResult,
} from "@/dashboard/google-search/data/google-search-project";
import DataTable from "./_components/search-project-table";
import { columns } from "./_components/search-project-table-columns";
import { LoadingSpinner } from "@/components/loading-spinner";

import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { TableTitle } from "@/components/ui/table";
import { useUserDetailsStore } from "@/lib/zustand/user-details-store";
import { getAccountByUserId } from "@/auth/data/account";

const Page = () => {
  const user = useCurrentUser();

  const setAccount = useUserDetailsStore((state) => state.setAccountDetails);

  useEffect(() => {
    if (!user) return;

    const fetchAccount = async () => {
      const fetchedAccount = await getAccountByUserId(user.id as string);
      // console.log('fetchedAccount test provider', fetchedAccount?.id)

      if (!fetchedAccount) return;

      setAccount(fetchedAccount);
    };

    fetchAccount();
  }, [user]);

  

  const [projectWithLatestResult, setProjectWithLatestResult] = React.useState<
    GoogleSearchProjectsWithLatestResult[] | undefined
  >(undefined);

  useEffect(() => {
    const getTotalKeywordCount = async () => {
      if (user?.id) {
        const userId = user.id;
        try {
          const res =
            await getUsersGoogleSearchProjectsWithLatestProjectResult(userId);
          setProjectWithLatestResult(res);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getTotalKeywordCount();
  }, [user]);

  return (
    <div className="p-3">
      <HomeScreenBanner>Home &gt; search dashboard</HomeScreenBanner>
      <div className="p-6">
        <TabContainer>
          <div className="mb-6 flex relative gap-4 font-normal text-lg pb-3 border-b-[2px] border-gray-200">
            <TabTitle id={1}>Search Tracker</TabTitle>
            <TabTitle id={2}>Status</TabTitle>
            <TabTitle id={3}>Messages</TabTitle>
            <TabTitle id={4}>Updates</TabTitle>
            <TabIndicatorLineAnimated gapSize={16} />
          </div>

          <MessageFromTeam
            className="max-w-[770px] mb-6"
            heading="Message from Team"
            message='Keyword Tracker is a product in development, we are constantly updating and improving the user experience. Your feedback is valuable to us. For any questions regarding assistance and feedback, please feel free to <a class="text-primary-500" href="https://yourwebsite.com/contact">contact us</a>.'
          />

          <div className="bg-white shadow-base rounded-2xl p-8">
            <TabContent id={1}>
              <TableTitle heading="All Search Projects" />
              {projectWithLatestResult ? (
                <DataTable data={projectWithLatestResult} columns={columns()} />
              ) : (
                <>
                  <div className="pb-8 pt-2 flex items-center">
                    <p className="text-2xl leading-8 font-medium text-gray-800">
                      All Search Projects
                    </p>
                  </div>
                  <div className="h-40 w-full flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                </>
              )}
            </TabContent>
            <TabContent id={2}>
              <h1>Tab 2</h1>
            </TabContent>
            <TabContent id={3}>
              <h1>Tab 3</h1>
            </TabContent>
            <TabContent id={4}>
              <h1>Updates</h1>

              <div>
                <p>13/05/2024</p>
                <ul>
                  <li>Add domain verification</li>
                </ul>
              </div>
            </TabContent>
          </div>
        </TabContainer>
      </div>
    </div>
  );
};

export default Page;

type MessageFromTeamProps = {
  heading: string;
  message: string;
  className?: string;
};
const MessageFromTeam = ({
  heading,
  message,
  className,
}: MessageFromTeamProps) => {
  return (
    <div
      className={cn(
        "p-6 bg-white rounded-2xl shadow-base flex gap-2",
        className,
      )}
    >
      <ChatBubbleBottomCenterTextIcon className="min-w-6 h-6 text-gray-700 mt-1 flex-0" />
      <div>
        <p className="mb-2 font-medium text-lg text-gray-800">{heading}</p>
        <p
          className="text-sm text-gray-500"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </div>
  );
};

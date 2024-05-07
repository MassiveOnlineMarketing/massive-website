"use client";
import React, { useEffect } from "react";

import { getNiewsbriefSignups } from "@/dashboard/website/data/niewsbrief";
import { DataTable } from "./_components/table/newsletter-table";
import { newsletterColumns } from "./_components/table/columns";
import { NieuwsbriefSignup } from "@prisma/client";
import { Card } from "@/dashboard/components/card";

const Page = () => {
  const [result, setResult] = React.useState<NieuwsbriefSignup[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const result = await getNiewsbriefSignups();
    setResult(result);
  }

  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7,
  );
  const twoWeeksAgo = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 14,
  );

  function filterSignupsByDate(
    signups: NieuwsbriefSignup[] | null,
    startDate: Date,
    endDate: Date,
  ): NieuwsbriefSignup[] | undefined {
    return signups?.filter((signup) => {
      const date = new Date(signup.createdAt);
      return date > startDate && date <= endDate;
    });
  }

  const newSignupsLastWeek = filterSignupsByDate(result, lastWeek, today);
  const newSignupsTwoWeeksAgo = filterSignupsByDate(
    result,
    twoWeeksAgo,
    lastWeek,
  );

  return (
    <div className="px-6">
      {result ? (
        <div className="grid grid-cols-4 mt-4 gap-4">
          <Card title="Total Signups" value={result?.length} />
          <Card
            title="New Signups this week"
            titleCompair="Last week"
            value={newSignupsLastWeek?.length ?? 0}
            compairValue={newSignupsTwoWeeksAgo?.length}
          />
        </div>
      ) : (
        <p>loading...</p>
      )}
      <div>
        {result ? (
          <DataTable columns={newsletterColumns()} data={result} />
        ) : (
          <p>no data</p>
        )}
        {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default Page;

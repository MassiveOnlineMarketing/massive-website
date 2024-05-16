import React from "react";

import { auth } from "@/auth/auth";

import SearchPage from "./search-page";
import HomeScreenBanner from "../_components/home-screen-banner";

const Page = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="p-3">
      <HomeScreenBanner user={user}>Home &gt; search dashboard</HomeScreenBanner>
      <SearchPage user={user} />
    </div>
  );
};

export default Page;


import React from "react";
import HomeScreenBanner from "./_components/home-screen-banner";
import { auth } from "@/auth/auth";

const page = async () => {

  const session = await auth();
  const user = session?.user;

  return (
    <div className="p-3">
      <HomeScreenBanner user={user}>Home</HomeScreenBanner>
      page
    </div>
  );
};

export default page;

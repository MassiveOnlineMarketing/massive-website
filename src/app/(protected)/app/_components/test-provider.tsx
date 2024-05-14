"use client";

import React, { useEffect } from "react";
import { getAccountByUserId } from "@/auth/data/account";
import { useUserDetailsStore } from "@/lib/zustand/user-details-store";
import { useCurrentUser } from "@/auth/hooks/use-current-user";

// Used to test the use of zustand store in a provider
const TestProvider = ({ children }: { children: React.ReactNode }) => {
  console.log('test provider render')
  
  const currentUser = useCurrentUser();
  const setAccount = useUserDetailsStore((state) => state.setAccountDetails);
  console.log('currentUser', currentUser)

  useEffect(() => {
    if (!currentUser) return;

    const fetchAccount = async () => {
      const fetchedAccount = await getAccountByUserId(currentUser.id as string);
      // console.log('fetchedAccount test provider', fetchedAccount?.id)

      if (!fetchedAccount) return;

      setAccount(fetchedAccount);
    };

    fetchAccount();
  }, [currentUser]);

  return <div>{children}</div>;
};

export default TestProvider;

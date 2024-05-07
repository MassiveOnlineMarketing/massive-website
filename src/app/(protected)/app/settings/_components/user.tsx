"use client";

import { useCurrentUser } from "@/auth/hooks/use-current-user";
import React from "react";

const User = () => {
  const user = useCurrentUser();

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>User</h2>
      <div className="w-fit">
        <p className="min-w-[400px] flex justify-between">
          <span>Id: </span> <span className="ml-auto">{user.id}</span>
        </p>
        <p className="min-w-[400px] flex justify-between">
          <span>Name: </span> <span className="ml-auto">{user.name}</span>
        </p>
        <p className="min-w-[400px] flex justify-between">
          <span>Email: </span> <span className="ml-auto">{user.email}</span>
        </p>
      </div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default User;

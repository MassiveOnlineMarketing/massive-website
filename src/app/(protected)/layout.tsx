import React from "react";
import AuthProvider from "@/auth/authProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};

export default layout;

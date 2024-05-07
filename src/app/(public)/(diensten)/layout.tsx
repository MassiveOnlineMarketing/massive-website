import Footer from "@/website/partials/footer";
import { NavbarWithTopbar } from "@/website/partials/navbar-with-topbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarWithTopbar />

      <main className="relative w-full">{children}</main>

      <Footer />
    </>
  );
};

export default layout;

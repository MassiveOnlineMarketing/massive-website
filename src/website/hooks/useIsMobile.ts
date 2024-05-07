"use client";

import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const hasWindow = typeof window !== "undefined";
      const isMobile = hasWindow
        ? window.matchMedia("(max-width: 767px)").matches
        : false;
      setIsMobile(isMobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;

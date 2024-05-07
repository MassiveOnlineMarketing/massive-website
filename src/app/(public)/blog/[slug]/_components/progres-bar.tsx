"use client";

import React, { useEffect, useState } from "react";

export const ProgressBar = () => {
  const [scroll, setScroll] = useState(0);

  const calculateScrollDistance = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = getDocumentHeight();

    const totalDocScrollLength = docHeight - windowHeight;
    const scrollPosition = Math.floor((scrollTop / totalDocScrollLength) * 100);

    setScroll(scrollPosition);
  };

  const getDocumentHeight = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", calculateScrollDistance);
    return () => {
      window.removeEventListener("scroll", calculateScrollDistance);
    };
  });

  return (
    <div className="fixed top-0 left-0 h-1 z-50 w-full ">
      <div
        style={{ width: `${scroll}%` }}
        className="h-full bg-primary-500 transition-all duration-100"
      ></div>
    </div>
  );
};

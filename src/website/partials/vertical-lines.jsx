import React from "react";

export const VerticalLines = () => {
  return (
    <div className="absolute w-full h-full top-0 left-0 flex justify-center send-to-back">
      <div
        style={{ maxWidth: 1420 }}
        className="relative h-full w-full flex items-center justify-center px-[12px] md:px-12  send-to-back"
      >
        <div
          className={`h-full w-full border-l-[1px] border-r-[1px] border-gray-200  -z-10  `}
        ></div>
        <div className="md:block absolute h-full w-[1px] bg-gray-200 left-1/2 top-0 -z-10 hidden"></div>
      </div>
    </div>
  );
};

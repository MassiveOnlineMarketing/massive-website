import React from "react";

function SearchConsoleLoadingChartSvg() {
  return (
    <svg
      width="276"
      height="96"
      className="recharts-surface"
      viewBox="0 0 276 96"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <clipPath>
          <path d="M5 5H271V91H5z"></path>
        </clipPath>
      </defs>
      <defs>
        <linearGradient id="colorImpressions" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7857FE" stopOpacity="0.15"></stop>
          <stop offset="100%" stopColor="#7857FE" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
      <g className="recharts-layer recharts-area">
        <g className="recharts-layer">
          <path
            fill="url(#colorImpressions)"
            fillOpacity="0.6"
            d="M5 91h44.333L93.667 5 138 91h133H5z"
            className="recharts-curve recharts-area-area"
          ></path>
          <path
            fill="none"
            stroke="#7857FE"
            strokeWidth="2"
            d="M5 91h44.333L93.667 5 138 91h133"
            className="recharts-curve recharts-area-curve"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default SearchConsoleLoadingChartSvg;
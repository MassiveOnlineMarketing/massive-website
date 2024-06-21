import { XAxis, TooltipProps } from "recharts";
import { format, parse } from "date-fns";

function createXAxis(dataKey: string) {
  return (
    <XAxis 
      dataKey={dataKey} 
      interval={0} 
      tickFormatter={(tickItem) => {
        const date = parse(tickItem, "yyyy-MM-dd", new Date());
        return format(date, "MM/dd");
      }}
      tick={{ fontSize: 12, fill: "#9CA3AF" }} 
    />
  );
}

// use <Tooltip content={<CustomTooltip />} />
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<string, string>) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#ffff",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};



export { createXAxis }
import { XAxis } from "recharts";
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


export { createXAxis }
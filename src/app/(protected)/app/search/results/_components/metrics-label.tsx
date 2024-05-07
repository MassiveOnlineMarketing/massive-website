import { cn } from "@/lib/utils";
import PercentageIndicator from "../../../../../../dashboard/components/percentage-indicator";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckInput } from "@/components/ui/input/fields";

interface DataLabelProps {
  title: string;
  value: number;
  previousValue: number;
  show: boolean;
  setShow: (value: boolean) => void;
}

function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num;
  }
}

export const MetricsLabelGoogleChart: React.FC<DataLabelProps> = ({
  title,
  value,
  previousValue,
  show,
  setShow,
}) => (
  <label
    className={cn(
      "w-full px-6 pt-6 pb-7 flex bg-white rounded-t-2xl shadow-base",
      show ? "bg-white" : "opacity-75",
      "hover:opacity-100 cursor-pointer",
    )}
  >
    <div>
      <p className="mb-2 text-sm leading-5 font-normal text-gray-500">
        {title}
      </p>
      <p className="mb-[16px] text-4xl leading-10 font-semibold text-gray-700">
        {formatNumber(Number(value.toFixed(2)))} {title === "CTR" && "%"}
      </p>
      <div>
        <PercentageIndicator value={value} previousValue={previousValue} />
      </div>
    </div>
    <CheckInput
      className="ml-auto mb-auto"
      type="checkbox"
      checked={show}
      onChange={() => setShow(!show)}
    />
  </label>
);

export default MetricsLabelGoogleChart;

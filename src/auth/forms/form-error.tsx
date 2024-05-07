import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface FormErrorProps {
  className?: string;
  message?: string;
}

export const FormError = ({ className, message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive bg-red-500",
        className,
      )}
    >
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

import { cn } from "@/lib/utils";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
  title: {
    subHeading?: string;
    heading?: string;
    paragraph?: string;
    button?: {
      text: string;
      href: string;
    };
  };
};

const AutoTitle: React.FC<TitleProps> = ({ children, className }) => {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>;
};

export default AutoTitle;

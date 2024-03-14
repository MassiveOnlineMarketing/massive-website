import { cn } from "@/lib/utils";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Renders a title component.
 * - flex flex-col gap-4
 *
 * @component
 * @param {React.ReactNode} children - The content to be rendered inside the title component.
 * @param {string} className - Additional CSS class names to be applied to the title component.
 * @returns {React.ReactElement} The rendered title component.
 */
const Title: React.FC<TitleProps> = ({ children, className}) => {

  return (
    <div className={cn(
      'flex flex-col gap-4',
      className
    )}>
      {children}
    </div>
  )
}

export default Title;
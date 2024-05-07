import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

type FlexContainerProps = {
  className?: string;
  columns?: string;
  children: React.ReactNode;
};

type ResponsiveContainerProps = {
  className?: string;
  children: React.ReactNode;
};

type ResponsiveGridContainerProps = VariantProps<
  typeof responsiveContainerVariants
> &
  ResponsiveContainerProps;

const responsiveContainerVariants = cva("grid", {
  defaultVariants: {
    columns: "3",
  },
  variants: {
    columns: {
      "2": "md:grid-cols-2",
      "3": "md:grid-cols-2 xl:grid-cols-3",
      "4": "grid-cols-4",
      "5": "grid-cols-5",
      "6": "grid-cols-6",
    },
  },
});

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        // Breakpoints REQUIRED breakpoint in tailwind.config.js
        "xs:max-w-[475px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1400px]",
        // Container styles
        "w-full mx-auto px-4 xs:px-0  border-red-500 ",
        className,
      )}
    >
      {children}
    </div>
  );
};

const ResponsiveFlexContainer: React.FC<FlexContainerProps> = ({
  children,
  className,
}) => {
  return (
    <ResponsiveContainer>
      <FlexContainer className={cn(className)}>{children}</FlexContainer>
    </ResponsiveContainer>
  );
};

const ResponsiveGridContainer: React.FC<ResponsiveGridContainerProps> = ({
  className,
  children,
  columns,
}) => {
  return (
    <ResponsiveContainer>
      <GridContainer columns={columns} className={cn(className)}>
        {children}
      </GridContainer>
    </ResponsiveContainer>
  );
};

const FlexContainer: React.FC<FlexContainerProps> = ({
  className,
  columns,
  children,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn("flex flex-wrap ", className)}>
      <div className="w-full overflow-hidden md:w-1/2">{childrenArray[0]}</div>
      <div className="w-full overflow-hidden md:w-1/2">{childrenArray[1]}</div>
    </div>
  );
};

const GridContainer: React.FC<ResponsiveGridContainerProps> = ({
  className,
  children,
  columns,
}) => {
  return (
    <div className={cn(responsiveContainerVariants({ columns }), className)}>
      {children}
    </div>
  );
};

export {
  ResponsiveContainer,
  ResponsiveFlexContainer,
  ResponsiveGridContainer,
  FlexContainer,
  GridContainer,
};

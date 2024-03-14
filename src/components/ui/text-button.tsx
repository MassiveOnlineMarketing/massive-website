import { VariantProps } from "class-variance-authority";
import React from "react";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

interface props
    extends React.AnchorHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof buttonVariants> {
      children: React.ReactNode;
      mbFull?: boolean;
}

const TextButton = React.forwardRef<HTMLParagraphElement, props>(
  (
      { className, option, size, variant, mbFull, ...props },
      ref 
  ) => {
      return (
          <p
              {...props}
              ref={ref} 
              className={cn(
                  buttonVariants({ option, size, variant, className }),
                  mbFull ? 'w-full md:w-fit' : ''
              )}
          >
            {props.children} 
          </p>
      );
  }
);
TextButton.displayName = "TextButton";

export { TextButton };
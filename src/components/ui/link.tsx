import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { BASE_URL } from "../../../routes";

export interface ExternalAnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
  asChild?: boolean;
}

const ExternalAnchor = React.forwardRef<HTMLAnchorElement, ExternalAnchorProps>(
  ({ className, option, size, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        className={cn(buttonVariants({ option, size, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
ExternalAnchor.displayName = "ExternalAnchor";

interface InternalAnchorProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  href: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Renders an internal anchor element.
 *
 * @param className - The CSS class name for the anchor element.
 * @param option - The option for the anchor element.
 * @param size - The size of the anchor element.
 * @param variant - The variant of the anchor element.
 * @param href - The URL for the anchor element.
 * @param props - Additional props for the anchor element.
 * @param ref - The ref for the anchor element.
 * @returns The rendered internal anchor element.
 */
const InternalAnchor = React.forwardRef<HTMLAnchorElement, InternalAnchorProps>(
  ({ className, option, size, variant, href, ...props }, ref) => {
    return (
      <Link
        href={`${BASE_URL}${href}`}
        {...props}
        className={cn(
          buttonVariants({ option, size, variant, className }),
          "flex items-center",
        )}
        ref={ref}
      ></Link>
    );
  },
);
InternalAnchor.displayName = "InternalAnchor";

export { ExternalAnchor, InternalAnchor };

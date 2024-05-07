import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { styles } from "@/styles/styles";

// Types for Heading
export type HeadingProps = VariantProps<typeof headingVariants> &
  React.ComponentPropsWithoutRef<"h1"> & {
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    transition?: string;
  };

// Types for Highlight
export type HighlightProps = VariantProps<typeof highlightVariants> & {
  highlight?: string;
};

// Combined Types for Heading with Highlight
export type HeadingWithHighlightProps = HeadingProps & HighlightProps;

// Types for SubHeading
export type SubHeadingProps = VariantProps<typeof subHeadingVariants> &
  React.ComponentPropsWithoutRef<"h1"> & {
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    className?: string;
  };

// Types for Paragraph
export type ParagraphProps = VariantProps<typeof paragraphVariants> &
  React.ComponentPropsWithoutRef<"p"> & {
    className?: string;
  };

// Heading variant options
export const headingVariants = cva("transition-all", {
  defaultVariants: {
    colorScheme: "default",
  },
  variants: {
    size: {
      "7.5xl": "text-6xl leading-none font-bold xl:text-[80px] md:leading-none",
      "7xl": "text-6xl leading-10 font-bold md:text-7xl md:leading-none",
      "5xl": "text-4xl leading-10 font-semibold md:text-5xl md:leading-tight",
      "4xl": "text-3xl leading-9 font-semibold md:text-4xl md:leading-10",
      "3xl": "text-2xl leading-8 font-semibold md:text-3xl md:leading-9",
      "2xl": "text-base leading-6 font-semibold md:text-2xl md:leading-8",
      xl: "text-base md:text-xl font-semibold leading-7",
      lg: "text-lg leading-7 font-medium",
      base: "text-base leading-6 font-semibold",
      // sm: "text-sm leading-5 font-semibold",
      // xs: "text-xs leading-4 font-semibold",
    },
    colorScheme: {
      default: "text-gray-800 dark:text-gray-100",
      muted: "text-gray-600 dark:text-gray-400",
      accent: "text-indigo-600 dark:text-indigo-400",
      dark: "text-[#1F2937]",
      white: "text-white",
      "gray-700": "text-gray-700",
      "gray-600": "text-gray-600",
      "gray-500": "text-gray-500",
      "gray-400": "text-gray-400",

      "text-primary-500": "text-primary-500",
      "gradient-primary": "text-gradient-primary",
      "gradient-fade-primary": "text-fade-primary-gradient",
    },
    type: {
      icon: "flex gap-[10px] items-center",
    },
  },
});

// SubHeading variant options
export const subHeadingVariants = cva("transition-all w-fit", {
  defaultVariants: {
    size: "xl",
    colorScheme: "default",
  },
  variants: {
    size: {
      xl: "text-xl leading-7 font-semibold",
      lg: "text-base md:text-lg leading-6 font-semibold",
      base: "text-base leading-6 font-semibold",
      sm: "text-sm leading-5 font-semibold",
      xs: "text-xs leading-4 font-semibold",
    },
    colorScheme: {
      default: "text-gray-900 dark:text-gray-100",
      // muted: "text-gray-600 dark:text-gray-400",
      // accent: "text-indigo-600 dark:text-indigo-400",
      purple: "text-purple-600 bg-purple-100 dark:text-purple-400",
      gray: "text-gray-500 bg-gray-50",
      "text-primary-500": "text-primary-500",
      "gradient-primary": "text-gradient-primary",

      // Pill variant
      glass: `${styles.glass}`,
      "glass-dark": `text-gray-50 ${styles.darkGlass} `,
    },
    variant: {
      rounded: "rounded-full",
      box: "rounded-md",
      test: "py-[2px] px-[12px] rounded-[20px] shadow-sm border border-white capitalize",
      base: "py-2 px-4 rounded-full shadow-sm border-2 border-white",
      pill: "py-[6px] px-5 rounded-[20px]",
    },
    type: {
      icon: "flex gap-[10px] items-center",
      glassPillIcon: `${styles.glass} py-[6px] px-5 rounded-[20px] flex gap-[10px] items-center `,
    },
  },
});

// Highlight variant options
export const highlightVariants = cva("transition-all", {
  defaultVariants: {
    colorSchemeHighlight: "default",
  },
  variants: {
    colorSchemeHighlight: {
      default: "text-gray-900 dark:text-gray-100",
      muted: "text-gray-600 dark:text-gray-400",
      accent: "text-indigo-600 dark:text-indigo-400",

      "text-primary-500": "text-primary-500",
      "gradient-primary": "text-gradient-primary",
      "gradient-fade-primary": "text-fade-primary-gradient",
    },
  },
});

export const paragraphVariants = cva("transition-all", {
  defaultVariants: {
    size: "base",
    colorScheme: "default",
  },
  variants: {
    size: {
      xl: "text-xl leading-7",
      lg: "text-lg leading-6",
      base: "text-base leading-6",
      sm: "text-sm leading-5",
      xs: "text-xs leading-4",
    },
    colorScheme: {
      default: "text-gray-900 dark:text-gray-100",
      muted: "text-gray-600 dark:text-gray-400",
      accent: "text-indigo-600 dark:text-indigo-400",
      white: "text-white",

      "gray-800": "text-gray-800",
      "gray-700": "text-gray-700",
      "gray-600": "text-gray-600",
      "gray-500": "text-gray-500",
      "gray-400": "text-gray-400",
    },
  },
});

// Heading component
/**
 * Renders a heading component with optional highlighting.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} [level="h1"] - The heading level (h1, h2, h3, h4, h5, h6, p).
 * @param {string} [size] - The size of the heading.
 * @param {string} [colorScheme="default"] - The color scheme of the heading.
 * @param {string} [className] - Additional CSS class names for the heading.
 * @param {string} [highlight] - The text to highlight within the heading.
 * @param {string} [colorSchemeHighlight] - The color scheme for the highlighted text.
 * @param {string} [transition] - The CSS transition for the heading.
 * @param {string} [type] - The type of the heading.
 * @param {React.ReactNode} children - The content of the heading.
 * @returns {React.ReactNode} The rendered heading component.
 */
const Heading: React.FC<HeadingWithHighlightProps> = ({
  level = "h1",
  size,
  colorScheme = "default",
  className,
  highlight,
  colorSchemeHighlight,
  transition,
  type,
  children,
  ...props
}) => {
  // Options for rendering the correct heading level
  const Component = level as "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

  // Get the correct class names
  const headingClasses = headingVariants({ size, colorScheme, type });
  const highlightClasses = highlightVariants({ colorSchemeHighlight });

  return (
    <Component className={cn(headingClasses, className, transition)} {...props}>
      {highlight && children ? (
        <>
          {children
            .toString()
            .split(highlight)
            .map((part: string, i: number, arr: string[]) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className={cn(highlightClasses, className)}>
                    {highlight}
                  </span>
                )}
              </span>
            ))}
        </>
      ) : (
        children
      )}
    </Component>
  );
};

/**
 * SubHeading component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [level="h1"] - The heading level (h1, h2, h3, h4, h5, h6, p).
 * @param {string} [size="xl"] - The size of the subheading.
 * @param {string} [colorScheme="default"] - The color scheme of the subheading.
 * @param {string} [variant] - The variant of the subheading.
 * @param {string} [className] - Additional CSS class names for the subheading.
 * @param {ReactNode} children - The content of the subheading.
 * @param {string} [type] - The type of the subheading.
 * @returns {JSX.Element} The rendered SubHeading component.
 */
const SubHeading: React.FC<SubHeadingProps> = ({
  level = "h1",
  size = "xl",
  colorScheme = "default",
  variant,
  className,
  children,
  type,
  ...props
}) => {
  // Options for rendering the correct heading level
  const Component = level as "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

  // Get the correct class names
  const subHeadingClasses = subHeadingVariants({
    size,
    colorScheme,
    variant,
    type,
  });

  return (
    <Component className={cn(subHeadingClasses, className)} {...props}>
      {children}
    </Component>
  );
};

/**
 * Renders a paragraph element with customizable size and color scheme.
 *
 * @component
 * @param {React.FC<ParagraphProps>} props - The component props.
 * @param {React.ReactNode} children - The content of the paragraph.
 * @param {string} className - The CSS class name for the paragraph.
 * @param {string} size - The size of the paragraph.
 * @param {string} colorScheme - The color scheme of the paragraph.
 * @returns {JSX.Element} The rendered paragraph element.
 */
const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className,
  size,
  colorScheme,
  ...props
}) => {
  return (
    <p
      className={cn(paragraphVariants({ size, colorScheme }), className)}
      {...props}
      style={{ whiteSpace: "pre-line" }}
    >
      {children}
    </p>
  );
};

export { Heading, SubHeading, Paragraph };

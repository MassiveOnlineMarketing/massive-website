import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { imageProps } from "../../../types/website";

/**
 * Renders a container with an image on either the left or right side.
 *
 * @param image - The image properties.
 * @param imageSide - The side on which the image should be displayed ('left' or 'right').
 * @param containerStyles - Additional styles for the container.
 * @param contentContainerStyles - Additional styles for the content container.
 * @param imageContainerStyles - Additional styles for the image container.
 * @param children - The child components to render.
 * - First child will be rendered on the opposite side of the image.
 * - Second child will be rendered below/ inside the image.
 * @returns The rendered container component.
 */
export const LinksRechtsImageContainer = ({
  image,
  imageSide,
  containerStyles,
  contentContainerStyles,
  imageContainerStyles,
  children,
}: {
  image: imageProps;
  imageSide: "left" | "right";
  containerStyles?: string;
  contentContainerStyles?: string;
  imageContainerStyles?: string;
  children: React.ReactNode;
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={cn(
        `
            flex flex-col xl:flex-row gap-5 justify-between `,
        containerStyles,
      )}
    >
      <div className={cn(`flex-1`, contentContainerStyles)}>
        {childrenArray[0]}
      </div>
      <div
        className={cn(
          `flex-1 flex flex-col ${imageSide === "left" ? "xl:order-first" : ""} `,
          imageContainerStyles,
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={cn(
            "object-cover object-left rounded-2xl",
            image.className,
          )}
        />
        {childrenArray[1]}
      </div>
    </div>
  );
};

import React from "react";
import Image from "next/image";
import { Media } from "@/payload/payload-types";
import { PAYLOAD_BACKEND_URL } from "../../../routes";
import { cn } from "@/lib/utils";

const PayloadImage: React.FC<{ image: Media; className: string }> = ({
  image,
  className,
}) => {
  return (
    <Image
      src={`${PAYLOAD_BACKEND_URL}${image.url || ""}`}
      alt={image.alt}
      width={image.width || 0}
      height={image.height || 0}
      className={cn("mt-20", className)}
    />
  );
};

export default PayloadImage;

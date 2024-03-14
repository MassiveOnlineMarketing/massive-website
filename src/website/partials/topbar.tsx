import { InternalAnchor } from "@/components/ui/link";
import container from "@/styles/styles";
import React from "react";

export const Topbar = () => {
  return (
    <div className="h-11 shadow-sm relative z-50">
      <div
        className={`${container.maxWidthGutter}  h-full items-center md:flex justify-between font-medium text-xs text-gray-600 hidden`}
      >
        <div className="flex gap-12">
          <InternalAnchor href="/kennisbank">Icon Kennisbank</InternalAnchor>
          <InternalAnchor href="/blog">Icon Blog</InternalAnchor>
        </div>
        <div className="flex gap-12">
          <p>+31 6 37 34 90 05</p>
          <InternalAnchor href="/klanten-service">Icon Klanten service</InternalAnchor>
          <p>Taal selectie</p>
        </div>
      </div>
    </div>
  );
};

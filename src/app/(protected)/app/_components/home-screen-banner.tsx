import React from "react";
import { cn } from "@/lib/utils";

import { constants } from "@/styles/styles";
import Credits from "@/dashboard/components/credits";

import { Button } from "@/components/ui/button";

import { MassiveLogoColor } from "@/assets/branding";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { ExtendedUser } from "../../../../../next-auth";

/**
 * Renders the home screen banner component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The breadcrumb to be rendered inside the component.
 * @param {string} props.className - The CSS class name for the component.
 * @returns {JSX.Element} The rendered home screen banner component.
 */
const HomeScreenBanner = ({
  children,
  className,
  user
}: {
  children?: React.ReactNode;
  className?: string;
  user: ExtendedUser | undefined; 
}) => {

  /**
   * Gets the appropriate greeting based on the current hour.
   *
   * @returns {string} The greeting message.
   */
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <div
      className={cn(
        "relative h-[243px] rounded-2xl bg-[url('/app/3d-background-purple-background-abstract-background-windows-3840x1932.png')] bg-no-repeat bg-right bg-auto bg-cover bg-white",
        className,
      )}
    >
      <div className="absolute -translate-y-1/2 top-1/2 left-[42px] flex gap-[18px]">
        <div
          className={`w-[98px] h-[98px] ${constants.glassFill} shadow-md relative gradient-mask glass-settings-banner border-6 rounded-full flex items-center justify-center`}
        >
          <MassiveLogoColor className="w-[54px] h-[32px]" />
        </div>

        <div>
          <div className="mb-2 text-base leading-6 font-medium">
            <p className="text-gray-700">{getGreeting()},</p>
            <p className="text-gray-600">{user?.name}</p>
          </div>
          <div>
            <Button size="sm" className="text-primary-500 bg-white">
              <ShieldCheckIcon className="w-5 h-5 mr-2" />
              Closed Beta
            </Button>
          </div>
        </div>
      </div>

      <Credits user={user} />

      <div className="absolute p-6 left-[26px] bottom-0 w-fit inline-flex items-center gap-2 text-sm leading-5 font-base text-gray-400">
        {children}
      </div>
    </div>
  );
};

export default HomeScreenBanner;

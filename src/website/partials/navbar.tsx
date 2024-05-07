"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { MassiveLogoColor } from "@/assets/branding";
import { constants } from "@/styles/styles";

// contact
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_MULTISTEP_FORM_ROUTE,
} from "../../../routes";
import { InternalAnchor } from "@/components/ui/link";
import { Topbar } from "./topbar";

interface DrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = () => {
  return (
    <header>
      <NavbarTwo />
    </header>
  );
};

const Drawer = ({ isOpen, setIsOpen }: DrawerProps) => {
  return (
    <div
      className={`fixed top-0 left-0 botto-0 w-full h-screen bg-white z-50 transform transition-transform duration-200 ease-in-out ${isOpen ? "-translate-x-0" : "translate-x-full"} md:hidden`}
    >
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <ul className="p-4 mt-20  flex flex-col h-full gap-6">
        {/* <li><InternalAnchor variant='text' href='zakelijke-website-laten-maken'>Website</InternalAnchor></li>
        <li>Process</li>
        <li>Producten</li>
        <li>Over ons</li> */}
        <li>
          <InternalAnchor
            href={DEFAULT_MULTISTEP_FORM_ROUTE}
            size="sm"
            variant="primary"
            className="w-full"
          >
            Contact
          </InternalAnchor>
        </li>
      </ul>
    </div>
  );
};

const NavbarTwo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarStyle, setNavbarStyle] = useState("translate-y-11");

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down
        setNavbarStyle("-translate-y-full");
      } else {
        // Scrolling up
        if (window.scrollY <= 150) {
          // At the top of the page
          setNavbarStyle("translate-y-11");
        } else {
          setNavbarStyle("translate-y-0");
        }
      }
      // Update the last scroll position
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  return (
    <nav>
      <div
        className={`fixed relateive top-0 w-full z-30 transition-transform duration-500 ease-in-out ${navbarStyle}`}
      >
        <div
          className={`px-6 py-7 rounded-b-2xl  max-w-[1300px] mx-auto bg-white ${constants.glassStroke}`}
        >
          <div className=" justify-between flex flex-row ">
            <Link href="/">
              <MassiveLogoColor className="w-14" />
            </Link>

            {/* hamburger */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            <ul className="hidden md:flex items-center gap-6">
              {/* <li><InternalAnchor variant='text' href='zakelijke-website-laten-maken'>Website</InternalAnchor></li>
              <li>Process</li>
              <li>Producten</li>
              <li>Over ons</li> */}
            </ul>

            <ul className="flex gap-4">
              <li>
                <InternalAnchor
                  href={DEFAULT_LOGIN_REDIRECT}
                  size="sm"
                  variant="glass"
                  className="md:block hidden"
                >
                  Login
                </InternalAnchor>
              </li>
              <li>
                <InternalAnchor
                  href={DEFAULT_MULTISTEP_FORM_ROUTE}
                  size="sm"
                  variant="primary"
                  className="md:block hidden"
                >
                  Contact
                </InternalAnchor>
              </li>
            </ul>
          </div>
        </div>

        <div className="absolute w-full left-1/2 -translate-x-1/2 h-11 bg-white -top-11">
          <Topbar />
        </div>
      </div>
      {/* mobile nav */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

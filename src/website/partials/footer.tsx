import { MassiveLogoColor, MassiveLogoGray } from "@/assets/branding";
import {
  FacebookGray,
  InstagramGray,
  LinkedinGray,
  TwitterGray,
} from "@/assets/icons";
import { InternalAnchor } from "@/components/ui/link";
import { Heading, Paragraph } from "@/components/ui/typography/typography";
import container from "@/styles/styles";
import React from "react";
import NiewsbriefSignupBarFooter from "../features/contact/niewsbrief-signup-bar-footer";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { DEFAULT_MULTISTEP_FORM_ROUTE } from "../../../routes";

export default function Footer() {
  return (
    <div
      className={`bg-primary-50 pt-[52px] lg:pt-24 border-t border-gray-200 `}
    >
      <div
        className={`mb-16 md:mb-[120px] max-w-[800px] mx-auto ${container.maxWidthGutterExtraPaddingMd} text-center`}
      >
        <Heading level="h3" size="3xl">
          {footerData.title.heading}
        </Heading>
        <Paragraph size="base" colorScheme="gray-700" className="mt-[20px]">
          {footerData.title.paragraph}
        </Paragraph>
        <InternalAnchor
          href={DEFAULT_MULTISTEP_FORM_ROUTE}
          variant="glass"
          size="sm"
          className="mt-6 mx-3 pr-[10px] "
        >
          Neem Contact op
          <ArrowRightIcon className="w-4 h-4" />
        </InternalAnchor>
      </div>
      <footer
        aria-labelledby="footer-heading"
        className={`${container.maxWidthGutterExtraPaddingMd}`}
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <div className="grid md:grid-flow-col md:justify-between gap-12 ">
          {/* Massive + visie */}
          <div className="row-start-3 md:row-start-2 lg:row-start-1 lg:col-start-1 w-fit max-w-[300px] lg:max-w-[320px]  text-gray-500">
            <InternalAnchor href={`/`}>
              <MassiveLogoGray
                className="w-8 h-8"
                aria-label="Ga naar Massive Online Marketing Home pagina"
              />
              <p className="ml-[6px] font-bold text-xl">Massive</p>
            </InternalAnchor>
            <Paragraph
              size="sm"
              colorScheme="gray-500"
              className="mt-2 font-normal leading-5"
            >
              {footerData.slogan}
            </Paragraph>
          </div>

          {/* Links */}
          <div className="md:row-start-1 md:col-start-1 lg:col-start-2 md:w-fit flex gap-10 xl:gap-[135px] justify-between ">
            <div>
              <h3 className={`text-lg font-medium leading-7 text-gray-800`}>
                {footerData.diensten.title}
              </h3>
              <ul
                role="list"
                className="mt-2 space-y-2 text-base leading-5 text-gray-500"
              >
                {footerData.diensten.list.map((item) => (
                  <li key={item.name}>
                    <InternalAnchor href={item.href}>
                      {item.name}
                    </InternalAnchor>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-medium leading-7 text-gray-800`}>
                {footerData.handigeLinks.title}
              </h3>
              <ul
                role="list"
                className="mt-2 space-y-2 text-base leading-5 text-gray-500"
              >
                {footerData.handigeLinks.list.map((item) => (
                  <li key={item.name}>
                    <InternalAnchor href={item.href}>
                      {item.name}
                    </InternalAnchor>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Niewsbrief */}
          <div className="md:w-fit md:max-w-[350px]">
            <h3 className={`mb-2 text-lg font-medium leading-7 text-gray-800`}>
              Niewsbrief
            </h3>
            <NiewsbriefSignupBarFooter />
          </div>
        </div>

        {/* Socials */}
        <div className="mt-12 md:mt-16 flex justify-center space-x-6 md:justify-normal">
          {footerData.social.map((item) => (
            <a key={item.name} href={item.href}>
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div className=" grid grid-flow-row   gap-4 pb-4 pt-4   text-center text-xs text-gray-500 md:grid-cols-2 md:text-right">
          <div className="flex justify-center gap-2 md:justify-start">
            {footerData.legal.map((item, index) => (
              <React.Fragment key={item.name}>
                <InternalAnchor href={item.href}>{item.name}</InternalAnchor>
                {index < footerData.legal.length - 1 && <div> | </div>}
              </React.Fragment>
            ))}
          </div>

          <div className="h-[1px] w-full bg-gray-300 md:-order-1 md:col-span-2"></div>

          <p className="">&copy; 2020 Massive - All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const footerData = {
  title: {
    heading: "Ontketen het Digitaal Potentieel van Uw Onderneming",
    paragraph:
      "Plan een kosteloos strategisch gesprek in met onze experts en ontdek de concrete stappen om jouw online aanwezigheid te versterken.",
  },
  slogan:
    "All-in-one marketingbureau, gespecialiseerd in kwalitatieve en creatieve webdevelopment, dat ondernemingen begeleidt binnen de online marketing",
  diensten: {
    title: "Diensten",
    list: [
      { name: "Website", href: "/zakelijke-website-laten-maken" },
      { name: "eCommerce", href: "/professionele-webshop-laten-maken" },
      { name: "SEO", href: "/search-engine-optimization" },
      // { name: 'Blog', href: '/blog' }
      // { name: 'SEA', href: '/online-marketing' },
      // { name: 'CMS', href: '#' },
      // { name: 'Steategie', href: '/online-strategie' },
    ],
  },

  kennisbank: {
    title: "Kennisbank",
    list: [
      { name: "Website", href: "#" },
      { name: "eCommerce", href: "#" },
      { name: "Seo", href: "#" },
    ],
  },

  documentatie: {
    title: "Documentatie",
    list: [
      { name: "Code Wiki", href: "#" },
      { name: "SEO Wiki", href: "/docs" },
    ],
  },

  handigeLinks: {
    title: "Handige Links",
    list: [
      { name: "Blog", href: "/blog" },
      // { name: 'Massive Webshop', href: '#' },
      // { name: 'Blog Generator', href: '#' },
      // { name: 'Persona Generator', href: '#' },
      // { name: 'Vacatures', href: '#' },
    ],
  },

  legal: [
    { name: "Privacy Policy", href: "/over-ons/privacybeleid" },
    { name: "Cookie Policy", href: "/over-ons/cookiebeleid" },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61553379522027",
      icon: <FacebookGray />,
    },
    // {
    //   name: 'Twitter',
    //   href: '#',
    //   icon: <TwitterGray />,
    // },
    {
      name: "Instagram",
      href: "https://www.instagram.com/massiveonlinemarketing",
      icon: <InstagramGray />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/massiveonlinemarketing",
      icon: <LinkedinGray />,
    },
  ],
};

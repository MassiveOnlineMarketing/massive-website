import React from "react";
import PageContainer from "./page-container";
import AnimateWhenInView from "@/website/features/animated/intersection-observer";
import { Heading, Paragraph } from "@/components/ui/typography/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { LineChartGradient } from "./charts/line-chart-gradient";
import { RadialChart } from "./charts/radial-chart";
import { Component } from "./charts/shad-radial-chat";

const page = () => {
  return (
    <>
      {/* <PageContainer />
      <AnimateWhenInView classNameInView='showElement' classNameNotInView='hiddenElement'>
        <section>
          <h2>Buy my product</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, voluptatum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, delectus?
          </p>
        </section>
      </AnimateWhenInView>

      <AnimateWhenInView classNameInView='showElement' classNameNotInView='hiddenElement'>
        <section>
          <h2>Buy my product</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, voluptatum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, delectus?
          </p>
        </section>
      </AnimateWhenInView>

      <AnimateWhenInView classNameInView='showElement' classNameNotInView='hiddenElement'>
        <section>
          <h2>Buy my product</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, voluptatum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, delectus?
          </p>
        </section>
      </AnimateWhenInView>

      <AnimateWhenInView classNameInView='showElement' classNameNotInView='hiddenElement'>
        <section>
          <h2>Buy my product</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, voluptatum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, delectus?
          </p>
        </section>
      </AnimateWhenInView> */}

      <TestCharts />
    </>
  );
};

const TestCharts = () => {
  return (
    <div>chart
      <div className="bg-gray-50">
        <RadialChart />

      </div>

      <Component />
      <LineChartGradient />
    </div>
  )
}

const GoogleConsentScreen = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="grid grid-flow-col gap-12 p-4 bg-gray-50 rounded-2xl shadow-base">
        <div className="w-[460px] h-full flex flex-col gap-2">
          <Heading level="h2" size='2xl'>You will be guided to the Google Consent Screen</Heading>
          <p>It is important that you sellect all the boxes as shown in the right.</p>
          <p>We only request the absolute minimum that is needed.</p>
          <div className="p-6 mt-auto bg-white rounded-xl shadow-base flex gap-2">
            <ShieldCheckIcon className="min-w-6 h-6 text-green-500 mt-1 flex-0" />
            <p className="text-sm text-gray-500">
              Our app’s use and transfer of information received from Google APIs will adhere to the <Link className="text-primary-500" href='https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes'>Google API Services User Data Policy</Link>, including the Limited Use requirements.
            </p>
          </div>
          <Button className="ml-auto" variant='primary' size='md'>Continue</Button>
        </div>
        <div className="w-[460px] opacity-50">
          <p className="text-lg">Select what Massive Online Marketing can access</p>

          <div className="inline-flex gap-4 py-6 border-b border-gray-300">
            <div className="flex items-center justify-center w-6 h-6">
              <div className="rounded-full bg-blue-500 w-3 h-3"></div>
            </div>
            <div className="relative">
              <p className="text-gray-400 text-sm">See, edit, create, and delete your Google Ads accounts and data.. Learn more</p>
              <div className="absolute top-0 left-0 w-full h-4 bg-gray-300 z-10 rounded-md"></div>
              <div className="absolute bottom-0 left-0 w-full h-4 bg-gray-300 z-10 rounded-md"></div>
            </div>
            <div className="ml-auto">
              <input type='checkbox' readOnly checked className="w-4 h-4" />
            </div>
          </div>

          <p className="mt-6 text-lg">Because you’re using Sign in with Google, Massive Online Marketing will be able to</p>

          {array.map((item, index) => (
            <div className="w-full inline-flex gap-4 py-4 border-b border-gray-300" key={index}>
              <Image src='/app/download.png' className="w-6 h-6" width={24} height={24} alt='user' />
              <div className="relative">
                <p className="text-gray-400 text-sm">{item}</p>
                <div className="absolute top-0 left-0 w-full h-4 bg-gray-300 z-10 rounded-md"></div>
                <div className="absolute bottom-0 left-b w-full h-4 bg-gray-300 z-10 rounded-md"></div>
              </div>
              <div className="ml-auto">
                <input type='checkbox' readOnly checked className="w-4 h-4 opacity-100" />
              </div>
            </div>
          ))}

          <p className="pt-8 text-lg">Make sure you trust Massive Online Marketing</p>

          <p className="pt-2 text-sm">You may be sharing sensitive info with this site or app. Learn about how Massive Online Marketing will handle your data by reviewing its terms of service and privacy policies. You can always see or remove access in your Google Account.</p>
        </div>
      </div>
    </div>
  )
}

const array = [
  'Associate you with your personal info on Google',
  'See your personal info, including any personal info you\'ve made publicly available',
  'See your primary Google Account email address'
]

export default page;

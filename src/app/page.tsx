"use server";

import Image from "next/image";
import Footer from "@/website/partials/footer";
import Hero from "./_components/hero";
import { Banner } from "./_components/banner";
import Weboplossingen from "./_components/weboplossingen";
import Integratie from "./_components/integratie";
import { Diensten } from "./_components/diensten";
import { GradientWave } from "@/assets/backgrounds";
import Usps from "./_components/usps";
import StrategischAdvies from "../website/sections/section-gesprek";
import ToekomstVisie from "./_components/toekomst-visie";
import WaarWijVoorStaan from "./_components/waar-wij-voor-staan";
import Faq from "./_components/faq";
// import OnsProces from "./_components/ons-proces";
import { NavbarWithTopbar } from "@/website/partials/navbar-with-topbar";

export default async function Home() {
  return (
    <main className="relative w-full">
      {/* verticale lijnen */}
      <VerticalLines />

      <div className="relative">
        <Image
          src={"/home/mesh-gradient-hero-1920x1090.jpg"}
          width={1920}
          height={1090}
          alt="hero background gradient"
          className="absolute top-0 left-0 -z-20 h-full w-full mx-auto"
        />

        {/* <Navbar /> */}
        <NavbarWithTopbar />

        <Hero />

        <div className="absolute -bottom-[145px] w-full">
          <Banner />
        </div>
      </div>

      <div className="h-20 mlg:h-[300px] "></div>

      <Weboplossingen />

      <Integratie />

      <div className="relative">
        <Diensten />

        <GradientWave className="absolute bottom-0 md:top-1/4 left-0 -z-10" />
      </div>

      <Usps />

      <StrategischAdvies />

      <ToekomstVisie />

      <WaarWijVoorStaan />

      {/* <OnsProces /> */}

      <Faq />

      <Footer />
    </main>
  );
}

const VerticalLines = () => {
  return (
    <div className="absolute -z-10 w-full h-full top-0 left-0">
      <div className="relative h-full w-full flex items-center justify-center">
        <div
          className={`absolute h-full w-full border-l-[1px] border-r-[1px] border-gray-200  -z-10 max-w-[1324px]`}
        ></div>
        <div className="md:block absolute h-full w-[1px] bg-gray-200 left-1/2 top-0 -z-10 hidden"></div>
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import FirstSec from "./First-Section/FirstSec";
import SecondSection from "./Second-Section/SecondSection";
import ThirdSec from "./Third-Section/ThirdSec";
import DrawerComp from "./Drawer/DrawerComp";
import { GiBeachBag } from "react-icons/gi";
import { Link } from "react-router-dom";
import { HomeIcon, FolderIcon, ShoppingBagIcon, UserIcon } from "lucide-react";

const MainHeader = () => {
  return (
    <div dir="ltr" className="bg-[#284980] px-[10%] w-full">
      {" "}
      {/* LTR فقط للهيدر */}
      <div className="container mx-auto">
        {/* شاشة كبيرة */}
        <div className="hidden md:block">
          <div className="sec1 w-full">
            <FirstSec />
          </div>

          <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>

          <div className="sec2">
            <SecondSection />
          </div>

          <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>

          <div className="sec3">
            <ThirdSec />
          </div>
        </div>

        {/* شاشة صغيرة */}
        <div className="block md:hidden py-6 sm:px-10">
          <div className="flex items-center justify-between">
            {/* اللوجو */}
            <Link to={"/"} className="flex items-center w-[60%] sm:w-[50%]">
              <GiBeachBag
                className="text-white text-4xl sm:text-5xl cursor-pointer"
                aria-label="Logo Icon"
              />
              <p
                dir="auto"
                className="pl-2 text-white text-lg sm:text-2xl cursor-pointer"
              >
                <span className="text-[#f8c530]">Excellence</span> Furas
              </p>
            </Link>

            {/* Drawer */}
            <div className="z-[10000]">
              <DrawerComp />
            </div>

            {/** أزرار التنقل السفلي */}
            <nav className="fixed bottom-0 left-0 w-full bg-[#284980] text-white flex justify-around py-3 md:hidden shadow-lg z-[1000]">
              <Link to={"/"} className="flex flex-col items-center">
                <HomeIcon className="w-6 h-6" aria-label="Home Icon" />
                <span className="text-xs">Home</span>
              </Link>
              <Link
                to={"/category-page"}
                className="flex flex-col items-center"
              >
                <FolderIcon className="w-6 h-6" aria-label="Categories Icon" />
                <span className="text-xs">Categories</span>
              </Link>
              <Link
                to={"/product-category/allproducts"}
                className="flex flex-col items-center"
              >
                <ShoppingBagIcon
                  className="w-6 h-6"
                  aria-label="Products Icon"
                />
                <span className="text-xs">Products</span>
              </Link>
              <Link to={"/my-account"} className="flex flex-col items-center">
                <UserIcon className="w-6 h-6" aria-label="Account Icon" />
                <span className="text-xs">Account</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;

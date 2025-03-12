import React, { useState } from "react";
import { Drawer, Button, IconButton, Tooltip } from "@material-tailwind/react";
import { IoMdMenu } from "react-icons/io";
import BrowseCollectionDrawer from "./BrowseCollection/BrowseCollectionDrawer";
import NewProductDrawer from "./NewProduct/NewProductDrawer";
import BrandsDrawer from "./Brands/BrandsDrawer";
import SpecialOffersDrawer from "./SpecialOffers/SpecialOffersDrawer";
import QuickFindDrawer from "./QuickFind/QuickFindDrawer";
import ContactDrawer from "./Contact/ContactDrawer";
import SpringSalesDrawer from "./SpringSales/SpringSalesDrawer";
import { Link } from "react-router-dom";
import { GiBeachBag } from "react-icons/gi";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const DrawerComp = () => {
  const [openRight, setOpenRight] = useState(false);

  const openDrawerRight = () => setOpenRight(true);

  const closeDrawerRight = () => setOpenRight(false);

  const faceAndTwitterStyle = `w-full transition-transform hover:bg-blue-500 bg-[#284980] border-none shadow-none rounded-4xl px-2 duration-500 hover:scale-125 hover:rounded-4xl`;

  const instaStyle = `w-full transition-transform hover:bg-[#e44c6b] bg-[#284980] border-none shadow-none rounded-4xl px-2 duration-500 hover:scale-125 hover:rounded-4xl`;

  return (
    <React.Fragment>
      <Button
        onClick={openDrawerRight}
        className="bg-[#f8c530] sm:p-3 sm:rounded-4xl sm:text-xl text-2xl p-2 rounded-4xl"
      >
        <IoMdMenu aria-label="Menu Icon" />
      </Button>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 px-0 bg-[#284980] backdrop-blur-lg min-h-[100vh] overflow-y-auto"
        overlayProps={{
          className: "bg-black/20 backdrop-blur-md",
        }}
      >
        {/**Header */}
        <div className="mb-6 pl-4 flex items-center justify-between">
          <Link
            to={"/"}
            className="flex items-center w-[70%] "
            onClick={closeDrawerRight}
          >
            <GiBeachBag
              className="text-white text-4xl cursor-pointer"
              aria-label="Logo Icon"
            />
            <p className="pl-2 text-white text-lg sm:text-2xl cursor-pointer">
              <span className="text-[#f8c530]">Excellence</span> Furas
            </p>
          </Link>

          <IconButton variant="text" color="white" onClick={closeDrawerRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
              aria-label="Close Icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>
        <BrowseCollectionDrawer closeDrawerRight={closeDrawerRight} />
        <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>

        <NewProductDrawer closeDrawerRight={closeDrawerRight} />
        <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>

        <BrandsDrawer closeDrawerRight={closeDrawerRight} />
        <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>

        <SpringSalesDrawer closeDrawerRight={closeDrawerRight} />
        <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>

        <QuickFindDrawer closeDrawerRight={closeDrawerRight} />
        <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>

        <ContactDrawer closeDrawerRight={closeDrawerRight} />
        <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>

        <div className="mt-6 w-full flex justify-center">
          <div className="socialMedia flex items-center justify-between w-[60%]">
            <div className="Facebook">
              <Tooltip
                content="Facebook"
                className="bg-[#f8c530] text-[#284980]"
              >
                <Button className={faceAndTwitterStyle} size="sm">
                  <SlSocialFacebook
                    title="Facebook"
                    className="text-xl"
                    aria-label="Facebook Icon"
                  />
                </Button>
              </Tooltip>
            </div>

            <div className="mx-1"></div>

            <div className="Instagram">
              <Tooltip
                content="Instagram"
                className="bg-[#f8c530] text-[#284980]"
              >
                <Button className={instaStyle} size="sm">
                  <FaInstagram
                    title="Instagram"
                    className="text-xl"
                    aria-label="Instagram Icon"
                  />
                </Button>
              </Tooltip>
            </div>

            <div className="mx-1"></div>

            <div className="Twitter">
              <Tooltip
                content="Twitter"
                className="bg-[#f8c530] text-[#284980]"
              >
                <Button className={faceAndTwitterStyle} size="sm">
                  <FaTwitter
                    title="Twitter"
                    className="text-xl"
                    aria-label="Twitter Icon"
                  />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerComp;

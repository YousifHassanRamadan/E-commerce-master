import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { laptop, vision, iphone } from "../../../assets/images";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Technologhy = () => {
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  return (
    <div className="w-full h-[60vh] flex flex-row flex-wrap justify-between lg:mb-[10%] md:mb-[50%] sm:mb-[60%] mb-[100%]">
      {/**vision */}
      <div
        className={`sm:mb-10 mb-10  md:mb-10 lg:mb-0 vision lg:w-[50%] w-[100%] sm:w-[100%]  lg:h-[110%] sm:h-full md:h-full h-auto bg-[#ededed] flex ${
          isRTL ? "flex-row-reverse" : "flex-row"
        } flex-col justify-between rounded-2xl pl-9 transition-transform duration-300 hover:scale-[105%]  cursor-pointer `}
      >
        {/**text */}
        <div className="text flex flex-col justify-evenly">
          {/**header */}
          <div className="header text-[#424a63]">
            <p className="lg:text-[60px] md:text-[50px] sm:text-[40px] text-[40px] font-bold lg:mt-0 md:mt-0 sm:mt-0 mt-6">
              {t("xtra")}
            </p>
            <p className="lg:text-[50px] md:text-[40px] sm:text-[30px] text-[30px] font-semibold md:-mt-0 sm:-mt-0">
              {t("visionsPro")}
            </p>
            <div className="w-[160px] h-[4px] bg-[#ccd1db] ml-0.5 mt-1 "></div>
          </div>

          {/**body */}
          <div className="body text-[#858a99]">
            <p className="lg:mt-0 md:mt-0 sm:mt-0 mt-4">
              {t("xtraVisionProDescription1")}
            </p>
            <p>{t("xtraVisionProDescription2")}</p>
            {/**btn */}
            <div className="btn">
              <Link
                to="/product-category/vision-pro"
                className={
                  isRTL
                    ? "bg-transparent font-thin text-[#345286] mt-5  py-2  rounded transition duration-300 flex items-center"
                    : "bg-transparent font-thin text-[#345286] mt-5  py-2 pr-4 rounded transition duration-300 flex items-center"
                }
              >
                {t("viewAllVisionPro")}
                {isRTL ? (
                  <IoIosArrowRoundBack className="mr-2" />
                ) : (
                  <IoIosArrowRoundForward />
                )}
              </Link>
            </div>
          </div>
        </div>
        {/**img */}
        <div className="img flex sm:flex-col justify-end overflow-hidden">
          <img
            src={vision}
            className="lg:w-full md:w-full sm:w-full w-[40%] object-cover lg:h-[110vh] md:h-auto h-[100%]"
            alt={t("visionsPro")}
          />
        </div>
      </div>

      {/**iphoneAndMac */}

      <div className="iphoneAndMac lg:w-[45%] sm:w-[100%] flex flex-col justify-between lg:ml-2 ">
        {/**mac */}

        <div
          className={`mac mb-10 sm:mb-10 md:mb-10 lg:mb-0 w-full bg-[#ededed] rounded-2xl h-[28vh] flex ${
            isRTL ? "flex-row-reverse" : ""
          } justify-between transition-transform duration-300 hover:scale-[105%]  cursor-pointer`}
        >
          {" "}
          {/**text */}
          <div className="text flex flex-col justify-evenly pl-9 pt-10">
            {/**header */}
            <div className="header text-[#424a63]">
              <p className="text-[22px] font-semibold -mt-6">
                {t("macbookPro")}
              </p>
            </div>

            {/**body */}
            <div className="body text-[#858a99] lg:-mt-5 md:-mt-5 sm:-mt-5 -mt-0">
              <p>{t("macbookProDescription")}</p>
              {/**btn */}
              <div className="btn lg:mt-6 md:mt-6 sm:mt-6 mt-0">
                <Link
                  to="/product-category/macbook"
                  className={
                    isRTL
                      ? "bg-transparent font-thin text-[#345286] mt-5  py-2  rounded transition duration-300 flex items-center"
                      : "bg-transparent font-thin text-[#345286] mt-5  py-2  pr-4 rounded transition duration-300 flex items-center"
                  }
                >
                  {t("viewMacbookItems")}
                  {isRTL ? (
                    <IoIosArrowRoundBack className="mr-2" />
                  ) : (
                    <IoIosArrowRoundForward />
                  )}
                </Link>
              </div>
            </div>
          </div>
          {/**img */}
          <div className="img flex flex-col justify-end overflow-hidden">
            <img
              src={laptop}
              className="w-full object-cover h-[35vh]"
              alt={t("macbookPro")}
            />
          </div>
        </div>

        {/**iPhone */}
        <div
          className={`mac mb-10 sm:mb-10 md:mb-10 lg:mb-0 w-full bg-[#ededed] rounded-2xl h-[28vh] flex ${
            isRTL ? "flex-row-reverse" : ""
          } justify-between transition-transform duration-300 hover:scale-[105%]  cursor-pointer`}
        >
          {" "}
          {/**text */}
          <div className="text flex flex-col justify-evenly pl-9 pt-10">
            {/**header */}
            <div className="header text-[#424a63]">
              <p className="text-[22px] font-semibold -mt-6">
                {t("newIphone")}
              </p>
            </div>

            {/**body */}
            <div className="body text-[#858a99] lg:-mt-5 md:-mt-5 sm:-mt-5 -mt-0">
              <p>{t("newIphoneDescription")}</p>
              {/**btn */}
              <div className="btn lg:mt-6 md:mt-6 sm:mt-6 mt-0">
                <Link
                  to="/product-category/iphone"
                  className={
                    isRTL
                      ? "bg-transparent font-thin text-[#345286] mt-5  py-2 rounded transition duration-300 flex items-center"
                      : "bg-transparent font-thin text-[#345286] mt-5  py-2 pr-4 rounded transition duration-300 flex items-center"
                  }
                >
                  {t("viewIphoneItems")}
                  {isRTL ? (
                    <IoIosArrowRoundBack className="mr-2" />
                  ) : (
                    <IoIosArrowRoundForward />
                  )}
                </Link>
              </div>
            </div>
          </div>
          {/**img */}
          <div className="img flex flex-col justify-end overflow-hidden">
            <img
              src={iphone}
              className="w-full object-cover h-[35vh]"
              alt={t("newIphone")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologhy;

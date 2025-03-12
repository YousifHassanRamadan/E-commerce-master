import React from "react";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import DropdownLanguage from "../Dropdown/DropdownLanguage";
import DropdownCurrency from "../Dropdown/DropdownCurrency";
import { Link } from "react-router-dom";
import { Tooltip, Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import "./FirstSec.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const FirstSec = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLogged } = useSelector((state) => state.authState);

  const faceAndTwitterStyle = `w-full transition-transform hover:bg-blue-500 bg-[#284980] border-none shadow-none rounded-4xl px-2 duration-500 hover:scale-125 hover:rounded-4xl`;
  const instaStyle = `w-full transition-transform hover:bg-[#e44c6b] bg-[#284980] border-none shadow-none rounded-4xl px-2 duration-500 hover:scale-125 hover:rounded-4xl`;

  return (
    <div className="container mx-auto pt-4 flex flex-wrap justify-between pb-2">
      {/* Start Left Section */}
      <div className="fullWidthFirst leftSec flex justify-start items-center lg:w-[60%]">
        <div className="languageChanger">
          <DropdownLanguage />
        </div>

        <span className="w-0.5 mx-2 opacity-25 h-8 bg-white"></span>

        <div className="currency">
          <DropdownCurrency />
        </div>

        <span className="w-0.5 mx-2 opacity-25 h-8 bg-white"></span>

        <div className="mostQuestions ml-4">
          <Link
            to="/faq"
            className="text-white duration-300 font-semibold hover:text-[#f8c530] cursor-pointer"
          >
            {t("most_questions")}
          </Link>
        </div>
      </div>
      {/* End Left Section */}

      {/* Start Right Section */}
      <div className="fullWidthIcons rightSec flex flex-wrap justify-between lg:w-[30%] md:w-[40%]">
        <div className="mr-9 socialMedia flex items-center justify-between w-[40%]">
          <div className="Facebook">
            <Tooltip content="Facebook" className="bg-[#f8c530] text-[#284980]">
              <Button className={faceAndTwitterStyle} size="sm">
                <SlSocialFacebook title="Facebook" className="text-xl" />
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
                <FaInstagram title="Instagram" className="text-xl" />
              </Button>
            </Tooltip>
          </div>

          <div className="mx-1"></div>

          <div className="Twitter">
            <Tooltip content="Twitter" className="bg-[#f8c530] text-[#284980]">
              <Button className={faceAndTwitterStyle} size="sm">
                <FaTwitter title="Twitter" className="text-xl" />
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="singIn flex justify-between items-center w-[50%] -ml-7">
          <div className="div flex w-[100%] justify-end items-center">
            <IoPerson
              className="text-[#f8c530] text-[25px]"
              aria-label="User Icon"
            />
            {isLogged ? (
              <Link
                to="/my-account"
                className="text-white duration-300 hover:text-[#f8c530] cursor-pointer ml-6"
              >
                {t("my_account")}
              </Link>
            ) : (
              <Link
                to="/register"
                className="text-white duration-300 hover:text-[#f8c530] cursor-pointer ml-6"
              >
                {t("login_or_register")}
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* End Right Section */}
    </div>
  );
};

export default FirstSec;

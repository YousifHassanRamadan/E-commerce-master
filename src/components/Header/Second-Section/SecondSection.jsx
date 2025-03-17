import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import { GiBeachBag } from "react-icons/gi";
import SearchBar from "./Search-Bar/SearchBar";
import { Tooltip, Button } from "@material-tailwind/react";
import Cart from "./Cart/Cart";
import "./SecondSec.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SecondSection = () => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);

  const { favourites } = useSelector((state) => state.favouriteState);

  return (
    <div className="flex flex-wrap justify-between items-center">
      {/** Start logo */}
      <div className="fullWidth leftSec flex flexWrapQuary justify-between items-center py-5 ">
        <Link to={"/"} className="icon flex justify-start items-center w-[50%]">
          <GiBeachBag
            aria-label="Logo Icon"
            className="text-white text-6xl cursor-pointer"
          />
          <p className="pl-3 text-white text-3xl cursor-pointer">
            <span className="text-[#f8c530] ">Excellence</span> Furas
          </p>
        </Link>
        {/** End logo */}

        {/** Start Search */}
        <div className="searchBar w-full flexQuary">
          <SearchBar />
        </div>
        {/** End Search */}
      </div>

      {/**support and icons */}
      <div className="fullWidth rightSec flex justify-between items-center">
        {/** Start Support Center */}
        <div className="supportCenter cursor-pointer">
          <p className="text-[#90a9c2] text-[15px] flex justify-center">
            {t("support_center")}
          </p>
          <h2 className="text-white text-xl flex justify-center">
            818-555 67 88
          </h2>
        </div>
        {/** End Support Center */}

        {/** Start icons */}
        <div className="icons flex justify-between items-center">
          {/**MdOutlineCompareArrows */}
          <div className="MdOutlineCompareArrows cursor-pointer">
            <Link to={"/compare"}>
              <Tooltip
                content={t("products_compare")}
                className="bg-[#f8c530] text-[#284980]"
              >
                <Button
                  size="sm"
                  className="bg-[#284980] border-none shadow-none hover:shadow-none cursor-pointer"
                >
                  <MdOutlineCompareArrows
                    className="text-white text-2xl"
                    aria-label="Compare Products Icon"
                  />
                </Button>
              </Tooltip>
            </Link>
          </div>
          {/**Products Wishlist */}
          <div className="FaRegHeart cursor-pointer relative">
            <Link to={"/wishlist"}>
              <Tooltip
                content={t("products_wishlist")}
                className="bg-[#f8c530] text-[#284980]"
              >
                <Button
                  size="sm"
                  className="bg-[#284980] border-none shadow-none hover:shadow-none cursor-pointer relative mr-2"
                >
                  <FaRegHeart
                    aria-label="Wishlist Icon"
                    className="text-white text-2xl"
                  />
                  {favourites.length > 0 && localStorage.getItem("token") && (
                    <span className="absolute -top-0 -right-0 bg-[#F0B100] text-[#284980] text-xs rounded-full w-5 h-5 flex justify-center items-center">
                      {favourites.length}
                    </span>
                  )}
                </Button>
              </Tooltip>
            </Link>
          </div>
          {/**cart*/}
          <div className="cart relative">
            <Link to={"/cart"}>
              <Cart />
            </Link>
          </div>
        </div>
        {/** End icons */}
      </div>
    </div>
  );
};

export default SecondSection;

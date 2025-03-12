/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { AirConditioner } from "../../../assets/images";
import { Link } from "react-router-dom";

import { IoIosArrowRoundForward } from "react-icons/io";
import SwiperComp from "./SwiperComp";
import HomeCategories from "./HomeCategories";
import Technologhy from "./Technologhy";
import { Container } from "@mui/material";
import Products from "./Products";
import SpecialOffer from "./SpecialOffer";
import FamousBrands from "./FamousBrands";
import OnSaleProd from "./OnSaleProd";
import ShopMagazine from "./ShopMagazine";
import "./HomeContent.css";
import CarouselComp from "./CarouselComp";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "../../i18n";
import { IoIosArrowRoundBack } from "react-icons/io";
import { handelRTL } from "../../reduxSystem/slices/handleRTLSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../reduxSystem/slices/authSlice";
import { getAllProducts } from "../../reduxSystem/slices/getAllProductsSlice";
import { fetchCart } from "../../reduxSystem/slices/getUserCartSlice";
import { fetchUserAddress } from "../../reduxSystem/slices/GetUserAddressSlice";

const HomeContent = ({ products }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAddress());
  }, []);

  const { userAddress, isAddress } = useSelector(
    (state) => state.userAddressState
  );

  console.log("userAddress", userAddress);

  const { isRTL } = useSelector((state) => state.RTLState);

  const { userData, token } = useSelector((state) => state.authState);
  // console.log("User Data:", userData);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    if (i18n.language === "ar") {
      dispatch(handelRTL(true));
    } else {
      dispatch(handelRTL(false));
    }
  }, [i18n.language]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [token]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <Container maxWidth="xl" className="mt-10">
      {/** Home Appliance And Swiper */}
      <div className="flex flex-wrap items-center justify-between">
        {/** Home Appliance */}
        <div className="editWidth bg-gray-100 w-full sm:w-[80%] md:w-[60%] lg:w-[45%] h-auto md:h-[55vh] rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center transition-transform duration-300 hover:scale-[105%] p-5">
          {/** Text Section */}
          <div className="text flex flex-col w-full md:w-[50%] justify-evenly p-5">
            {/** Header */}
            <div className="header text-[#424a63]">
              <p className="text-xl font-bold">{t("homeAppliance")}</p>
            </div>

            {/** Body */}
            <div className="body text-[#858a99] mt-3 mb-6">
              <p>{t("newHomeApplicationProducts")}</p>
              {/** Button */}
              <div className="btn mt-4">
                <Link
                  to={`/product-category/home-appliance`}
                  className={
                    isRTL
                      ? "bg-transparent font-thin text-[#345286] py-2 rounded transition duration-300 flex items-center"
                      : "bg-transparent font-thin text-[#345286] py-2 pr-4  rounded transition duration-300 flex items-center"
                  }
                >
                  {t("viewHomeItems")}
                  {isRTL ? (
                    <IoIosArrowRoundBack className="mr-2" />
                  ) : (
                    <IoIosArrowRoundForward />
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/** Image Section */}
          <div className="img flex flex-col w-full md:w-[50%] justify-end items-center overflow-hidden">
            <img
              src={AirConditioner}
              className="w-[80%] md:w-full object-cover h-auto md:h-[50%] mt-4 md:mt-16"
              alt={t("homeAppliance")}
            />
          </div>
        </div>
        {/** Swiper */}
        <div className="w-1/2 h-auto editWidthSwiper">
          <SwiperComp products={products} />
        </div>
      </div>

      {/** XtraVision, Mac And iPhone */}
      <div className="py-9 mb-16">
        <Technologhy />
      </div>

      {/** Categories */}
      <HomeCategories />

      {/** Featured New Products */}
      <Products />

      {/** Special Offer Only This Week */}
      <SpecialOffer />

      {/** Famous Brands */}
      <FamousBrands />
      <div className="btn flex justify-center">
        <Link
          to={`/brands`}
          className="mt-10 flex items-center justify-center bg-yellow-500 text-[#284980] font-semibold py-2 px-4 rounded shadow cursor-pointer hover:text-white hover:bg-[#284980] transition duration-200"
        >
          {t("viewAllBrands")}
        </Link>
      </div>

      {/** On Sale Product */}
      <OnSaleProd />

      {/** Shop Magazine */}
      <ShopMagazine />

      {/** Carousel */}
      <CarouselComp />
    </Container>
  );
};

export default HomeContent;

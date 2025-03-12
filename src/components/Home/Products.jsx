import React from "react";
import {
  shamboOut,
  shamboIn,
  bananaOut,
  bananaIn,
  bottleOut,
  bottleIn,
  vrOut,
  vrIn,
  dreameOut,
  dreameIn,
  statueOut,
  statueIn,
  kitchenOut,
  kitchenIn,
} from "../../../assets/images";
import { Link } from "react-router-dom";
import ProductCard from "../Ui-Card/ProductCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

const Products = () => {
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  const { Allproducts, loading } = useSelector(
    (state) => state.allProductsState
  );

  // console.log("all products:", Allproducts);

  return (
    <div className="w-full mt-20">
      {/**Featured-New-Products */}
      <div className="Featured-New-Products flex justify-center items-center mb-16">
        <div className="text">
          <h2 className="flex justify-center text-4xl font-bold text-[#424a63]">
            {t("featuredNewProducts")}
          </h2>
          <p className="text-[#aeb1bb] text-xl">
            {t("exploreOurNewAndHotProducts")}
          </p>
        </div>
      </div>

      {/**ourProducts */}
      <div className="ourProducts lg:grid md:grid lg:grid-cols-4 md:grid-cols-3 grid sm:grid-cols-2 grid-cols-1 gap-9">
        {Allproducts.map((prod) => (
          <ProductCard product={prod} key={prod._id} />
        ))}
      </div>

      {/**See Our Products */}
      <div className="SeeOurProducts w-full flex justify-center my-16">
        <Link
          className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-blue-800 transition cursor-pointer flex items-center"
          to={`/product-category/allproducts`}
        >
          {t("seeOurProducts")}
          {isRTL ? (
            <IoIosArrowRoundBack className="mr-2" />
          ) : (
            <IoIosArrowRoundForward />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Products;

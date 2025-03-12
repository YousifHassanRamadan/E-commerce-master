import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyWishListPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f2f2f2] w-full p-16">
      <div className="header">
        <p className="sm:text-3xl text-2xl font-semibold text-[#284980]">
          {t("favouriteProducts")}
        </p>
      </div>

      <div className="w-full opacity-[8%] h-[2px] rounded bg-gray-500 px-9 mt-5 mb-9"></div>

      <div className="body flex flex-col items-center pt-9">
        <div className="md:text-4xl sm:text-3xl text-2xl font-semibold text-[#284980]">
          {t("yourWishlistIsEmpty")}
        </div>
        <div className="btn mt-9">
          <Link
            to="/product-category/allproducts"
            className="whitespace-nowrap items-center justify-center bg-yellow-500 text-[#284980] py-2 px-4 rounded shadow cursor-pointer hover:text-white hover:bg-[#284980] transition duration-200"
          >
            {t("backToShop")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyWishListPage;

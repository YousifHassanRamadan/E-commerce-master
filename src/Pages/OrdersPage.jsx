import React from "react";
import { FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrdersPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f2f2f2] w-full p-16">
      <div className="w-full bg-[#eaebed] p-9 flex items-center flex-wrap sm:flex-row flex-col justify-between">
        <div className="text flex items-center">
          <p className="text-[#284980] font-semibold mr-1">
            {t("noOrderMadeYet")}
          </p>
          <Link to="/orders" className="ml-2">
            <FaBoxOpen
              className="text-[#1e85be] text-2xl"
              aria-label="No Orders Icon"
            />
          </Link>
        </div>
        <div className="btn mt-3">
          <Link
            to="/brands"
            className="flex whitespace-nowrap items-center justify-center bg-yellow-500 text-[#284980] font-semibold py-2 px-4 rounded shadow cursor-pointer hover:text-white hover:bg-[#284980] transition duration-200"
          >
            {t("viewAllBrands")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

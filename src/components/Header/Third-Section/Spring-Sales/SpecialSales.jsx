import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SpecialSales = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-1.5 editGaps">
      <div className="relative inline-block">
        {/* HOT Badge */}
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
          {t("hot")}
        </span>

        {/* Text */}
        <Link to={"/best-sales"}>
          <span className="text-white font-semibold hover:text-[#f8c530] duration-300 cursor-pointer">
            {t("special_sales")}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SpecialSales;

import React from "react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProductCategory = () => {
  const { t } = useTranslation();

  const categories = [
    "accessories",
    "cars",
    "clothes",
    "electronics",
    "entertainment",
    "furniture",
    "giftCards",
    "homeAppliance",
    "otherProducts",
    "sports",
    "supermarket",
    "uncategorized",
    "watch",
  ];

  return (
    <div className="bg-gray-100 rounded-lg shadow-md">
      <div className="header bg-[#eeefef] px-4 py-3 text-lg font-semibold text-gray-700">
        <p className="text-[#50576e] text-xl font-semibold">
          {t("productCategories")}
        </p>
      </div>
      <div className="body">
        <ul className="p-4 space-y-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className="text-sm flex items-center cursor-pointer hover:text-[#2b7fff] text-[#5E77A0] transition-all duration-300 hover:ml-2"
            >
              <ChevronRight /> {t(category)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCategory;

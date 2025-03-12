import { Container } from "@mui/material";
import React from "react";
import {
  furnitureCatBottom,
  watchCatBottom,
  supermarketCatBottom,
  psCatBottom,
  clothCatBottom,
  accessoriesCatBottom,
  carCatBottom,
  electronicsCatBottom,
  giftCardCatBottom,
  HomeApplianceCatBottom,
  othersCatBottom,
  sportsCatBottom,
} from "../../assets/images";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CategoryPage = () => {
  const { t } = useTranslation();
  const categories = [
    { name: "Accessories", count: 5, image: accessoriesCatBottom },
    { name: "Cars", count: 0, image: carCatBottom },
    { name: "Clothes", count: 4, image: clothCatBottom },
    { name: "Electronics", count: 7, image: electronicsCatBottom },
    { name: "Entertainment", count: 5, image: psCatBottom },
    { name: "Furniture", count: 5, image: furnitureCatBottom },
    { name: "Gift Cards", count: 0, image: giftCardCatBottom },
    { name: "Home Appliance", count: 8, image: HomeApplianceCatBottom },
    { name: "Other Products", count: 3, image: othersCatBottom },
    { name: "Sports", count: 9, image: sportsCatBottom },
    { name: "Supermarket", count: 12, image: supermarketCatBottom },
    { name: "Watch", count: 2, image: watchCatBottom },
  ];

  return (
    <Container maxWidth="xl" className="my-[10%]">
      <div className="Featured-New-Products flex justify-center items-center mb-16">
        <div className="text">
          <h1 className="flex justify-center sm:text-4xl text-2xl font-bold text-[#424a63]">
            {t("featuredNewProducts")}
          </h1>
          <p className="text-[#aeb1bb] text-xl">
            {t("exploreOurNewAndHotProducts")}
          </p>
        </div>
      </div>

      <div className="p-8 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <Link
              to={`/product-category/${category.name.toLowerCase()}`}
              key={index}
            >
              <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition">
                <img
                  src={category.image}
                  alt={`${category.name} category`}
                  className="w-24 h-24 object-cover mb-3"
                />
                <p className="font-semibold text-lg text-[#284980]">
                  {category.name}
                </p>
                <span className="text-gray-500 text-sm">
                  ({category.count})
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CategoryPage;

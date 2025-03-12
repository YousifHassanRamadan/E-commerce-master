import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  clothsSec,
  washingMachineSec,
  iPhoneSec,
  sportsSec,
  entertainmentSec,
  supplementsSec,
  supermarketSec,
  furnitureSec,
} from "../../../assets/images";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CarouselComp = () => {
  const { t } = useTranslation();
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const categoryComp = [
    { name: "cloths", img: clothsSec },
    { name: "homeAppliance", img: washingMachineSec },
    { name: "electronics", img: iPhoneSec },
    { name: "sports", img: sportsSec },
    { name: "entertainment", img: entertainmentSec },
    { name: "supplements", img: supplementsSec },
    { name: "supermarket", img: supermarketSec },
    { name: "furniture", img: furnitureSec },
  ];

  return (
    <div className="relative w-full overflow-hidden py-4">
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10"
        onClick={() => scroll("left")}
      >
        <ChevronLeft size={24} />
      </button>
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth no-scrollbar px-10"
      >
        {categoryComp.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[150px] sm:min-w-[180px]"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-[10rem] mb-9 flex flex-col items-center justify-center">
              <img
                src={category.img}
                alt={t(category.name)}
                className="w-full h-full object-contain"
              />
              <Link
                to={`/product-category/${category.name.toLowerCase()}`}
                className="w-full"
              >
                <p className="text-center py-2 rounded duration-500 hover:bg-[#fdc700] bg-white text-[#284980] text-sm sm:text-base border-none border-white shadow mx-auto">
                  {t(category.name)}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10"
        onClick={() => scroll("right")}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default CarouselComp;

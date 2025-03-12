import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "./SwiperComp.css";

const SwiperComp = ({ products }) => {
  const { t } = useTranslation();
  const isRTL = t.language === "ar";

  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [t.language]);

  return (
    <Swiper
      key={key}
      dir={isRTL ? "rtl" : "ltr"} /**out direction */
      rtl={isRTL} /**inner comp direction */
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {products.map((prod, index) =>
        prod.direction === "left" || prod.direction === "right" ? (
          <SwiperSlide key={index}>
            <div
              className={`w-full flex flex-col sm:flex-row items-center justify-center p-4 min-h-[400px] ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {/* صورة المنتج */}
              <div className="w-full sm:w-1/2 h-[400px] flex justify-center items-center bg-blue-900">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* معلومات المنتج */}
              <div className="w-full sm:w-1/2 bg-white p-6 flex flex-col justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {prod.direction === "left"
                    ? t("appleWatchName")
                    : t("airpodsName")}
                </h3>
                <p className="text-gray-600 my-4">
                  {prod.direction === "left"
                    ? t("appleWatchDescription")
                    : t("airpodsDescription")}
                </p>

                {/* السعر */}
                <p className="text-yellow-500 font-bold text-lg sm:text-xl mb-4">
                  ${prod.price}
                </p>

                {/* زر الطلب */}
                <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition">
                  {prod.startPrice} ${prod.price}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ) : (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px] flex items-center justify-center">
              {/* صورة المنتج */}
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover"
              />

              {/* النصوص والمحتوى */}
              <div className="absolute bg-white editOpacity p-6 rounded-lg shadow-lg text-center w-3/5">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {t("supermarketProductsName")}
                </h3>
                <p className="text-gray-600 sm:my-6 mb-6">
                  {t("supermarketProductsDescription")}
                </p>
                <div className="sm:absolute flex justify-center sm:left-1/2 sm:-translate-x-1/2 lg:-bottom-[30px] sm:-bottom-[20px]">
                  <button className="sm:mt-4 bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-300 transition">
                    See Supermarket Products
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
};

export default SwiperComp;

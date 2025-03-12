import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { HiViewGrid } from "react-icons/hi";
import { MdViewCompact } from "react-icons/md";
import { Select, Option } from "@material-tailwind/react";
import FilterProductCategory from "../components/FilterProductCategory/FilterProductCategory";
import ProductCategory from "../components/ProductCategory/ProductCategory";
import ProductCard from "../components/Ui-Card/ProductCard";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useSelector } from "react-redux";

const ProductCategoryPage = () => {
  const { category } = useParams();

  const { Allproducts, loading } = useSelector(
    (state) => state.allProductsState
  );

  const [switchView, setSwitchView] = useState(false);

  const changeView = () => {
    if (!switchView) {
      setSwitchView(true);
    }
  };

  const changeview2 = () => {
    if (switchView) {
      setSwitchView(false);
    }
  };

  const optionsUl = [
    "popular",
    "topRated",
    "sortedByLatest",
    "sortedByOldest",
    "priceHighToLow",
    "priceLowToHigh",
  ];

  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <Container
      maxWidth="xl"
      className="flex flex-col-reverse md:flex-row justify-between min-h-screen mt-9 mb-[10%] "
    >
      {/**filterAndCategories */}
      <div className="filterAndCategories flex flex-col  lg:w-[20%] md:w-[30%] w-[100%]">
        <FilterProductCategory />

        <div className="my-5"></div>

        <ProductCategory />

        <div className="my-5"></div>
      </div>

      {/**products */}
      <div className="products lg:w-[70%] w-[100%] md:w-[100%] p-5 ">
        <div className="header">
          <div className="category flex flex-col justify-between">
            <p className="text-3xl text-[#424a63] font-semibold">{category}</p>
            <p className="text-[#c8d0de]">{t("showingAllResults")}</p>
          </div>

          <div className="filterAndView flex justify-between items-center mt-5">
            <div className="view flex justify-start w-[45%] max-[1024px]:hidden">
              <HiViewGrid
                onClick={() => changeView()}
                className="text-[#284980] text-2xl cursor-pointer"
              />
              <MdViewCompact
                onClick={() => changeview2()}
                className="text-[#284980] text-2xl cursor-pointer ml-6"
              />
            </div>
            <div className="slecetion flex justify-end  md:w-[45%] w-full">
              <Select variant="outlined" label={t("filter")}>
                {optionsUl.map((title) => (
                  <Option key={title}>{t(title)}</Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div
          className={
            switchView
              ? `ourProducts grid gap-5 lg:grid-cols-2 grid-cols-2   mt-10  `
              : `ourProducts grid  gap-5 lg:grid-cols-3 grid-cols-2    mt-10 `
          }
        >
          {Allproducts.map((prod) => (
            <ProductCard product={prod} key={prod._id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductCategoryPage;

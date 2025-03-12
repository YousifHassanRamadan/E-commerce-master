import React from "react";
import BrowseCollection from "./Browse-Collection/BrowseCollection";
import NewProduct from "./New-Product/NewProduct";
import Brands from "./Brands/Brands";
import SpecialSales from "./Spring-Sales/SpecialSales";
import SpecialOffers from "./Special-Offers/SpecialOffers";
import QuickFind from "./Quick-Find/QuickFind";
import Contact from "./Contact/Contact";
import TrackingOrder from "./Tracking-Order/TrackingOrder";
import { useTranslation } from "react-i18next";
import "./ThirdSec.css";

const ThirdSec = () => {
  const { t } = useTranslation();

  const sections = [
    { name: t("browse_collection"), component: BrowseCollection },
    { name: t("new_product"), component: NewProduct },
    { name: t("brands"), component: Brands },
    { name: t("spring_sales"), component: SpecialSales },
    { name: t("special_offers"), component: SpecialOffers },
    { name: t("quick_find"), component: QuickFind },
    { name: t("contact"), component: Contact },
  ];

  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="w-full flex flex-wrap justify-between items-center mb-4">
        {/** Components */}
        {sections.map(({ name, component: Component }) => (
          <div className="mx-5" key={name}>
            <Component className={`${name} editGaps`} />
          </div>
        ))}
        {/** TrackingOrder */}
        <div className="TrackingOrder flex justify-end">
          <TrackingOrder />
        </div>
      </div>
    </div>
  );
};

export default ThirdSec;

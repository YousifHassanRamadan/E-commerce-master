import React from "react";
import { FaBox } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const TrackingOrder = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-1.5">
      <span className="text-white font-semibold hover:text-[#f8c530] duration-300 cursor-pointer flex items-center">
        <span>
          <FaBox className="text-[#f8c530] mx-2" />
        </span>
        {t("tracking_order")}
      </span>
    </div>
  );
};

export default TrackingOrder;

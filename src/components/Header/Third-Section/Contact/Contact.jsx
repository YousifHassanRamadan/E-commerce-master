import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-1.5">
      <div className="relative inline-block">
        {/* Text */}
        <Link to={"/contact"}>
          <span className="text-white font-semibold hover:text-[#f8c530] duration-300 cursor-pointer">
            {t("contact")}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Contact;

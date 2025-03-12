import { Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TrackingOrdersPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f2f2f2] w-full p-16">
      <div className="header">
        <p className="sm:text-3xl text-2xl font-semibold text-[#284980]">
          {t("trackingOrders")}
        </p>
      </div>

      <div className="w-full opacity-[8%] h-[2px] rounded bg-gray-500 px-9 mt-5 mb-9"></div>

      <div className="form">
        <div className="inputs flex md:justify-between md:flex-row flex-col justify-center items-center">
          <div className="orderId md:w-[40%] w-full">
            <Input
              variant="static"
              label={t("orderID")}
              placeholder={t("enterYourOrderID")}
              className="border-[#284980]"
            />
          </div>
          <div className="Email md:w-[40%] w-full md:mt-0 mt-8">
            <Input
              variant="static"
              label={t("yourEmail")}
              placeholder={t("enterYourEmail")}
              className="border-[#284980]"
            />
          </div>
        </div>
        <div className="btn mt-9">
          <Link
            to="/track-order"
            className="whitespace-nowrap items-center justify-center bg-yellow-500 text-[#284980] py-2 px-4 rounded shadow cursor-pointer hover:text-white hover:bg-[#284980] transition duration-200"
          >
            {t("trackOrder")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackingOrdersPage;

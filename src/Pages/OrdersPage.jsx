import React, { useEffect } from "react";
import { FaBox, FaMoneyBillWave, FaClock, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../reduxSystem/slices/getUserOrderSlice";

const OrdersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.ordersUserState);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <p className="text-center w-full text-lg font-semibold bg-[#f2f2f2]">
        {t("loading")}
      </p>
    );
  }

  return (
    <div className="bg-[#f2f2f2] w-full min-h-screen p-8">
      <h2 className="text-3xl font-bold text-[#284980] mb-6 text-center">
        {t("My Orders")}
      </h2>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white p-8 shadow-lg rounded-md">
          <FaBox className="text-gray-400 text-7xl mb-4" />
          <p className="text-gray-700 text-lg">{t("noOrderMadeYet")}</p>
          <Link
            to="/brands"
            className="mt-5 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            {t("viewAllBrands")}
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 shadow-lg rounded-xl border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {t("Order Id")}: {order._id}
              </h3>
              <p className="text-gray-700 mt-3">
                <span className="font-semibold">{t("Total Amount")}:</span> $
                {order.totalAmount}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">{t("Payment Method")}:</span>{" "}
                {order.paymentMethod.toUpperCase()}
              </p>
              <div className="flex items-center mt-4">
                {order.status === "pending" ? (
                  <FaClock className="text-yellow-500 text-2xl" />
                ) : (
                  <FaCheckCircle className="text-green-500 text-2xl" />
                )}
                <p className="ml-3 text-gray-800 font-medium text-lg">
                  {t(order.status)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

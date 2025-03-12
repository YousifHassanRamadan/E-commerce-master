import React from "react";
import { Helmet } from "react-helmet";
import HomeContent from "../components/Home/HomeContent";
import { Slide1, Slide2, Slide3 } from "../../assets/images";

const productsData = [
  {
    image: Slide1, // Replace with your image URLs
    name: "AirPods 3rd Generation",
    description:
      "AirPods (3rd generation) are sweat and water resistant for non-water sports and exercise, and they are IPX4 rated.",
    price: "289.00",
    direction: "right",
    startPrice: "AirPods From ",
  },
  {
    image: Slide2, // Replace with your image URLs
    name: "Apple Watch Ultra",
    description:
      "A powerful move forward. Custom Apple silicon makes Apple Watch Series 9 more capable, more intuitive, and faster",
    price: "799.00",
    direction: "left",
    startPrice: "Apple Watch From ",
  },
  {
    image: Slide3, // Replace with your image URLs
    name: "Daily Fresh Supermarket Products",
    description:
      "A powerful move forward. Custom Apple silicon makes Apple Watch Series 9 more capable, more intuitive, and faster",
    price: "249.00",
    direction: "blew",
    startPrice: "Supermarket Products From ",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HomeContent products={productsData} />
    </div>
  );
};

export default HomePage;

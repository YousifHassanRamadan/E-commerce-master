import { Container } from "@mui/material";
import {
  shamboOut,
  shamboIn,
  bananaOut,
  bananaIn,
  bottleOut,
  bottleIn,
  vrOut,
  vrIn,
  dreameOut,
  dreameIn,
  statueOut,
  statueIn,
  kitchenOut,
  kitchenIn,
} from "../../assets/images";
import ProductCard from "../components/Ui-Card/ProductCard";
import { useTranslation } from "react-i18next";

const BestSalesPage = () => {
  const { t } = useTranslation();

  const fakeProductsIn = [
    {
      id: 1,
      name: "Organic Natural Bananas",
      price: 79,
      category: "Supermarket",
      image: bananaIn,
      imageHovered: bananaOut,
    },
    {
      id: 2,
      name: "Awake Shower Shampoo Gel",
      price: 45,
      category: "Supermarket",
      image: shamboIn,
      imageHovered: shamboOut,
    },
    {
      id: 3,
      name: "The Sparkling Mineral Water",
      price: 199,
      category: "Supermarket",
      image: bottleIn,
      imageHovered: bottleOut,
    },
    {
      id: 4,
      name: "Apple Vision Pro 512GB (VR)",
      price: 499,
      category: "Electronics",
      image: vrIn,
      imageHovered: vrOut,
    },
    {
      id: 5,
      name: "D10 Plus Robot Vacuum",
      price: 120,
      category: "Kitchen",
      image: dreameIn,
      imageHovered: dreameOut,
    },
    {
      id: 6,
      name: "Under Sink Organizers",
      price: 999,
      category: "Kitchen",
      image: kitchenIn,
      imageHovered: kitchenOut,
    },
    {
      id: 7,
      name: "Couple Figurines Statue",
      price: 232,
      category: "Electronics",
      image: statueIn,
      imageHovered: statueOut,
    },
  ];

  return (
    <Container maxWidth={"lg"} className="w-full my-[10%]">
      <div className="bestSelling flex justify-center items-center mb-16">
        <div className="text text-center">
          <h1 className="text-4xl font-bold text-[#424a63]">
            {t("bestSellingProducts")}
          </h1>
          <p className="text-[#aeb1bb] text-xl mt-2">
            {t("exploreOurHotAndSpringSales")}
          </p>
        </div>
      </div>
      <div className="products rounded-2xl p-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {fakeProductsIn.map((prod) => (
          <ProductCard product={prod} key={prod.id} />
        ))}
      </div>
    </Container>
  );
};

export default BestSalesPage;

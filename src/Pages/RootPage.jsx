import { useSearchParams, Outlet } from "react-router-dom";
import { useEffect } from "react";
import MainHeader from "../components/Header/MainHeader";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { handelRTL } from "../reduxSystem/slices/handleRTLSlice";
import { setCart } from "../reduxSystem/slices/addToCartSlice";
import { setFavourite } from "../reduxSystem/slices/favouriteSlice";

const RootPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // it's a hook to get the URLSearchParams object

  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  //for reading the language from the query, or using the current i18next language as a default
  const language = searchParams.get("language") || i18n.language || "en_US";

  useEffect(() => {
    //  if the language is not equal to "en_US" or "ar_AE" set it to "en_US"
    if (!["en_US", "ar_AE"].includes(language)) {
      setSearchParams({
        ...Object.fromEntries(searchParams), // we used Object.fromEntries to convert URLSearchParams to object to be able to edit it
        language: "en_US",
      });
    } else {
      //  change the language if it's not equal to the current language
      if (i18n.language !== language) {
        i18n.changeLanguage(language);
      }

      document.dir = language === "ar_AE" ? "rtl" : "ltr";

      if (document.dir === "rtl") {
        dispatch(handelRTL(true));
      } else {
        dispatch(handelRTL(false));
      }
    }
  }, [language, i18n, setSearchParams]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedFavourite = localStorage.getItem("favourites");

    if (storedCart) {
      const cart = JSON.parse(storedCart);
      console.log("stored cart", cart);
      dispatch(setCart(cart));
    }

    if (storedFavourite) {
      // ✅ تأكد أن البيانات ليست null
      const storedFavItems = JSON.parse(storedFavourite);
      dispatch(setFavourite(storedFavItems));
    } else {
      dispatch(setFavourite([])); // ✅ إذا لم تكن هناك بيانات، أرسل مصفوفة فارغة لتجنب الأخطاء
    }
  }, []);

  return (
    <div className="w-full">
      <Helmet>
        <title>Excellence Furas - E-commerce</title>
        <meta
          name="description"
          content="Welcome to Excellence Furas, your one-stop shop for all your e-commerce needs. Browse our wide range of products and enjoy special offers."
        />
        <meta
          name="keywords"
          content="e-commerce, online shopping, special offers, electronics, home appliance, sports, furniture, entertainment, supermarket, mobile phones, laptops, tablets, cameras, kitchen appliances, fitness equipment, clothing, shoes, accessories, beauty products, toys, books, music, movies, video games, groceries, health products, outdoor gear, pet supplies, office supplies, automotive products"
        />
      </Helmet>
      <MainHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootPage;

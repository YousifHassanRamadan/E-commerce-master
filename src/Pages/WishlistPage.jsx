import { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/Ui-Card/ProductCard";
import { Container } from "@mui/material";
import WishCard from "../components/Ui-Card/WishCard";
import { fetchFavorites } from "../reduxSystem/slices/getFavouriteSlice";
import Loader from "../components/loader/Loader";

const WishlistPage = () => {
  const { t } = useTranslation();

  const [, forceRender] = useReducer((x) => x + 1, 0);

  const [test, setTest] = useState([]);

  const [checkEmpty, setcheckEmpty] = useState(true);

  const [checkRefresh, setCheckRefresh] = useState(true);

  const dispatch = useDispatch();

  const { favourites, loading } = useSelector(
    (state) => state.getFavouritestate
  );

  const { isLoading } = useSelector((state) => state.favouriteState);

  useEffect(() => {
    dispatch(fetchFavorites());
    forceRender(); // يجبر الصفحة على إعادة التصيير
  }, []);

  useEffect(() => {
    dispatch(fetchFavorites());
    setTest(favourites);
  }, [isLoading]);

  // console.log("favourites", favourites);

  return (
    <Container maxWidth={"xl"} className="w-full mt-[5%]">
      <div className="wishlist flex justify-center items-center mb-16">
        <div className="text">
          <p className="flex justify-center text-4xl font-bold text-[#424a63]">
            {t("myWishlist")}
          </p>
          <p className="text-[#aeb1bb] text-xl mt-2">
            {t("wishlistDescription")}
          </p>
        </div>
      </div>

      {loading && localStorage.getItem("token") ? (
        <div className="flex justify-center items-center min-h-screen">
          {" "}
          <Loader />
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="flex justify-center items-center">
              {" "}
              <Loader />
            </div>
          ) : (
            <div className="ourProducts lg:grid md:grid lg:grid-cols-4 md:grid-cols-3 grid sm:grid-cols-2 grid-cols-1 gap-9">
              {favourites.map((product) => (
                <WishCard
                  key={product._id}
                  product={product}
                  forceRender={forceRender}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default WishlistPage;

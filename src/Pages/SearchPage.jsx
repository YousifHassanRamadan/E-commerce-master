import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../reduxSystem/slices/getAllProductsSlice";
import ProductCard from "../components/Ui-Card/ProductCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { Allproducts } = useSelector((state) => state.allProductsState);

  const category = searchParams.get("category");
  const query = searchParams.get("query");

  useEffect(() => {
    if (query && query.length >= 2) {
      dispatch(getAllProducts({ category, search: query }));
    }
  }, [category, query, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
        🔍 Results for "<span className="text-yellow-500">{query}</span>"
      </h2>

      {Allproducts.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {Allproducts.map((prod) => (
            <ProductCard product={prod} key={prod._id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <img
            src="https://via.placeholder.com/400x300?text=No+Products+Found"
            alt="No products found"
            className="w-64 h-48 object-cover rounded-lg shadow-md"
          />
          <p className="text-gray-600 text-lg font-semibold mt-4">
            ❌ No products found for "
            <span className="text-yellow-500">{query}</span>"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

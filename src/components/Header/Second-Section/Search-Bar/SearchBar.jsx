import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../../reduxSystem/slices/getAllProductsSlice";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce"; // لمنع الاستدعاءات المتكررة

const SearchBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Allcategories } = useSelector((state) => state.getCategoryState);
  const { Allproducts } = useSelector((state) => state.allProductsState);

  const [selectedCategory, setSelectedCategory] = useState(
    Allcategories.length > 0 ? Allcategories[1]?.name : ""
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category.name);
  };

  // تأخير البحث حتى لا يتم استدعاء الـ API مع كل حرف
  const debouncedSearch = debounce((query) => {
    if (query.length >= 2) {
      dispatch(getAllProducts({ category: selectedCategory, search: query }));
    }
  }, 500);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length < 2) {
      setError(true);
      setShowResults(false);
      setNotFound(false);
      return;
    }

    setError(false);
    debouncedSearch(value);
    setShowResults(true);
  };

  const handleSubmit = () => {
    if (searchQuery.length >= 2) {
      navigate(
        `/search-results?category=${selectedCategory}&query=${searchQuery}`
      );
      setSearchQuery("");
      setShowResults(false);
      setNotFound(false);
    }
  };

  useEffect(() => {
    if (Allproducts.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setSearchResults(Allproducts);
    }
  }, [Allproducts]);

  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      <div className="relative flex items-center bg-white shadow-lg rounded-full w-auto">
        <input
          type="text"
          placeholder={
            error ? "Enter at least 2 characters" : t("search_in_products")
          }
          className={`flex-grow px-4 py-2 text-gray-700 bg-transparent outline-none rounded-l-full ${
            error ? "text-red-500 placeholder-red-500" : ""
          }`}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <Listbox value={selectedCategory} onChange={handleSelectedCategory}>
          <div className="relative">
            <Listbox.Button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-full">
              {selectedCategory}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Listbox.Button>
            <Listbox.Options className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {Allcategories.map((category, index) => (
                <Listbox.Option
                  key={index}
                  value={category}
                  className={({ active, selected }) =>
                    `px-4 py-2 cursor-pointer ${
                      active ? "bg-gray-200" : "bg-white"
                    } ${selected ? "font-bold" : ""}`
                  }
                >
                  {category.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        <button
          onClick={handleSubmit}
          className="p-3 bg-yellow-500 rounded-full text-black hover:bg-yellow-600 transition"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {showResults && (
        <div className="absolute top-16 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {notFound ? (
            <div className="p-4 text-center text-gray-500">
              No products found.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {searchResults.map((product) => (
                <Link
                  key={product?._id}
                  to={`/productdetails/${product?._id}`}
                  onClick={() => {
                    setSearchQuery("");
                    setShowResults(false);
                    setNotFound(false);
                  }}
                >
                  <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                    {product?.thumbnail && (
                      <img
                        src={product.thumbnail}
                        alt={product.title || "Product"}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    )}
                    <span className="text-gray-700">
                      {product.title || "Unknown Product"}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

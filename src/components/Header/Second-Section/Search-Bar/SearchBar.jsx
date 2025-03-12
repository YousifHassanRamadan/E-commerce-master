import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const { t } = useTranslation();
  const categories = [
    t("all_categories"),
    t("uncategorized"),
    t("accessories"),
    t("cars"),
    t("clothes"),
    t("electronics"),
    t("entertainment"),
    t("furniture"),
    t("gift_cards"),
    t("home_appliance"),
    t("other_products"),
    t("sports"),
    t("supermarket"),
    t("watch"),
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex quaryFlex items-center justify-center p-4 ">
      <div className="relative flex items-center bg-white shadow-lg rounded-full w-auto">
        {/* Search input */}
        <input
          type="text"
          placeholder={t("search_in_products")}
          className="flex-grow px-4 py-2 text-gray-700 bg-transparent outline-none rounded-l-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/** Select option */}
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
          <div className="relative">
            <Listbox.Button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-full">
              {selectedCategory}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Listbox.Button>
            <Listbox.Options className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {categories.map((category, index) => (
                <Listbox.Option
                  key={index}
                  value={category}
                  className={({ active, selected }) =>
                    `px-4 py-2 cursor-pointer ${
                      active ? "bg-gray-200" : "bg-white"
                    } ${selected ? "font-bold" : ""}`
                  }
                >
                  {category}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* 🔍Search button*/}
        <button className="p-3 bg-yellow-500 rounded-full text-black hover:bg-yellow-600 transition">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

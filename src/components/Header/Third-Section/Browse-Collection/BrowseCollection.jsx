import { useEffect, useState } from "react";
import { Menu, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../../reduxSystem/slices/getAllCategorySlice";

const BrowseCollection = () => {
  const { t } = useTranslation();

  const [openMenu, setOpenMenu] = useState(false);

  const dispatch = useDispatch();

  // const { Allcategories } = useSelector((state) => state.getCategoryState);

  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, [dispatch]);

  // console.log("Allcategories", Allcategories);

  const categories = [
    {
      name: t("electronics"),
      icon: "📱",
      items: [
        t("iphone_15_pro_max"),
        t("macbook_m3"),
        t("airpods_pro"),
        t("xtra_vision_pro"),
        t("smart_watches"),
        t("televisions"),
        t("playstation"),
        t("cleaner_robot"),
        t("others"),
      ],
    },
    {
      name: t("home_appliance"),
      icon: "🏠",
      items: [
        t("refrigerator"),
        t("washing_machine"),
        t("dishwasher"),
        t("vacuum_cleaner"),
        t("steam_iron"),
        t("food_processor"),
        t("juicer"),
        t("others"),
      ],
    },
    {
      name: t("entertainment"),
      icon: "🎮",
      items: [
        t("playstation"),
        t("xbox"),
        t("game_console"),
        t("ps_games"),
        t("gift_cards"),
        t("nostalgic_consoles"),
        t("custom_controllers"),
        t("custom_badges"),
        t("others"),
      ],
    },
    {
      name: t("sports"),
      icon: "⚽",
      items: [
        t("supplements"),
        t("sport_clothes"),
        t("ski_clothes"),
        t("gym_equipment"),
        t("gym_tutorials"),
        t("custom_tools"),
        t("sports_socks"),
        t("sports_underwear"),
      ],
    },
    {
      name: t("supermarket"),
      icon: "🛒",
      items: [
        t("meat_poultry"),
        t("fresh_dairy_products"),
        t("dried_fruits"),
        t("fruitage"),
      ],
    },
  ];

  return (
    <div className="mb-1.5">
      <Menu>
        <MenuHandler>
          <Button className="text-white bg-[#284980] shadow-none hover:shadow-none flex items-center duration-300 hover:text-[#F8C530]">
            <span className=" text-[14px] font-semibold">
              {t("browse_collection")}
            </span>{" "}
            <ChevronDownIcon strokeWidth={2.5} className={`h-3.5 w-3.5 ml-1`} />
          </Button>
        </MenuHandler>
        <MenuList className="flex flex-col lg:flex-row justify-between gap-11 sm:ml-9">
          {categories.map((category, index) => (
            <div
              key={index}
              className="px-5 py-3 hover:outline-none hover:outline-white"
            >
              <Link
                to={`/product-category/${category.name.toLowerCase()}`}
                className="cursor-pointer text-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:ml-2 mb-3 text-[#284980]"
              >
                <span role="img" aria-label={category.name}>
                  {category.icon}
                </span>{" "}
                {category.name}
              </Link>
              <ul className="mt-2 space-y-1">
                {category.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-1 my-3 text-gray-600 hover:text-blue-500 cursor-pointer transition-all duration-300 hover:ml-2"
                  >
                    <ChevronRight className="w-4 h-4 bg-[#d1d2d3] rounded-[7px]" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default BrowseCollection;

import { useState } from "react";
import { Menu, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const QuickFind = () => {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);

  const categories = [
    {
      name: t("categories"),
      items: [
        t("home_appliance"),
        t("electronics"),
        t("sports"),
        t("furniture"),
        t("entertainment"),
        t("supermarket"),
      ],
    },
    {
      name: t("top_tags"),
      items: [
        t("apple"),
        t("furniture"),
        t("laptop"),
        t("ski"),
        t("mobile"),
        t("game"),
      ],
    },
    {
      name: t("quick_access"),
      items: [
        t("about"),
        t("faq"),
        t("my_account"),
        t("orders"),
        t("downloads"),
        t("lost_password"),
      ],
    },
  ];

  return (
    <div className="mb-1.5 -mx-7">
      <Menu>
        <MenuHandler>
          <Button className="text-white bg-[#284980] shadow-none hover:shadow-none flex items-center duration-300 hover:text-[#F8C530]">
            <span className=" text-[14px] font-semibold ">
              {t("quick_find")}
            </span>{" "}
            <ChevronDownIcon strokeWidth={2.5} className={`h-3.5 w-3.5 ml-1`} />
          </Button>
        </MenuHandler>
        <MenuList className="flex flex-col md:flex-row justify-between gap-[5rem] sm:-ml-9">
          {categories.map((category, index) => (
            <div
              key={index}
              className="px-5 hover:outline-none hover:outline-white"
            >
              <h3 className="cursor-pointer text-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:ml-2 text-[#284980]">
                {category.name}
              </h3>
              <ul className="mt-2 space-y-1">
                {category.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center my-2 gap-1 text-gray-600 hover:text-blue-500 cursor-pointer transition-all duration-300 hover:ml-2"
                  >
                    <Link
                      to={`/product-category/${item.toLowerCase()}`}
                      className="flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 bg-[#d1d2d3] rounded-[7px]" />{" "}
                      {item}
                    </Link>
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

export default QuickFind;

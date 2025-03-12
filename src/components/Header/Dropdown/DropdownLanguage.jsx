import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const DropdownLanguage = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  //for reading the language from the query, or using the current i18next language as a default
  const currentLang = searchParams.get("language") || i18n.language || "en_US";

  // ✅ update the language in header
  const [language, setLanguage] = useState(t("language"));

  useEffect(() => {
    setLanguage(t("language"));
  }, [currentLang, t]);

  const changeLanguage = (newLang) => {
    const newLangCode = newLang === "en" ? "en_US" : "ar_AE";

    // for updating the language in the URL
    setSearchParams({
      ...Object.fromEntries(searchParams),
      language: newLangCode,
    });

    // for updating the language in the i18next
    i18n.changeLanguage(newLangCode);
  };

  const categories = [
    { name: t("english"), symbol: "EN", code: "en" },
    { name: t("arabic"), symbol: "ع", code: "ar" },
  ];

  return (
    <Menu>
      <MenuHandler>
        <Button className="text-white bg-[#284980] shadow-none hover:shadow-none flex items-center duration-300 hover:text-[#F8C530]">
          <span className="text-[16px] font-semibold">{language}</span>
          <ChevronDownIcon strokeWidth={2.5} className="h-3.5 w-3.5 ml-1" />
        </Button>
      </MenuHandler>
      <MenuList className="overflow-x-hidden">
        {categories.map((item) => (
          <MenuItem
            key={item.symbol}
            className="flex items-center hover:text-[#2b7fff] text-[#5E77A0] transition-all duration-300 hover:ml-2"
            onClick={() => changeLanguage(item.code)}
          >
            <ChevronRight />
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropdownLanguage;

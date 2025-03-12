import { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { ChevronRight } from "lucide-react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const DropdownCurrency = () => {
  const { t } = useTranslation();

  const currence = {
    name: t("riyal"),
  };

  const currencies = [
    {
      name: t("pound"),
      symbol: "(£)",
    },
    {
      name: t("dirham"),
      symbol: "(د. إ)",
    },
    {
      name: t("riyal"),
      symbol: "(SAR)",
    },
    {
      name: t("euro"),
      symbol: "(€)",
    },
  ];

  return (
    <Menu>
      <MenuHandler>
        <Button className="text-white bg-[#284980] shadow-none hover:shadow-none flex items-center">
          <span className=" text-[16px] font-semibold">{currence.name}</span>{" "}
          <ChevronDownIcon strokeWidth={2.5} className={`h-3.5 w-3.5 ml-1`} />
        </Button>
      </MenuHandler>
      <MenuList className="overflow-x-hidden">
        {currencies.map((item) => (
          <MenuItem
            key={item.symbol}
            className="flex items-center hover:text-[#2b7fff] text-[#5E77A0]  transition-all duration-300 hover:ml-2"
            onClick={() => changeCurrency(item)}
          >
            <ChevronRight />
            {item.name} {item.symbol}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropdownCurrency;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import "./FilterProductCategory.css";

function valuetext(value) {
  return `${10 + value}$`;
}

const FilterProductCategory = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState([10, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md ">
      <div className="header bg-[#eeefef] px-4 py-3 text-lg font-semibold text-gray-700">
        <p className="text-[#50576e] text-xl font-semibold">
          {t("filterByPrice")}
        </p>
      </div>
      <div className="body mx-auto p-5 flex justify-center">
        <div>
          <div className="slider flex justify-center mt-4">
            <Box className={"w-full"}>
              <Slider
                getAriaLabel={() => "Price range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                sx={{
                  color: "#f8c530", // Change the color of the slider
                  "& .MuiSlider-thumb": { backgroundColor: "#f8c530" }, // Thumb color
                  "& .MuiSlider-track": { backgroundColor: "#f8c530" }, // Track color
                  "& .MuiSlider-rail": { backgroundColor: "#ddd" }, // Rail color
                }}
              />
            </Box>
          </div>
          <div className="price flex justify-center my-5">
            <p className="text-[#b8b8b8]">
              ${value[0]} - ${value[1]}
            </p>
          </div>
          <div className="btnFilter flex justify-center ">
            <Button className="bg-[#f8c530] text-[#2b4a7e] w-full">
              {t("filter")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProductCategory;

import React, { useEffect, useState } from "react";
import { Input, Select, Option, Button, Card } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useCountries } from "use-react-countries";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { X } from "lucide-react"; // أيقونة الإغلاق

import {
  addAddress,
  resetIsisAddressAdded,
} from "../../reduxSystem/slices/addAddressSlice";

const AddAddress = ({ setIsAddAddressOpen }) => {
  const { t } = useTranslation();
  const { countries } = useCountries();
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState("");
  const { userAddress, isAddress } = useSelector(
    (state) => state.userAddressState
  );

  const { isAddressEdited } = useSelector((state) => state.editAddressState);

  const validationSchema = Yup.object({
    street: Yup.string().required("Street address is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string()
      .matches(/\d+$/, "Zipcode must be numeric")
      .required("Zipcode is required"),
    homeAddress: Yup.string().required("Home address is required"),
    landmark: Yup.string().required("Landmark is required"),
    country: Yup.string().required("Country is required"),
  });

  const sortedCountries = [...countries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const formik = useFormik({
    initialValues: {
      street: "",
      state: "",
      city: "",
      zipCode: "",
      homeAddress: "",
      landmark: "",
      country: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const finalAddress = { ...values, country: selectedCountry };
      // console.log("finalAddress", finalAddress);

      dispatch(addAddress(finalAddress))
        .unwrap()
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Address Added!",
            text: "Your address has been saved successfully.",
          });
          dispatch(resetIsisAddressAdded());
          resetForm();
          setSelectedCountry("");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Failed to Add Address",
            text: err || "Something went wrong. Please try again!",
          });
        });
    },
  });

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-transparent p-4">
      <Card className="w-full  max-w-md sm:max-w-lg lg:max-w-6xl bg-white shadow-xl p-10 rounded-2xl max-h-[80vh] overflow-y-auto relative">
        {/* زر الإغلاق */}
        <button
          className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 flex items-center justify-center duration-300 hover:rotate-180 rounded-full hover:bg-red-500"
          onClick={() => setIsAddAddressOpen(false)}
        >
          <X className="bg-red-500 text-white" size={20} />
        </button>

        <form onSubmit={formik.handleSubmit} className="space-y-6 mt-5">
          {/* اختيار الدولة */}
          <div className="w-full">
            <Select
              variant="static"
              size="lg"
              label={selectedCountry || t("Select Country")}
              onChange={(value) => {
                setSelectedCountry(value);
                formik.setFieldValue("country", value);
              }}
            >
              {sortedCountries.map(({ name, flags }) => (
                <Option
                  key={name}
                  value={name}
                  className="flex items-center gap-2"
                >
                  <div className="flex">
                    {" "}
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover mr-2"
                    />
                    {name}
                  </div>
                </Option>
              ))}
            </Select>
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-sm mt-2">
                {formik.errors.country}
              </p>
            )}
          </div>

          {/* حقول الإدخال */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              "street",
              "state",
              "city",
              "zipCode",
              "homeAddress",
              "landmark",
            ].map((field) => (
              <div key={field}>
                <Input
                  name={field}
                  variant="static"
                  label={t(field)}
                  placeholder={t(`Enter ${field}`)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field]}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* زر الحفظ */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#284980] text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              {t("Save Address")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddAddress;

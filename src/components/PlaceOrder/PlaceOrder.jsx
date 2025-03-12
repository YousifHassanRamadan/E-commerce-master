import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../reduxSystem/slices/addPlaceOrderSlice";
import Swal from "sweetalert2";

const PlaceOrder = ({ setIsPlaceOrderOpen }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      country: "",
      streetAddress: "",
      homeAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      landmark: "",
    },
    validationSchema: Yup.object({
      country: Yup.string().required("Country is required"),
      streetAddress: Yup.string().required("Street address is required"),
      homeAddress: Yup.string().required("Home address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string().required("ZIP Code is required"),
      phone: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be 10 digits")
        .required("Phone is required"),
      landmark: Yup.string().required("Landmark is required"),
    }),
    onSubmit: (values) => {
      console.log("Order Submitted", values);

      const paymentMethod = "cod";

      // استخراج phone وفصل بقية القيم في كائن جديد
      const { phone, ...addressWithoutPhone } = values;

      const billingDetails = {
        phone,
        address: addressWithoutPhone, // ✅ القيم بدون phone
        paymentMethod,
      };

      dispatch(placeOrder(billingDetails));

      Swal.fire({
        icon: "success",
        title: "Order Placed Successfully!",
        text: "Your order has been placed successfully.",
        confirmButtonColor: "#3085d6",
      });

      console.log("Billing Details:", billingDetails);
    },
  });

  return (
    <div className="relative my-10 w-full max-w-4xl mx-auto p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
      <button
        onClick={() => setIsPlaceOrderOpen(false)}
        className="absolute top-3 right-3 p-2 text-white bg-red-500 rounded-full hover:scale-110 transition-transform"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-[#284980]">
        Billing Details
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Input
          variant="standard"
          type="text"
          label="Country"
          {...formik.getFieldProps("country")}
          error={formik.touched.country && Boolean(formik.errors.country)}
        />
        <Input
          variant="standard"
          type="text"
          label="Street Address"
          {...formik.getFieldProps("streetAddress")}
          error={
            formik.touched.streetAddress && Boolean(formik.errors.streetAddress)
          }
        />
        <Input
          variant="standard"
          type="text"
          label="Home Address"
          {...formik.getFieldProps("homeAddress")}
          error={
            formik.touched.homeAddress && Boolean(formik.errors.homeAddress)
          }
        />
        <Input
          variant="standard"
          type="text"
          label="City"
          {...formik.getFieldProps("city")}
          error={formik.touched.city && Boolean(formik.errors.city)}
        />
        <Input
          variant="standard"
          type="text"
          label="State"
          {...formik.getFieldProps("state")}
          error={formik.touched.state && Boolean(formik.errors.state)}
        />
        <Input
          variant="standard"
          type="text"
          label="ZIP Code"
          {...formik.getFieldProps("zipCode")}
          error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
        />
        <Input
          variant="standard"
          type="text"
          label="Phone"
          {...formik.getFieldProps("phone")}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
        />
        <Input
          variant="standard"
          type="text"
          label="Landmark"
          {...formik.getFieldProps("landmark")}
          error={formik.touched.landmark && Boolean(formik.errors.landmark)}
        />

        <div className="col-span-1 sm:col-span-2">
          <Button type="submit" color="yellow" fullWidth>
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;

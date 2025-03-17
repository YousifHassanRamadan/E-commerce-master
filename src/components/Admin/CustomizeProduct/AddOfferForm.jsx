import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useEffect } from "react";
import {
  addDiscount,
  resetDiscountState,
} from "../../../reduxSystem/slices/addOfferSlice";

const AddOfferForm = ({ item, setActiveForm }) => {
  const dispatch = useDispatch();

  const { isDiscountAdded, loading, error } = useSelector(
    (state) => state.discountState
  );

  const validationSchema = Yup.object({
    discountPercentage: Yup.number()
      .required("Discount is required")
      .min(1, "Must be at least 1%")
      .max(100, "Cannot exceed 100%"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
  });

  const formik = useFormik({
    initialValues: {
      productId: item._id,
      discountPercentage: "",
      startDate: "",
      endDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const now = new Date();

      const formatDate = (date, time = "00:00") => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0"); // يوم بصيغة 2-digit
        const month = String(d.getMonth() + 1).padStart(2, "0"); // شهر بصيغة 2-digit
        const year = d.getFullYear();
        return `${day}-${month}-${year} ${time}`;
      };

      // تنسيق الحقول قبل الإرسال
      const formattedStartDate = formatDate(
        values.startDate,
        `${now.getHours()}:${now.getMinutes()}`
      );
      const formattedEndDate = formatDate(values.endDate, "23:59");

      const updatedValues = {
        productId: values.productId,
        discountPercentage: values.discountPercentage,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      console.log("updated values", updatedValues);
      dispatch(addDiscount(updatedValues));
    },
  });

  useEffect(() => {
    dispatch(resetDiscountState());
  }, []);

  useEffect(() => {
    if (isDiscountAdded) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Offer added successfully!",
      });
      dispatch(resetDiscountState());
      setActiveForm(null);
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "The start day must start from tomorrow!",
      });
      dispatch(resetDiscountState());
    }
  }, [isDiscountAdded, error, dispatch]);

  return (
    <div className="relative p-6 bg-white shadow-lg rounded-lg">
      <button
        className="absolute top-3 right-3 text-white bg-red-500 rounded-full p-1"
        onClick={() => setActiveForm(null)}
      >
        <IoClose size={24} />
      </button>

      <h2 className="text-xl font-semibold mb-4 text-green-600">Add Offer</h2>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          name="discountPercentage"
          placeholder="Discount %"
          {...formik.getFieldProps("discountPercentage")}
          className="border rounded-lg p-2 w-full"
        />
        <input
          type="date"
          name="startDate"
          {...formik.getFieldProps("startDate")}
          className="border rounded-lg p-2 w-full"
        />
        <input
          type="date"
          name="endDate"
          {...formik.getFieldProps("endDate")}
          className="border rounded-lg p-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Add Offer
        </button>
      </form>
    </div>
  );
};

export default AddOfferForm;

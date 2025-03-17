import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { fetchProductVariants } from "../../../reduxSystem/slices/getEditProductVariantSLice";
import {
  resetIsVariantEdited,
  updateProductVariant,
} from "../../../reduxSystem/slices/editVariantProductSlice";
import {
  deleteProductVariant,
  resetIsVariantDeleted,
} from "../../../reduxSystem/slices/deleteProductVariantSlice";

const EditAndDeleteVariantProduct = ({ item, setActiveForm }) => {
  const dispatch = useDispatch();

  const { variant, loading, error } = useSelector(
    (state) => state.getProdVariantState
  );

  const { isVariantEdited } = useSelector(
    (state) => state.editProdVariantState
  );

  const { isVariantDeleted } = useSelector(
    (state) => state.deleteProdVariantState
  );

  const sizes = ["M", "L", "XL", "2XL", "3XL", "4XL"];

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variantList, setVariantList] = useState([]);

  useEffect(() => {
    if (item.variants.length >= 2) {
      dispatch(fetchProductVariants(item._id)).then(() => {
        dispatch(resetIsVariantEdited());
        dispatch(resetIsVariantDeleted());
      });
    } else if (item.variants.length === 1) {
      dispatch(fetchProductVariants(item._id)).then(() => {
        dispatch(resetIsVariantEdited());
        dispatch(resetIsVariantDeleted());
        setActiveForm(null);
      });
    }
  }, [
    dispatch,
    item._id,
    isVariantEdited,
    isVariantDeleted,
    item.variants.length,
  ]);

  useEffect(() => {
    if (variant) {
      setVariantList(variant);
    }
  }, [variant]);

  const validationSchema = Yup.object({
    color: Yup.string().required("Color is required"),
    size: Yup.string().required("Size is required"),
  });

  const formik = useFormik({
    initialValues: {
      color: "",
      size: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!selectedVariant) return;

      const updatedVariant = {
        ...values,
        variantId: selectedVariant._id,
      };
      dispatch(updateProductVariant(updatedVariant));
    },
  });

  const handleVariantChange = (variantId) => {
    const selected = variantList.find((v) => v._id === variantId);
    setSelectedVariant(selected);
    if (selected) {
      formik.setValues({
        color: selected.color || "",
        size: selected.size || "",
      });
    }
  };

  const handleDeleteVariant = (variantId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductVariant(variantId));
        Swal.fire("Deleted!", "The variant has been deleted.", "success");
      }
    });
  };

  return (
    <div className="relative p-6 bg-white shadow-lg rounded-lg">
      {/* زر الإغلاق */}
      <button
        className="absolute top-3 right-3 text-white bg-red-500 rounded-full p-1"
        onClick={() => setActiveForm(null)}
      >
        <IoClose size={24} />
      </button>

      <h2 className="text-xl font-semibold mb-4 text-[#284980]">
        Edit Variant
      </h2>

      {/* التحقق إذا لم يكن هناك أي فاريانت */}
      {variantList.length === 0 ? (
        <p className="text-gray-500 text-center p-4 bg-gray-100 rounded-lg">
          No variants available to edit.
        </p>
      ) : (
        <>
          {/* قائمة الفاريانت مع زر الحذف */}
          <div className="flex flex-col gap-2 mb-4">
            {variantList.map((v) => (
              <div
                key={v._id}
                className={`flex items-center justify-between border p-2 rounded-lg cursor-pointer ${
                  selectedVariant?._id === v._id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleVariantChange(v._id)}
              >
                <span>
                  {v.color} - {v.size}
                </span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteVariant(v._id);
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* نموذج تعديل الفاريانت */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            {/* إدخال اللون */}
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border rounded-lg p-2 w-full"
            />
            {formik.touched.color && formik.errors.color && (
              <p className="text-red-500">{formik.errors.color}</p>
            )}

            {/* اختيار الحجم */}
            <select
              name="size"
              value={formik.values.size}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border rounded-lg p-2 w-full"
            >
              <option value="">Select Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {formik.touched.size && formik.errors.size && (
              <p className="text-red-500">{formik.errors.size}</p>
            )}

            {/* زر التحديث */}
            <button
              type="submit"
              className="bg-[#284980] text-white py-2 rounded-lg hover:bg-blue-600 transition w-full"
            >
              Update Variant
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditAndDeleteVariantProduct;

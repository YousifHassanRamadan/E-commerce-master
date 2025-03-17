import { useEffect, useState } from "react";
import AddVariantForm from "./AddVariantForm";
import AddOfferForm from "./AddOfferForm";
import { IoClose } from "react-icons/io5";
import EditAndDeleteVariantProduct from "./EditAndDeleteVariantProduct";
import EditAndDeleteOfferProduct from "./EditAndDeleteOfferProduct";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { fetchProductVariants } from "../../../reduxSystem/slices/getEditProductVariantSLice";
import { resetIsVariantEdited } from "../../../reduxSystem/slices/editVariantProductSlice";
import { resetIsVariantDeleted } from "../../../reduxSystem/slices/deleteProductVariantSlice";

const AdminProductCustomization = ({ item, setIsCustomizeOpen }) => {
  const [activeForm, setActiveForm] = useState(null);

  const buttonClass =
    "py-3 px-5 rounded-lg text-white transition-all shadow-md active:scale-95 w-44";

  return (
    <div className="relative bg-white shadow-xl rounded-2xl w-full max-w-xl mx-auto min-h-[300px]">
      {/* زر الإغلاق */}
      <button
        className="absolute top-3 right-3 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition-all shadow-md"
        onClick={() => setIsCustomizeOpen(false)}
      >
        <IoClose size={24} />
      </button>

      {!activeForm ? (
        <div className="grid sm:grid-cols-2 grid-cols-1 sm:mt-12 py-10 gap-6 text-center">
          <div className="addVar flex w-full justify-center">
            <button
              className={`bg-[#284980] ${buttonClass}`}
              onClick={() => setActiveForm("variant")}
            >
              Add Variant
            </button>
          </div>

          {item.variants.length > 0 && (
            <div className="editVar flex w-full justify-center">
              {" "}
              <button
                className={`bg-[#F0B100]  ${buttonClass}`}
                onClick={() => setActiveForm("editVariant")}
              >
                Edit Variant
              </button>
            </div>
          )}

          <div className="addOffer flex w-full justify-center">
            <button
              className={`bg-green-600  ${buttonClass}`}
              onClick={() => setActiveForm("offer")}
            >
              Add Offer
            </button>
          </div>

          <div className="editOffer flex w-full justify-center">
            {" "}
            <button
              className={`bg-[#F0B100]  ${buttonClass}`}
              onClick={() => setActiveForm("editOffer")}
            >
              Edit Offer
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeForm === "variant" && (
            <AddVariantForm item={item} setActiveForm={setActiveForm} />
          )}
          {activeForm === "offer" && (
            <AddOfferForm item={item} setActiveForm={setActiveForm} />
          )}
          {activeForm === "editVariant" && (
            <EditAndDeleteVariantProduct
              item={item}
              setActiveForm={setActiveForm}
            />
          )}
          {activeForm === "editOffer" && (
            <EditAndDeleteOfferProduct
              item={item}
              setActiveForm={setActiveForm}
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AdminProductCustomization;

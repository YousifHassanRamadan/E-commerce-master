import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AdminCard from "../components/Ui-Card/AdminCard";
import AddProduct from "../components/Admin/AddProduct/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../reduxSystem/slices/adminProductsSlice";
import AddCategory from "../components/Admin/AddCategory/AddCategory";
import { getAllCategory } from "../reduxSystem/slices/getAllCategorySlice";
import { resetState } from "../reduxSystem/slices/admidAddProdSlice";
import { Select, Option } from "@material-tailwind/react";
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import {
  deleteCategory,
  resetDeletedState,
} from "../reduxSystem/slices/deleteCategorySlice";
import Swal from "sweetalert2";
import EditCategory from "../components/Admin/EditCategory/EditCategory";
import { resetEditCatState } from "../reduxSystem/slices/editCategorySlice";
import Loader from "../components/loader/Loader";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const [isOpened, setIsOpened] = useState(false);

  const [iscategoryOpen, setIscategoryOpen] = useState(false);

  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const { Allproducts } = useSelector((state) => state.adminProductsState);

  const { Allcategories, categoryLoading } =
    useSelector((state) => state.getCategoryState) || [];

  const { productEdited, editLoading } = useSelector(
    (state) => state.editProductState
  );

  const { categoryAdded } = useSelector((state) => state.addCategoryState);

  const { isCategoryEdited } = useSelector((state) => state.editCategoryState);

  const { categoryDeleted, error } = useSelector(
    (state) => state.deleteCategoryState
  );

  const { isProductAdded, loading } = useSelector(
    (state) => state.AdminAddProductState
  );

  useEffect(() => {
    dispatch(getAdminProducts(token));
    dispatch(getAllCategory()).then(() => {
      dispatch(resetState());
      dispatch(resetEditCatState());
    });
  }, [
    productEdited,
    isProductAdded,
    categoryDeleted,
    categoryAdded,
    isCategoryEdited,
  ]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    dispatch(resetDeletedState());
  }, []);

  useEffect(() => {
    if (categoryDeleted) {
      if (error) {
        Swal.fire(
          "Failed!",
          "YOu can't delete a category has products",
          "error"
        );
      } else {
        Swal.fire("Deleted!", "The category has been deleted.", "success");
      }
    }

    dispatch(resetDeletedState());
  }, [error]);

  const handleDelete = (cat) => {
    const catId = cat._id;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#284980",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(catId)).then(() => {
          dispatch(getAllCategory());
        });
      }
    });

    // console.log("categoryDeleted", categoryDeleted);
    // console.log("category id", catId);
  };

  return (
    <div className="bg-[#f2f2f2] w-full p-16">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
        <div className="text flex justify-center w-full sm:w-auto">
          <p className="text-3xl font-semibold text-[#284980]">All Products</p>
        </div>
        <div className="btn flex lg:justify-center lg:flex-row flex-col gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIscategoryOpen(true)}
            className="whitespace-nowrap flex items-center justify-center bg-[#284980] hover:bg-[#4CAF50] text-white font-semibold py-2 px-4 rounded shadow cursor-pointer hover:text-white  transition duration-200"
          >
            <IoMdAdd className="mr-0.5" />
            Add New Category
          </button>
          <button
            onClick={() => setIsOpened(true)}
            className="whitespace-nowrap flex items-center justify-center bg-[#284980] hover:bg-[#4CAF50] text-white font-semibold py-2 px-4 rounded shadow cursor-pointer hover:text-white  transition duration-200"
          >
            <IoMdAdd className="mr-0.5" />
            Add New Product
          </button>
        </div>
      </div>

      <div className="w-full mt-9">
        {categoryLoading ? (
          <div className=" flex justify-center">
            <Loader />
          </div>
        ) : (
          <Select
            label={<span className="text-[#284980]">Manage Category</span>}
            onChange={handleCategoryChange}
            variant="standard"
            className="w-full border-[#284980] focus:border-[#284980]" // يجعل القائمة مرنة مع حجم الشاشة
          >
            {Allcategories.map((cat) => (
              <Option
                key={cat._id}
                value={cat.name}
                className="flex items-center gap-2"
              >
                <span className="flex w-full justify-between">
                  <span className="text-[#284980]">{cat.name}</span>
                  <div className="ml-5 icons flex items-center justify-end">
                    <FaRegEdit
                      onClick={() => setIsEditCategoryOpen(true)}
                      className="text-[#f0b100] text-[20px]"
                    />
                    <CiTrash
                      onClick={() => handleDelete(cat)}
                      className="text-red-500 text-[20px] ml-3"
                    />
                  </div>
                </span>
              </Option>
            ))}
          </Select>
        )}
      </div>

      <div className="w-full opacity-[8%] h-[2px] rounded bg-gray-500 px-9 mt-5 mb-9"></div>

      {categoryLoading || editLoading ? (
        <div className=" flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="ourProducts  grid sm:grid-cols-2  grid-cols-1 gap-5   ">
          {Allproducts.map((prod) => (
            <AdminCard product={prod} key={prod._id} />
          ))}
        </div>
      )}

      {isOpened && (
        <div className="fixed inset-0 flex items-center justify-center  bg-transparent  backdrop-blur-md z-50 w-full">
          <AddProduct setIsOpened={setIsOpened} Allcategories={Allcategories} />
        </div>
      )}
      {iscategoryOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-transparent  backdrop-blur-md z-50 w-full">
          <AddCategory setIscategoryOpen={setIscategoryOpen} />
        </div>
      )}
      {isEditCategoryOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-transparent  backdrop-blur-md z-50 w-full">
          <EditCategory
            setIsEditCategoryOpen={setIsEditCategoryOpen}
            selectedCategory={selectedCategory}
            Allcategories={Allcategories}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

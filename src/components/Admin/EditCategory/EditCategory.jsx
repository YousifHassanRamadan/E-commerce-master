import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Card } from "@material-tailwind/react";
import Swal from "sweetalert2";
import {
  editCategory,
  resetEditCatState,
} from "../../../reduxSystem/slices/editCategorySlice";

const EditCategory = ({
  setIsEditCategoryOpen,
  selectedCategory,
  Allcategories,
}) => {
  const dispatch = useDispatch();
  const category = selectedCategory;

  const categoryobj = Allcategories.find((cat) => {
    return category === cat.name;
  });

  //   console.log("categoryobj", categoryobj);

  const [categoryName, setCategoryName] = useState({
    name: categoryobj.name,
    categoryId: categoryobj._id,
  });

  const handelEditCat = (value) => {
    setCategoryName((prev) => ({ ...prev, name: value }));
  };

  //   console.log(categoryName);

  const { isCategoryEdited } = useSelector((state) => state.editCategoryState);

  console.log("isCategoryEdited", isCategoryEdited);

  useEffect(() => {
    dispatch(resetEditCatState());
  }, []);

  useEffect(() => {
    console.log("isCategoryEdited", isCategoryEdited);

    if (isCategoryEdited) {
      Swal.fire({
        icon: "success",
        text: "Category Edited Successfuly!",
      });
      setIsEditCategoryOpen(false);
    }
  }, [isCategoryEdited]);

  const handleSubmitEdit = () => {
    dispatch(editCategory(categoryName));
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-transparent p-4">
      <Card className="flex flex-col justify-center items-center w-full sm:max-w-lg lg:max-w-3xl bg-white shadow-2xl p-6 rounded-2xl max-h-[80vh] overflow-y-auto">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#284980] mb-6 text-center">
          Edit Category
        </h2>

        {/* Input Field */}
        <div className="w-full mb-6">
          <Input
            variant="standard"
            label={<span className="text-[#284980]">Category Name</span>}
            placeholder="Enter Category Name"
            className="text-lg text-[#284980]"
            value={categoryName.name}
            onChange={(e) => handelEditCat(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 w-full">
          <Button
            onClick={handleSubmitEdit}
            className="w-full text-white bg-[#284980] rounded-lg py-3 hover:bg-[#1e3a5f] transition duration-300"
          >
            Edit Category
          </Button>
          <Button
            className="w-full text-white bg-red-500 rounded-lg py-3 hover:bg-gray-700 transition duration-300"
            onClick={() => setIsEditCategoryOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EditCategory;

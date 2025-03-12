import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Card } from "@material-tailwind/react";
import Swal from "sweetalert2";
import {
  addCategory,
  resetAddCategoryState,
} from "../../../reduxSystem/slices/addCategorySlice";

const AddCategory = ({ setIscategoryOpen }) => {
  const [categoryName, setCategoryName] = useState("");

  console.log(categoryName);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAddCategoryState());
  }, []);

  const handleAddCategory = () => {
    const trimmedCategory = categoryName.trim();

    if (trimmedCategory === "") {
      Swal.fire({
        icon: "error",
        text: "Please Enter A New Category!",
      });
      return; // Stop function execution
    } else {
      dispatch(addCategory(trimmedCategory));
      Swal.fire({
        icon: "success",
        text: "Category Added Successfuly!",
      });
      setIscategoryOpen(false);
      console.log("Category Name:", trimmedCategory);

      // Clear input after submission
      setCategoryName("");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-transparent p-4">
      <Card className="flex flex-col justify-center items-center w-full sm:max-w-lg lg:max-w-3xl bg-white shadow-2xl p-6 rounded-2xl max-h-[80vh] overflow-y-auto">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#284980] mb-6 text-center">
          Add New Category
        </h2>

        {/* Input Field */}
        <div className="w-full mb-6">
          <Input
            variant="standard"
            label={<span className="text-[#284980]">Category Name</span>}
            placeholder="Enter Category Name"
            className="text-lg text-[#284980]"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 w-full">
          <Button
            onClick={handleAddCategory}
            className="w-full text-white bg-[#284980] rounded-lg py-3 hover:bg-[#1e3a5f] transition duration-300"
          >
            Add Category
          </Button>
          <Button
            className="w-full text-white bg-red-500 rounded-lg py-3 hover:bg-gray-700 transition duration-300"
            onClick={() => setIscategoryOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddCategory;

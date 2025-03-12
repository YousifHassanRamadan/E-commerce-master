import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { Input, Textarea, Select, Option } from "@material-tailwind/react";
import { ImagePlus, Upload, X } from "lucide-react";
// import {
//   addProduct,
//   resetAddState,
// } from "../../../reduxSystem/slices/addProductSlice";
import Swal from "sweetalert2";
import {
  AdminAddProduct,
  resetState,
} from "../../../reduxSystem/slices/admidAddProdSlice";

const AddProduct = ({ setIsOpened, Allcategories }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    thumbnail: null,
    images: [],
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const { isProductAdded, loading } = useSelector(
    (state) => state.AdminAddProductState
  );

  useEffect(() => {
    dispatch(resetState());
    console.log("loading", loading);
    console.log("isProductAdded", isProductAdded);
  }, []);

  useEffect(() => {
    if (isProductAdded) {
      Swal.fire({
        title: "Success!",
        text: "Product added successfully",
        icon: "success",
      });
      setIsOpened(false);
      dispatch(resetState());
    }
  }, [isProductAdded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "stock" && value < 0) return;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setProduct((prev) => ({ ...prev, category: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    setProduct((prev) => ({ ...prev, thumbnail: null }));
    setThumbnailPreview(null);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + product.images.length > 5) {
      setErrorMessage((prev) => ({
        ...prev,
        images: "You can only upload 5 images",
      }));
      return;
    }
    setProduct((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newError = {};
    if (!product.title) newError.title = "Product title is required.";
    if (!product.price || product.price <= 0)
      newError.price = "Price must be greater than 0.";
    if (!product.description)
      newError.description = "Product description is required.";
    if (!product.stock || product.stock < 0)
      newError.stock = "Stock must be at least 0.";
    if (!product.category) newError.category = "Please select a category.";
    if (!product.thumbnail) newError.thumbnail = "Thumbnail is required.";
    if (product.images.length === 0)
      newError.images = "At least one image is required.";

    if (Object.keys(newError).length > 0) {
      setErrorMessage(newError);
      return;
    }

    dispatch(AdminAddProduct(product));
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-transparent p-4 z-[10000]">
      <div className="relative w-full sm:max-w-lg lg:max-w-5xl xl:max-w-6xl bg-white shadow-xl p-6 rounded-2xl max-h-[80vh] overflow-y-auto">
        {/* Close button in the top-right corner */}
        <button
          onClick={() => setIsOpened(false)}
          className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-[#284980]">
          Add New Product
        </h2>

        <div className="space-y-4">
          <Input
            name="title"
            label="Product Title"
            value={product.title}
            onChange={handleChange}
            error={!!errorMessage.title}
            variant="standard"
          />
          {errorMessage.title && (
            <p className="text-red-500">{errorMessage.title}</p>
          )}

          <Input
            name="price"
            label="Price"
            type="number"
            value={product.price}
            onChange={handleChange}
            error={!!errorMessage.price}
            variant="standard"
          />
          {errorMessage.price && (
            <p className="text-red-500">{errorMessage.price}</p>
          )}

          <Textarea
            name="description"
            label="Product Description"
            value={product.description}
            onChange={handleChange}
            error={!!errorMessage.description}
            variant="standard"
          />
          {errorMessage.description && (
            <p className="text-red-500">{errorMessage.description}</p>
          )}

          <Input
            name="stock"
            label="Stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
            error={!!errorMessage.stock}
            variant="standard"
          />
          {errorMessage.stock && (
            <p className="text-red-500">{errorMessage.stock}</p>
          )}

          <div className="my-8"></div>

          <Select
            label="Category"
            value={product.category}
            onChange={handleCategoryChange}
            variant="standard"
            error={!!errorMessage.category}
          >
            {Allcategories.map((cat, index) => (
              <Option key={cat._id} value={cat.name}>
                {cat.name}
              </Option>
            ))}
          </Select>
          {errorMessage.category && (
            <p className="text-red-500">{errorMessage.category}</p>
          )}

          {/* Thumbnail Upload */}
          <div className="border p-3 rounded-lg flex items-center justify-center relative cursor-pointer my-9">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleThumbnailChange}
            />
            {thumbnailPreview ? (
              <div className="relative">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail"
                  className="h-40 w-40 object-cover rounded-lg"
                />
                <X
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                  size={16}
                  onClick={removeThumbnail}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <ImagePlus size={40} />
                <span>Upload Thumbnail</span>
              </div>
            )}
          </div>

          {/* Additional Images Upload */}
          <div className="border p-3 rounded-lg flex flex-col items-center relative cursor-pointer">
            <input
              type="file"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImagesChange}
            />
            {imagePreviews.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Product ${index}`}
                      className="h-20 w-20 object-cover rounded-lg cursor-pointer"
                    />
                    <X
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                      size={16}
                      onClick={() => removeImage(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <ImagePlus size={40} />
                <span>Upload Images</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full flex items-center gap-2"
            color="blue"
          >
            <Upload size={18} /> Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

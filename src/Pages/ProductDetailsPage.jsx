import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../reduxSystem/slices/getSingleProdSlice";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  ButtonGroup,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Star } from "lucide-react";
import { addReview } from "../reduxSystem/slices/addReviewSLice";
import { Pencil, Trash } from "lucide-react";
import { deleteReview } from "../reduxSystem/slices/deleteReviewSlice";
import Swal from "sweetalert2";
import EditReview from "../components/EditReview/EditReview";
import { addToCartApi } from "../reduxSystem/slices/backAddToCartSlice";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const { product, isLoading } = useSelector(
    (state) => state.singleProductState
  );

  const [selectedColor, setSelectedColor] = useState(
    product?.variants[0]?.color || null
  );

  const [selectedSize, setSelectedSize] = useState(
    product?.variants[0]?.size || null
  );

  const [variantPrice, setVariantPrice] = useState(
    product?.variants[0]?.price || 0
  );

  const offerPercentage = product?.offer?.discountPercentage || 0;

  const { userData } = useSelector((state) => state.authState);

  const [mainImage, setMainImage] = useState("");

  // Reviews State
  const [reviewText, setReviewText] = useState("");

  const [rating, setRating] = useState(5);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [variantImg, setVariantImg] = useState(product?.variant?.images || []);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.thumbnail) {
      setMainImage(product.thumbnail);
    }

    if (product?.variants) {
      setSelectedColor(product?.variants[0]?.color || null);
      setSelectedSize(product?.variants[0]?.size || null);
      setVariantPrice(product?.variants[0]?.price || 0);
    }
  }, [product]);

  const handleAddToCart = (prod) => {
    const token = localStorage.getItem("token");

    const addTocartObj = {};

    if (!token) {
      Swal.fire({
        title: "Oops!",
        text: "You need to log in first to add products to the cart 🛒",
        icon: "warning",
        confirmButtonText: "OK",
        timer: 2000,
      });
      return;
    }

    if (prod.variants.length > 0) {
      const selectedVariant = prod.variants.filter(
        (variant) =>
          variant.color === selectedColor &&
          variant.size === selectedSize &&
          variant.price === variantPrice
      );

      // Check if at least one variant exists
      if (selectedVariant.length > 0) {
        const variantId = selectedVariant[0]._id; // Access the first matched variant
        addTocartObj.variantId = variantId;
        addTocartObj.quantity = quantity; // Add it to the object
      }

      // console.log("selectedVariant", selectedVariant);

      console.log("with variant");

      dispatch(addToCartApi([addTocartObj]));
    } else {
      addTocartObj.productId = prod._id;
      addTocartObj.quantity = quantity;
      console.log("without variant");

      dispatch(addToCartApi([addTocartObj]));
    }

    // console.log("addTocartObj", addTocartObj);

    // Swal.fire({
    //   title: "Added!",
    //   text: `${prod.title} has been added to the cart 🛒`,
    //   icon: "success",
    //   confirmButtonText: "OK",
    //   timer: 2000,
    // });
  };

  const handleAddReview = () => {
    if (reviewText.trim()) {
      const newReview = {
        productId: id,
        comment: reviewText,
        rating: rating,
      };

      console.log("The Review", newReview);
      dispatch(addReview(newReview)).then(() => {
        dispatch(fetchSingleProduct(id)); // إعادة جلب المنتج لتحديث المراجعات
      });

      setReviewText("");
      setRating(5);
    }
  };

  const handleDelete = (revID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReview(revID)).then(() => {
          dispatch(fetchSingleProduct(id));
          Swal.fire({
            title: "Deleted!",
            text: "The review has been deleted successfully.",
            icon: "success",
          });
        });
      }
    });
  };

  useEffect(() => {
    if (selectedColor) {
      const selectedVariant = product?.variants?.find(
        (variant) => variant.color === selectedColor
      );
      if (selectedVariant?.images?.length) {
        setVariantImg(selectedVariant.images);
      } else {
        setVariantImg([]);
      }
    }
  }, [selectedColor, product]);

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const selectedVariant = product?.variants?.find(
        (variant) =>
          variant.color === selectedColor && variant.size === selectedSize
      );

      if (selectedVariant?.price) {
        setVariantPrice(selectedVariant.price);
      } else {
        setVariantPrice(product?.price || 0); // السعر الأساسي إذا لم يتم العثور على المتغير
      }
    }
  }, [selectedColor, selectedSize, product]);

  console.log("product", product);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-[10%] px-4">
      <Card className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="w-full md:w-1/2 h-72 md:h-auto">
          <img
            src={mainImage}
            alt={product?.title || "Product Image"}
            className="w-full h-full object-cover"
          />
        </CardHeader>

        <CardBody className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <Typography
            variant="h5"
            className="font-bold text-[#284980] text-3xl"
          >
            {product?.title || "Loading..."}
          </Typography>
          <Typography className="text-gray-600 mt-2">
            {product?.description || "No description available."}
          </Typography>
          <div className="border-t border-gray-300 my-4"></div>

          <Typography className="text-gray-700 font-semibold">
            Category: {product?.category?.name || "Unknown"}
          </Typography>

          {/* عرض الألوان المتاحة بدون تكرار */}
          {selectedColor && (
            <div className="mt-4">
              <Typography className="font-semibold">
                Available Colors:
              </Typography>
              <div className="flex gap-2 mt-2">
                {[
                  ...new Set(
                    product?.variants?.map((variant) => variant.color)
                  ),
                ].map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedSize(null); // إعادة تعيين الحجم عند تغيير اللون
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedColor && (
            <div className="mt-4">
              <Typography className="font-semibold">Select Size:</Typography>
              <div className="flex gap-2 mt-2">
                {product?.variants
                  ?.filter((variant) => variant.color === selectedColor)
                  .map((variant, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${
                        selectedSize === variant.size
                          ? "bg-[#284980] text-white"
                          : "bg-gray-100"
                      }`}
                      onClick={() => setSelectedSize(variant.size)}
                    >
                      {variant.size}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* عرض المخزون عند اختيار حجم */}
          {selectedSize && (
            <Typography
              className={` mt-2 ${
                product?.variants?.find(
                  (variant) =>
                    variant.color === selectedColor &&
                    variant.size === selectedSize &&
                    variant.stock >= 1
                )
                  ? "text-[#4CAF50]"
                  : "text-red-500"
              }`}
            >
              Available Stock:{" "}
              <span
                className={` ${
                  product?.variants?.find(
                    (variant) =>
                      variant.color === selectedColor &&
                      variant.size === selectedSize &&
                      variant.stock >= 1
                  )
                    ? "text-[#4CAF50]"
                    : "text-red-500"
                }`}
              >
                {product?.variants?.find(
                  (variant) =>
                    variant.color === selectedColor &&
                    variant.size === selectedSize
                )?.stock || 0}
              </span>
            </Typography>
          )}

          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <Typography className="text-lg text-gray-500 line-through">
              $
              {product?.variants?.length > 0
                ? variantPrice.toFixed(2)
                : product?.price.toFixed(2)}
            </Typography>
            <Typography className="text-xl font-bold text-green-600">
              $
              {(
                variantPrice - (variantPrice * offerPercentage) / 100 ||
                product.price - (product.price * offerPercentage) / 100
              ).toFixed(2)}
            </Typography>
            <Typography className="text-sm text-gray-500">
              Inclusive of taxes
            </Typography>
          </div>

          {/* Quantity Control */}
          <div className="mt-4 flex items-center">
            <Typography className="mr-4">Quantity:</Typography>
            <ButtonGroup variant="outlined">
              <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
              <Button disabled>{quantity}</Button>
              <Button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                -
              </Button>
            </ButtonGroup>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <Button
              onClick={() => {
                handleAddToCart(product);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Add to Cart
            </Button>
            <Button className="bg-green-600 text-white px-6 py-2 rounded-md">
              Buy Now
            </Button>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto">
            {[product.thumbnail, ...product.images, ...variantImg].map(
              (img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product variant ${index}`}
                  className={`w-16 h-16 object-cover border-2 rounded-lg cursor-pointer transition ${
                    mainImage === img ? "border-[#284980]" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              )
            )}
          </div>
        </CardBody>
      </Card>

      {/* Review Section */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <Typography variant="h5" className="font-bold text-[#284980] mb-6">
          Customer Reviews
        </Typography>

        {/* Review Form */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow">
          <Typography className="font-semibold text-xl mb-10 text-[#284980]">
            Leave a Review
          </Typography>

          <Textarea
            variant="static"
            label="Your Review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <div className="my-[3%]"></div>

          <div className="flex items-center gap-2 mb-9">
            <Typography>Rating:</Typography>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  className={`cursor-pointer ${
                    rating >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <Button
            onClick={handleAddReview}
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Submit Review
          </Button>
        </div>

        {/* Display Reviews */}
        {product?.reviews?.length > 0 ? (
          product.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-4 flex items-start gap-4 relative"
            >
              {/* أفاتار يحتوي على أول حرف من الاسم */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold">
                {review?.userId?.fname?.charAt(0).toUpperCase()}
              </div>

              {/* تفاصيل المراجعة */}
              <div className="flex-1">
                <Typography className="text-lg font-semibold text-gray-800">
                  {review?.userId?.fname} {review?.userId?.lname}
                </Typography>
                <p className="text-gray-700">{review.comment}</p>
                <div className="text-yellow-500 font-bold">
                  {"★".repeat(review.rating)}
                </div>
                <Typography className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleString()}
                </Typography>
              </div>

              {/* أزرار التعديل والحذف بأيقونات */}
              {userData?._id === review.userId?._id && (
                <div className="flex gap-2 absolute right-4 top-4">
                  <button
                    onClick={() => setIsEditOpen(true)}
                    className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(review._id);
                    }}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    <Trash size={16} />
                  </button>
                  {isEditOpen && (
                    <div className="fixed inset-0 flex items-center justify-center  bg-transparent  backdrop-blur-md z-50 w-full">
                      <EditReview
                        review={review}
                        setIsEditOpen={setIsEditOpen}
                        id={id}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <Typography className="text-gray-500">No reviews yet.</Typography>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;

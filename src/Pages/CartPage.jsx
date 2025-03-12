import { FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  removeFromCart,
} from "../reduxSystem/slices/addToCartSlice";
import { deleteProductCart } from "../reduxSystem/slices/deleteCartProdSlice";
import { useState } from "react";
import { updateCartItem } from "../reduxSystem/slices/updataCartSlice";
import { Link } from "react-router-dom";
import PlaceOrder from "../components/PlaceOrder/PlaceOrder";
import { clearCart } from "../reduxSystem/slices/clearUserCartSlice";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const inc = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(
      updateCartItem({ productId: item.productId, quantity: newQuantity })
    );
  };

  const dec = () => {
    if (quantity >= 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(
        updateCartItem({ productId: item.productId, quantity: newQuantity })
      );
    }
  };

  const dispatch = useDispatch();
  return (
    <div className="flex flex-wrap items-center bg-white shadow-md rounded-lg p-4 mb-4 sm:flex-nowrap">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg"
      />
      <div className="flex-1 px-4">
        <h2 className="font-semibold text-base sm:text-lg text-[#284980]">
          {item.title}
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Quantity: {quantity}
        </p>
        <button
          onClick={() => {
            dispatch(deleteProductCart(item.productId));
            console.log("Deleting item:", item.productId);
          }}
          className="text-red-500 flex items-center mt-2 hover:text-red-700 text-sm"
        >
          <FaTrashAlt className="mr-1" /> REMOVE
        </button>
      </div>
      <p className="font-semibold text-[#284980] text-sm sm:text-base">
        ${item.price.toFixed(2)}
      </p>
      <div className="flex justify-end max-[380px]:w-full items-center ml-2 sm:ml-4 ">
        <button
          onClick={dec}
          className="px-[10px] py-0.5 text-white bg-[#284980] rounded-2xl duration-300 hover:bg-gray-300 text-sm"
        >
          -
        </button>
        <span className="px-3 text-[#284980] text-sm sm:text-base">
          {quantity}
        </span>
        <button
          onClick={inc}
          className="px-2 py-0.5 text-white bg-[#284980] rounded-2xl duration-300 hover:bg-gray-300 text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
};

const CartPage = () => {
  const [isPlaceOrderOpen, setIsPlaceOrderOpen] = useState(false);

  const dispatch = useDispatch();

  const { userCart, totalCartPrice } = useSelector(
    (state) => state.getCartState
  );

  console.log("userCart", userCart);

  const subtotal = userCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 min-h-[70vh] bg-gray-200 my-[7%] rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-[#284980]">
        Shopping Cart
      </h1>

      {userCart.length > 0 && (
        <button
          onClick={() => dispatch(clearCart())}
          className="flex items-center text-red-600 hover:text-red-800 text-lg font-semibold mb-4"
        >
          <FaTrashAlt className="mr-2" /> Clear Cart
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="sm:col-span-2">
          {userCart.length > 0 ? (
            userCart.map((item) => <CartItem key={item._id} item={item} />)
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-[#284980]">
            Order Summary
          </h2>
          <div className="mb-4 text-sm sm:text-base">
            <p className="flex justify-between text-[#284980]">
              <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-[#284980]">
              <span>Shipping</span> <span>${shipping.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-[#284980]">
              <span>Tax</span> <span>${tax.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-semibold text-base sm:text-lg text-[#284980]">
              <span>Total</span> <span>${total.toFixed(2)}</span>
            </p>
          </div>
          <button
            onClick={() => {
              setIsPlaceOrderOpen(true);
            }}
            className="w-full block text-center bg-[#F0B100] text-white py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold duration-300 hover:bg-[#284980]"
          >
            Place Order
          </button>
          <button className="w-full border border-[#F0B100] text-[#F0B100] py-2 sm:py-3 rounded-lg mt-2 text-base sm:text-lg font-semibold duration-300 hover:bg-gray-100">
            Continue Shopping
          </button>

          {isPlaceOrderOpen && (
            <div className="fixed inset-0 flex items-center justify-center  bg-transparent  backdrop-blur-md z-50 w-full">
              <PlaceOrder setIsPlaceOrderOpen={setIsPlaceOrderOpen} />
            </div>
          )}
          <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
            {/* <img
              src="https://via.placeholder.com/30"
              alt="Card 1"
              className="sm:w-10 sm:h-10"
            />
            <img
              src="https://via.placeholder.com/30"
              alt="Visa"
              className="sm:w-10 sm:h-10"
            />
            <img
              src="https://via.placeholder.com/30"
              alt="Amex"
              className="sm:w-10 sm:h-10"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

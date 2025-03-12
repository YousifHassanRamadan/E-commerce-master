import { useEffect, useState } from "react";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../reduxSystem/slices/addToCartSlice";
import { fetchCart } from "../../../../reduxSystem/slices/getUserCartSlice";
import { resetisProductAdded } from "../../../../reduxSystem/slices/backAddToCartSlice";
import { resetisProdDeleted } from "../../../../reduxSystem/slices/deleteCartProdSlice";
import { resetEditCartState } from "../../../../reduxSystem/slices/updataCartSlice";
import { resetIsCartCleared } from "../../../../reduxSystem/slices/clearUserCartSlice";

const Cart = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const dispatch = useDispatch();

  const { userCart, totalCartPrice } = useSelector(
    (state) => state.getCartState
  );

  const { isProductAdded } = useSelector((state) => state.AddToCartState);
  const { isProdDeleted } = useSelector((state) => state.deleteProdCart);
  const { isEdited } = useSelector((state) => state.editCartState);
  const { isCartCleared } = useSelector((state) => state.clearCartState);

  useEffect(() => {
    dispatch(fetchCart()).then(() => {
      dispatch(resetisProductAdded());
      dispatch(resetisProdDeleted());
      dispatch(resetEditCartState());
      dispatch(resetIsCartCleared());
    });
  }, [isProductAdded, isProdDeleted, isEdited, isCartCleared]);

  return (
    <div className="relative">
      <Menu open={openMenu} handler={setOpenMenu} allowHover>
        <MenuHandler>
          <div className="relative cursor-pointer">
            <IoCartOutline className="text-white text-3xl" />
            {userCart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#F0B100] text-[#284980] text-xs rounded-full w-5 h-5 flex justify-center items-center">
                {userCart.length}
              </span>
            )}
          </div>
        </MenuHandler>

        <MenuList className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          {/* العناصر داخل السلة */}
          {userCart.length > 0 ? (
            <>
              {userCart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center border-b pb-3 mb-3"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-md mr-3"
                  />
                  <div className="flex flex-col flex-1">
                    <p className="font-semibold text-sm text-[#284980]">
                      {item.title}
                    </p>
                    <span className="text-[#284980] text-xs">
                      {item.quantity} x ${item.price}
                    </span>
                  </div>
                </div>
              ))}

              {/* إجمالي السلة وأزرار التنقل */}
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-lg text-[#284980]">
                  Cart ${Math.round(totalCartPrice)}
                </span>
                <Link
                  to="/cart"
                  className="bg-yellow-500 text-[#284980] px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Checkout
                </Link>
              </div>
            </>
          ) : (
            <p className="text-[#284980] text-center">Your cart is empty.</p>
          )}
        </MenuList>
      </Menu>
    </div>
  );
};

export default Cart;

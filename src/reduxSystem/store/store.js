import { configureStore } from "@reduxjs/toolkit";
import { RTLState } from "../slices/handleRTLSlice";
import { authState } from "../slices/authSlice";
import { addProductState } from "../slices/addProductSlice";
import { allProductsState } from "../slices/getAllProductsSlice";
import { adminProductsState } from "../slices/adminProductsSlice";
import { editProductState } from "../slices/editProductSlice";
import { addCategoryState } from "../slices/addCategorySlice";
import { getCategoryState } from "../slices/getAllCategorySlice";
import { deleteAdminProductsState } from "../slices/deleteProductSlice";
import { AdminAddProductState } from "../slices/admidAddProdSlice";
import { deleteCategoryState } from "../slices/deleteCategorySlice";
import { editCategoryState } from "../slices/editCategorySlice";
import { cartState } from "../slices/addToCartSlice";
import { backEndAddToCartState } from "../slices/backEndAddToCartSlice";
import { favouriteState } from "../slices/favouriteSlice";
import { getFavouritestate } from "../slices/getFavouriteSlice";
import { userSliceState } from "../slices/editProfileSlice";
import { changePasswordstate } from "../slices/editPasswordSlice";
import { userAddressState } from "../slices/GetUserAddressSlice";
import { editAddressState } from "../slices/editAddressSlice";
import { AddToCartState } from "../slices/backAddToCartSlice";
import { getCartState } from "../slices/getUserCartSlice";
import { deleteProdCart } from "../slices/deleteCartProdSlice";
import { editCartState } from "../slices/updataCartSlice";
import { deleteAddressState } from "../slices/deleteAddressUserSlice";
import { addAddressState } from "../slices/addAddressSlice";
import { singleProductState } from "../slices/getSingleProdSlice";
import { addRevState } from "../slices/addReviewSLice";
import { deleteReviewState } from "../slices/deleteReviewSlice";
import { reviewState } from "../slices/editReviewSlice";
import { placeOrderState } from "../slices/addPlaceOrderSlice";
import { ordersUserState } from "../slices/getUserOrderSlice";
import { clearCartState } from "../slices/clearUserCartSlice";

const store = configureStore({
  reducer: {
    RTLState,
    authState,
    addProductState,
    allProductsState,
    adminProductsState,
    editProductState,
    addCategoryState,
    getCategoryState,
    deleteAdminProductsState,
    AdminAddProductState,
    deleteCategoryState,
    editCategoryState,
    cartState,
    backEndAddToCartState,
    favouriteState,
    getFavouritestate,
    userSliceState,
    changePasswordstate,
    userAddressState,
    editAddressState,
    AddToCartState,
    getCartState,
    deleteProdCart,
    editCartState,
    deleteAddressState,
    addAddressState,
    singleProductState,
    addRevState,
    deleteReviewState,
    reviewState,
    placeOrderState,
    ordersUserState,
    clearCartState,
  },
});

export default store;

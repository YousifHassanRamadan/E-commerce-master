import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import RootPage from "./Pages/RootPage";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ProductCategoryPage from "./Pages/ProductCategoryPage";
import BrandsPage from "./Pages/BrandsPage";
import BestSalesPage from "./Pages/BestSalesPage";
import ProductTagPage from "./Pages/ProductTagPage";
import BlogPage from "./Pages/BlogPage";
import FaqPage from "./Pages/FaqPage";
import AccountPage from "./Pages/AccountPage";
import OrdersPage from "./Pages/OrdersPage";
import WishlistPage from "./Pages/WishlistPage";
import TrackingOrdersPage from "./Pages/TrackingOrdersPage";
import ViewedOrdersPage from "./Pages/ViewedOrdersPage";
import ReviewedOrdersPage from "./Pages/ReviewedOrdersPage";
import EditAccountPage from "./Pages/EditAccountPage";
import EditAddressPage from "./Pages/EditAddressPage";
import ContactPage from "./Pages/ContactPage";
import ComparePage from "./Pages/ComparePage";
import CategoryPage from "./Pages/CategoryPage";
import MyWishListPage from "./Pages/MyWishListPage";
import AdminDashboard from "./Pages/AdminDashboard";
import LogInAndSignUp from "./Pages/LogInAndSignUp";
import { useSelector } from "react-redux";
import CartPage from "./Pages/CartPage";
import PlaceOrder from "./Pages/PlaceOrder";
import ProductDetailsPage from "./Pages/ProductDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/?language=en_US" replace />, //force the user to use english language when he opens the website
  },
  ,
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "placeorder",
        element: <PlaceOrder />,
      },
      {
        path: "register",
        element: <LogInAndSignUp />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "brands",
        element: <BrandsPage />,
      },
      {
        path: "best-sales",
        element: <BestSalesPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "category-page",
        element: <CategoryPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "faq",
        element: <FaqPage />,
      },
      {
        path: "compare",
        element: <ComparePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "productdetails/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "my-account",
        element: <AccountPage />,
        children: [
          { index: true, element: <OrdersPage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "mywishlist", element: <MyWishListPage /> },
          { path: "tracking", element: <TrackingOrdersPage /> },
          { path: "edit-address", element: <EditAddressPage /> },
          { path: "edit-account", element: <EditAccountPage /> },
          { path: "admin-dashboard", element: <AdminDashboard /> },
        ],
      },
      {
        path: "product-category/:category",
        element: <ProductCategoryPage />,
      },
      {
        path: "product-tag/:tag",
        element: <ProductTagPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

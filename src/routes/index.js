import { useSearchParams } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import UserInfoPage from "../pages/ProfilePage/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderHistoryPage from "../pages/OrderHistoryPage/OrderPage.jsx";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import AuthPage from "../pages/AuthPage/AuthPage.jsx";
import AdminLogin from "../pages/AdminLogin.jsx/AdminLogin.jsx";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage"; // Import trang Checkout

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/checkout",
    page: CheckoutPage,
    // isShowHeader: true,
  },
  {
    path: "/order-history",
    page: OrderHistoryPage,
    // isShowHeader: true,
  },
  {
    path: "/user-info",
    page: UserInfoPage,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/product-details",
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/auth", // For signup and signin
    page: AuthPage,
    isShowHeader: true,
  },
  {
    path: "/admin-login", // For signin admin
    page: AdminLogin,
    // isShowHeader: true,
  },

  {
    path: "*",
    page: NotFoundPage,
  },
];

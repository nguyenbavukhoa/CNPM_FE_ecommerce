import { useSearchParams } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AuthPage from "../pages/AuthPage/AuthPage.jsx";
// import AdminLogin from "../pages/AdminLogin.jsx/AdminLogin.jsx";
// import CheckoutPage from "../pages/CheckoutPage/CheckoutPage"; // Import trang Checkout

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  // {
  //   path: "/checkout",
  //   page: CheckoutPage,
  //   // isShowHeader: true,
  // },
  {
    path: "/auth", // For signup and signin
    page: AuthPage,
    isShowHeader: true,
  },
  // {
  //   path: "/admin-login", // For signin admin
  //   page: AdminLogin,
  //   // isShowHeader: true,
  // },

  {
    path: "*",
    page: NotFoundPage,
  },
];

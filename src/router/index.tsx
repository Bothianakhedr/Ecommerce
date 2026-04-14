import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import {
  Brands,
  Cart,
  
  ForgotPassword,
  Home,
  Login,
  PageNotFound,
  ProductDetails,
  Products,
  Register,
  ResetPassword,
  VerifyResetCode,
  Wishlist,
} from "../feature";
import ProtectedRoute from "@shared/components/ProtectedRoute";
import Checkout from "@feature/Checkout/Checkout";
import { AllOrders } from "@feature/AllOrders/page/AllOrders";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: `product/:id`, element: <ProductDetails /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: <Brands />,
      },

      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist/>
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "verifyCode", element: <VerifyResetCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

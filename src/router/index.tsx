import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import {
  Brands,
  Cart,
  Categories,
  ForgotPassword,
  Home,
  Login,
  PageNotFound,
  ProductDetails,
  Products,
  Register,
} from "../feature";
import ProtectedRoute from "@shared/components/ProtectedRoute";
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
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

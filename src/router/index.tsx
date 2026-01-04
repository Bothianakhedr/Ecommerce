import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import {
  Brands,
  Categories,
  ForgotPassword,
  Home,
  Login,
  PageNotFound,
  Products,
  Register,
} from "../feature";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
    ],
  },
  {path:"*", element:<PageNotFound/>}
]);

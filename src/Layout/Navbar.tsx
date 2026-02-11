import { Link, NavLink } from "react-router-dom";
import logo from "../assets/original-dbbc84c08bd6b4b49fc97827fa5be468.webp";
import { FaCartPlus } from "react-icons/fa";
import { authAtom } from "@feature/Auth/atoms/auth-atom";
import { cartInfoAtom } from "@feature/Cart/atoms/cart-atom";
import { useEffect } from "react";

export const Navbar = () => {
  const token = authAtom.useValue();
  const { numOfCartItems } = cartInfoAtom.useValue();

  const logout = () => {
    localStorage.removeItem("token");
    authAtom.update(null);
  };

  useEffect(() => {
    if (token && typeof token === 'string') cartInfoAtom.getCartItems();
  }, [token]);
  return (
    <nav className="bg-pink-400 p-2">
      <div className="container mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="logo">
            <img
              className="w-30 h-12 object-cover"
              src={logo}
              alt="eCommerce logo "
            />
          </div>
          {/* Links */}
          <ul className="flex items-center gap-8">
            <li className="font-semibold text-white tracking-wide">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="font-semibold text-white tracking-wide">
              <NavLink to="/products">Products</NavLink>
            </li>
            <li className="font-semibold text-white tracking-wide">
              <NavLink to="/categories">Categories</NavLink>
            </li>
            <li className="font-semibold text-white tracking-wide">
              <NavLink to="/brands">Brands</NavLink>
            </li>
          </ul>
        </div>

        <ul className="flex items-center gap-8 text-white font-medium">
          {token && (
            <Link to="/cart" className="relative me-10">
              <FaCartPlus className="text-3xl font-bold" />
              <span className="text-pink-500 bg-white absolute font-semibold -right-3 -top-2.5 w-5 h-5 rounded-full flex items-center justify-center">
                {numOfCartItems === 0 ? 0 : numOfCartItems}
              </span>
            </Link>
          )}

          {!token ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={logout}
                className="bg-white py-1 font-semibold cursor-pointer px-2 rounded text-pink-500"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

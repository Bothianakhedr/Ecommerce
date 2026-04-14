import { Link, NavLink } from "react-router-dom";
import logo from "../assets/original-dbbc84c08bd6b4b49fc97827fa5be468.webp";
import { FaCartPlus, FaRegSun, FaRegMoon, FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import { authAtom } from "@feature/Auth/atoms/auth-atom";
import { cartInfoAtom } from "@feature/Cart/atoms/cart-atom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@context/ThemeContext";
import { wishlistAtom } from "@feature/Whislist/atoms/wishlistAtom";
import { getCartItems } from "@feature/Cart/services";
import { getUserWishlist } from "@feature/Whislist/services";

export const Navbar = () => {
  const token = authAtom.useValue();
  const { numOfCartItems } = cartInfoAtom.useValue();
  const { count } = wishlistAtom.useValue();
  const { theme, setTheme } = useContext(ThemeContext);
  
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    authAtom.update(null);
    setIsOpen(false);  
  };

  useEffect(() => {
    if (token && typeof token === "string") {
      getCartItems();
      getUserWishlist();
    }
  }, [token]);

  return (
    <nav className="bg-pink-400 p-3 dark:bg-pink-600 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        
        <Link to="/" className="z-50">
          <img className="w-50 md:w-32 h-12 object-cover" src={logo} alt="eCommerce logo" />
        </Link>

        <div className="flex items-center gap-4 lg:hidden z-50">
          {token && (
            <Link to="/cart" className="relative text-white">
              <FaCartPlus className="text-2xl" />
              <span className="text-pink-500 bg-white absolute -right-2 -top-2 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold">
                {numOfCartItems}
              </span>
            </Link>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className={`
          fixed inset-0 bg-pink-500 transition-transform duration-300 lg:static lg:bg-transparent lg:translate-x-0 lg:flex lg:items-center lg:justify-between lg:w-full lg:ml-8
          ${isOpen ? "translate-x-0 flex flex-col items-center justify-center gap-8" : "translate-x-full lg:translate-x-0"}
        `}>
          
          <ul className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 text-white font-semibold">
            <li onClick={() => setIsOpen(false)}><NavLink to="/">Home</NavLink></li>
            <li onClick={() => setIsOpen(false)}><NavLink to="/products">Products</NavLink></li>
            <li onClick={() => setIsOpen(false)}><NavLink to="/brands">Brands</NavLink></li>
            <li onClick={() => setIsOpen(false)}><NavLink to="/allorders">Orders</NavLink></li>
            <li onClick={() => setIsOpen(false)}>
              <NavLink to="/wishlist" className="relative">
                <FaRegHeart className="text-2xl lg:text-3xl" />
                <span className="text-pink-500 bg-white absolute -right-3 -top-2 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {count}
                </span>
              </NavLink>
            </li>
          </ul>

          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 mt-6 lg:mt-0">
            <div 
              className="cursor-pointer p-2 rounded-full bg-white/10 lg:bg-transparent"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <FaRegSun className="text-white text-2xl" /> : <FaRegMoon className="text-white text-2xl" />}
            </div>

            {token && (
              <Link to="/cart" className="relative hidden lg:block text-white">
                <FaCartPlus className="text-3xl" />
                <span className="text-pink-500 bg-white absolute -right-3 -top-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                  {numOfCartItems}
                </span>
              </Link>
            )}

            <ul className="flex flex-col lg:flex-row items-center gap-4 text-white font-medium">
              {!token ? (
                <>
                  <li onClick={() => setIsOpen(false)}><NavLink to="/login">Login</NavLink></li>
                  <li onClick={() => setIsOpen(false)}><NavLink to="/register" className="bg-white text-pink-500 px-4 py-1 rounded-md">Register</NavLink></li>
                </>
              ) : (
                <li>
                  <button 
                    onClick={logout}
                    className="bg-white py-1.5 px-4 font-bold rounded text-pink-500 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
};
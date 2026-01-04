import { NavLink } from "react-router-dom";
import logo from "../assets/original-dbbc84c08bd6b4b49fc97827fa5be468.webp";
export const Navbar = () => {
  return (
    <nav className="bg-pink-400 p-2">
      <div className="container mx-auto flex items-center justify-between gap-8">
       <div className="flex items-center gap-8">
         {/* Logo */}
        <div className="logo">
          <img className="w-30 h-12 object-cover" src={logo} alt="eCommerce logo " />
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
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <button >Logout</button>
        </li>
      </ul>
      </div>
    </nav>
  );
};

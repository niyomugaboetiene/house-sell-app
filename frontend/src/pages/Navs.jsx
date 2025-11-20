import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/House_Images/logo.png"

const Navs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed top-0 left-0 w-full shadow-2xl z-50 bg-gray-50 px-6 py-4 flex items-center justify-between">
        
        <div>
            <img src={logo} className="h-14 w-18"/>
        </div>
        <button
          className="text-2xl font-bold text-blue-500 absolute left-25"
          onClick={() => navigate("/")}
        >
          HomeFinder
        </button>

        <div className="hidden md:flex space-x-8 font-medium text-gray-700">
          <Link to="/" className="hover:underline transition-colors hover:text-green-500">
            Buy
          </Link>
          <Link to="/contact" className="hover:underline transition-colors hover:text-green-500">
            Rent
          </Link>
          <Link to="/about" className="hover:underline transition-colors hover:text-green-500">
            Sell
          </Link>
          <Link to="/sign-up" className="hover:underline transition-colors hover:text-green-500">
            
          </Link>
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <button
            className="bg-white p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-gray-700" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className="hidden md:block">
          <button
            className="bg-white p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-gray-700" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-6 py-6 md:hidden z-40">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500 text-lg">
            Home
          </Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500 text-lg">
            Contact
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500 text-lg">
            About
          </Link>
          <Link to="/sign-up" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500 text-lg">
            Sign Up
          </Link>
        </div>
      )}

      <div className="pt-16 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Navs;
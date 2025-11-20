import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const Navs = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isMenuShow, setIsMenuShown] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();


  return (
   <div className="fixed top-0 left-0 w-full shadow-2xl z-50 bg-white px-6 py-4 flex items-center justify-between">
      <button
        className="text-2xl font-bold text-green-500"
        onClick={() => navigate("/")}
      >
        Shop Sphere
      </button>

      <div className="hidden md:flex space-x-8 font-medium text-gray-700">
        <Link to="/" onClick={() => setIsActive1(true)} className={`hover:underline transition-colors hover:text-green-500`}>
          Home
        </Link>
        <Link to="/contact"   className={`hover:underline transition-colors hover:text-green-500 `}>
          Contact
        </Link>
        <Link to="/about" className={`hover:underline transition-colors hover:text-green-500`}>
          About
        </Link>
        <Link to="/sign-up"  className={`hover:underline transition-colors hover:text-green-500`}>
          Sign Up
        </Link>
      </div>


      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-6 py-6 md:hidden z-40">
          <div className="flex flex-col space-y-4 font-medium text-gray-700">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500">
              Home
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500">
              Contact
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500">
              About
            </Link>
            <Link to="/sign-up" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500">
              Sign Up
            </Link>
          </div>

          <button
            className="bg-white p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
            onClick={() => {
              navigate("/cart");
              setIsMobileMenuOpen(false);
            }}
          >
            <FaShoppingCart className="text-gray-700" />
          </button>
        </div>
      )}

      <div className="fixed pt-20">
        <Outlet/>
      </div>
    </div>
   );
};

export default Navs;

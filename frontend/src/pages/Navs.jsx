import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import logo from "../assets/House_Images/logo.png"
import axios from "axios";

const Navs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();

  const GetUserInfo = async() => {
    try {
        const res = await axios.get('http://localhost:5000/user/userInfo', { withCredentials: true });
        setUserInfo(res.data.user)
        console.log("My session data:", res.data.user.role)
    } catch (error) {
      console.error(error.message);
    }

  }
  useEffect(() => {
         GetUserInfo();
  }, []);

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
          <Link to="/buy" className="transition-colors hover:text-blue-500">
            Buy
          </Link>
          <Link to="/rent" className="transition-colors hover:text-blue-500">
            Rent
          </Link>
          {userInfo?.user?.role === 'seller' && (
          <Link to="/AddHouse" className="transition-colors hover:text-blue-500">
            Sell
          </Link>
          )}
          <Link to="/allHouse" className="transition-colors hover:text-blue-500">
             Properties
          </Link>
          <Link to="/liked" className="transition-colors hover:text-blue-500">
            Favorite
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

<div className="hidden md:flex items-center space-x-3">
  <button
    className="bg-white p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
    onClick={() => navigate("/myCart")}
  >
    <FaShoppingCart className="text-gray-700" />
  </button>

  <Link className="hover:underline transition-colors hover:text-blue-500">Get Help</Link>
  
  <div className="flex items-center">
    <Link 
        className="bg-blue-500 text-white px-4 py-2 rounded-l-full hover:bg-blue-600 transition-colors"
        to='/register'
    >
      SignUp
    </Link>
    <Link 
        className="border border-blue-500 border-l-0 text-blue-500 px-4 py-2 rounded-r-full hover:bg-blue-50 transition-colors"
        to='/login'
    >
      Login
    </Link>
  </div>
</div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-6 py-6 md:hidden z-40">
          <Link to="/buy" className="transition-colors hover:text-blue-500">
            Buy
          </Link>
          <Link to="/rent" className="transition-colors hover:text-blue-500">
            Rent
          </Link>
          
          {userInfo?.user?.role === 'seller' && (
          <Link to="/AddHouse" className="transition-colors hover:text-blue-500">
            Sell
          </Link>
          )}
          <Link to="/allHouse" className="transition-colors hover:text-blue-500">
             Properties
          </Link>
          <Link to="/liked" className="transition-colors hover:text-blue-500">
            Favorite
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
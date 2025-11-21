import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import logo from "../assets/House_Images/logo.png"
import axios from "axios";

const Navs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [showUserInfo, setShowUserInfo] = useState(false);
  const navigate = useNavigate();

  const GetUserInfo = async() => {
    try {
        const res = await axios.get('http://localhost:5000/user/userInfo', { withCredentials: true });
        setUserInfo(res.data.user)
        console.log("My session data:", res.data.user.image)
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
          className="text-2xl font-bold text-amber-500 absolute left-25"
          onClick={() => navigate("/")}
        >
          HomeFinder
        </button>

        <div className="hidden md:flex space-x-8 font-medium text-gray-700">
          <Link to="/" className="transition-colors hover:text-amber-500">
            Home
          </Link>
          <Link to="/buy" className="transition-colors hover:text-amber-500">
            Buy
          </Link>
          <Link to="/rent" className="transition-colors hover:text-amber-500">
            Rent
          </Link>
          {userInfo?.role === 'seller' && (
          <Link to="/AddHouse" className="transition-colors hover:text-amber-500">
            Sell
          </Link>
          )}
          {userInfo?.role === 'customer' ? (
              <Link to="/allHouse" className="transition-colors hover:text-amber-500">
                Properties
             </Link>
          ) : (
              <Link to="/myProperties" className="transition-colors hover:text-amber-500">
                  My Properties
             </Link>
          )}

          <Link to="/liked" className="transition-colors hover:text-amber-500">
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

  <Link className="hover:underline transition-colors hover:text-amber-500">Get Help</Link>
  
  <div className="flex items-center">
    <Link 
        className="bg-amber-500 text-white px-4 py-2 rounded-l-full hover:bg-amber-600 transition-colors"
        to='/register'
    >
      SignUp
    </Link>
    <Link 
        className="border border-amber-500 border-l-0 text-amber-500 px-4 py-2 rounded-r-full hover:bg-amber-50 transition-colors"
        to='/login'
    >
      Login
    </Link>
  </div>

  {userInfo && Object.keys(userInfo).length > 0 && (
  <div className="relative w-18">
     <button className="p-2 rounded-full" onClick={() => setShowUserInfo(!showUserInfo)}>
      {userInfo.image ? (
         <img src={`http://localhost:5000/${userInfo.image}`} alt="" className="w-16 object-cover rounded-full"/>
      ) : (
        <FaUser className="text-3xl text-amber-500" />
      )}
      </button>
  </div>
)}
</div>

{showUserInfo && (
<div className="absolute bg-white top-24 right-4 rounded-2xl shadow-2xl p-4">
  <div className="border w-20 h-20 rounded-full border-amber-500 flex items-center justify-center overflow-hidden">
    {userInfo?.image ? (
        <img 
            src={`http://localhost:5000/${userInfo.image}`} 
            className="w-20 h-20 object-cover"
        />
    ) : (
        <FaUser className="text-5xl text-amber-500" />
    )}
  </div>

        <h1 className="text-xl text-gray-600">Full name: <span className="font-medium capitalize">{userInfo.full_name}</span></h1>
        <p className="text-xl text-gray-500">User name: <span className="font-medium capitalize">{userInfo.user_name}</span></p>
        <p className="text-xl text-gray-500">Your role: <span className="font-medium capitalize">{userInfo.role}</span></p>
      <div className="flex justify-between mt-4">
        <button className="bg-amber-500 px-6 py-2 text-white rounded-lg hover:bg-amber-600 transition-colors">Setting</button>
        <button className="bg-red-500 px-6 py-2 text-white rounded-lg hover:bg-red-600 transition-colors">Logout</button>
      </div>
       </div>
)}
  </div>

      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-6 py-6 md:hidden z-40">
          <Link to="/buy" className="transition-colors hover:text-amber-500">
            Buy
          </Link>
          <Link to="/rent" className="transition-colors hover:text-amber-500">
            Rent
          </Link>
          
          {userInfo?.role === 'seller' && (
          <Link to="/AddHouse" className="transition-colors hover:text-amber-500">
            Sell
          </Link>
          )}
          <Link to="/allHouse" className="transition-colors hover:text-amber-500">
             Properties
          </Link>
          <Link to="/liked" className="transition-colors hover:text-amber-500">
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
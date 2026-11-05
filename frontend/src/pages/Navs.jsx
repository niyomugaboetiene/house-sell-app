import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import logo from "../assets/House_Images/logo.png";
import axios from "axios";

const Navs = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [showUserInfo, setShowUserInfo] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const HandleClickOutSide = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowUserInfo(false);
            }
        };

        document.addEventListener("mousedown", HandleClickOutSide);

        return () => {
            document.removeEventListener("mousedown", HandleClickOutSide);
        };
    }, []);

    const GetUserInfo = async () => {
        try {
            const res = await axios.get(
                `${BACKEND_URL}/user/userInfo`,
                { withCredentials: true }
            );

            setUserInfo(res.data.user);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        GetUserInfo();
    }, []);

    const Logout = async () => {
        try {
            await axios.post(
                `${BACKEND_URL}/user/logout`,
                {},
                { withCredentials: true }
            );

            setUserInfo({});
            setShowUserInfo(false);
            setIsMobileMenuOpen(false);
            navigate("/");
        } catch (error) {
            console.error(error.message);
        }
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const propertyLink =
        userInfo?.role === "customer" ||
        userInfo?.role === "admin" ||
        userInfo?.user_id === undefined;

    return (
        <>
            <div className="fixed top-0 left-0 w-full shadow-xl z-50 bg-gray-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

                    <div className="flex items-center min-w-0">
                        <img
                            src={logo}
                            alt="HomeFinder Logo"
                            className="h-10 w-12 sm:h-14 sm:w-16 object-contain"
                        />

                        <button
                            className="text-lg sm:text-xl md:text-2xl font-bold text-amber-500 whitespace-nowrap"
                            onClick={() => navigate("/")}
                        >
                            HomeFinder
                        </button>
                    </div>

                    <div className="hidden lg:flex items-center gap-5 xl:gap-8 font-medium text-gray-700">
                        <Link to="/" className="transition-colors hover:text-amber-500">
                            Home
                        </Link>

                        <Link to="/buy" className="transition-colors hover:text-amber-500">
                            Buy
                        </Link>

                        <Link to="/rent" className="transition-colors hover:text-amber-500">
                            Rent
                        </Link>

                        {userInfo?.role === "seller" && (
                            <Link to="/AddHouse" className="transition-colors hover:text-amber-500">
                                Sell
                            </Link>
                        )}

                        {propertyLink ? (
                            <Link to="/allHouse" className="transition-colors hover:text-amber-500">
                                Properties
                            </Link>
                        ) : (
                            <Link to="/myProperties" className="transition-colors hover:text-amber-500">
                                My Properties
                            </Link>
                        )}

                        <Link to="/about" className="transition-colors hover:text-amber-500">
                            About
                        </Link>

                        <Link to="/myFavorite" className="transition-colors hover:text-amber-500">
                            Favorite
                        </Link>
                    </div>

                    <div className="hidden md:flex lg:hidden items-center gap-3">
                        <Link to="/buy" className="hover:text-amber-500">Buy</Link>
                        <Link to="/rent" className="hover:text-amber-500">Rent</Link>
                        <Link to="/allHouse" className="hover:text-amber-500">Properties</Link>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">

                        <button
                            className="bg-white p-2 sm:p-3 rounded-full cursor-pointer hover:bg-gray-200 transition"
                            onClick={() => navigate("/myCart")}
                            aria-label="Open cart"
                        >
                            <FaShoppingCart className="text-gray-700 text-lg" />
                        </button>

                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                className="hover:underline transition-colors hover:text-amber-500 whitespace-nowrap"
                                to="/help"
                            >
                                Get Help
                            </Link>

                            <div className="flex items-center">
                                <Link
                                    className="bg-amber-500 text-white px-3 lg:px-4 py-2 rounded-l-full hover:bg-amber-600 transition-colors text-sm lg:text-base"
                                    to="/register"
                                >
                                    SignUp
                                </Link>

                                <Link
                                    className="border border-amber-500 border-l-0 text-amber-500 px-3 lg:px-4 py-2 rounded-r-full hover:bg-amber-50 transition-colors text-sm lg:text-base"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>

                        {userInfo && Object.keys(userInfo).length > 0 && (
                            <div className="relative" ref={menuRef}>
                                <button
                                    className="p-1 sm:p-2 rounded-full hover:bg-gray-200 transition"
                                    onClick={() => setShowUserInfo(!showUserInfo)}
                                    aria-label="User profile"
                                >
                                    {userInfo.image ? (
                                        <img
                                            src={`${BACKEND_URL}/${userInfo.image}`}
                                            alt="Profile"
                                            className="w-9 h-9 sm:w-11 sm:h-11 object-cover rounded-full"
                                        />
                                    ) : (
                                        <FaUser className="text-2xl sm:text-3xl text-amber-500" />
                                    )}
                                </button>

                                {showUserInfo && (
                                    <div className="absolute top-14 sm:top-16 right-0 bg-white rounded-xl shadow-xl p-4 sm:p-5 w-[min(320px,calc(100vw-24px))] z-50">
                                        <div className="border w-16 h-16 rounded-full border-amber-500 flex items-center justify-center overflow-hidden mx-auto mb-3">
                                            {userInfo?.image ? (
                                                <img
                                                    src={`${BACKEND_URL}/${userInfo.image}`}
                                                    className="w-16 h-16 object-cover"
                                                    alt="User profile"
                                                />
                                            ) : (
                                                <FaUser className="text-3xl text-amber-500" />
                                            )}
                                        </div>

                                        <h1 className="text-base sm:text-lg text-gray-600 mb-2 break-words">
                                            Full name: <span className="font-medium capitalize">{userInfo.full_name}</span>
                                        </h1>

                                        <p className="text-base sm:text-lg text-gray-500 mb-2 break-words">
                                            User name: <span className="font-medium capitalize">{userInfo.user_name}</span>
                                        </p>

                                        <p className="text-base sm:text-lg text-gray-500 mb-4">
                                            Your role: <span className="font-medium capitalize">{userInfo.role}</span>
                                        </p>

                                        <div className="flex justify-between gap-3 mt-4">
                                            <button
                                                className="flex-1 bg-amber-500 px-3 py-2 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm"
                                                onClick={() => {
                                                    setShowUserInfo(false);
                                                    navigate("/updateUser");
                                                }}
                                            >
                                                Setting
                                            </button>

                                            <button
                                                className="flex-1 bg-red-500 px-3 py-2 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                                                onClick={Logout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            className="md:hidden text-gray-700 p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <FaTimes size={24} />
                            ) : (
                                <FaBars size={24} />
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center gap-5 py-6 px-4 md:hidden z-40 max-h-[calc(100vh-80px)] overflow-y-auto">

                        <Link to="/" onClick={closeMobileMenu} className="hover:text-amber-500">
                            Home
                        </Link>

                        <Link to="/buy" onClick={closeMobileMenu} className="hover:text-amber-500">
                            Buy
                        </Link>

                        <Link to="/rent" onClick={closeMobileMenu} className="hover:text-amber-500">
                            Rent
                        </Link>

                        {userInfo?.role === "seller" && (
                            <Link to="/AddHouse" onClick={closeMobileMenu} className="hover:text-amber-500">
                                Sell
                            </Link>
                        )}

                        {propertyLink ? (
                            <Link to="/allHouse" onClick={closeMobileMenu} className="hover:text-amber-500">
                                Properties
                            </Link>
                        ) : (
                            <Link to="/myProperties" onClick={closeMobileMenu} className="hover:text-amber-500">
                                My Properties
                            </Link>
                        )}

                        <Link to="/about" onClick={closeMobileMenu} className="hover:text-amber-500">
                            About
                        </Link>

                        <Link to="/myFavorite" onClick={closeMobileMenu} className="hover:text-amber-500">
                            Favorite
                        </Link>

                        <Link to="/help" onClick={closeMobileMenu} className="hover:text-amber-500">
                            Get Help
                        </Link>

                        <Link to="/register" onClick={closeMobileMenu} className="text-amber-500 font-medium">
                            SignUp
                        </Link>

                        <Link to="/login" onClick={closeMobileMenu} className="text-amber-500 font-medium">
                            Login
                        </Link>
                    </div>
                )}
            </div>

            <div className="pt-16 min-h-screen">
                <Outlet />
            </div>
        </>
    );
};

export default Navs;
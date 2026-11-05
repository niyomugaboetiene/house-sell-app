import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaTwitch, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
    const [userInfo, setUserInfo] = useState([]);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const GetUserInfo = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/user/userInfo`, { withCredentials: true });
            setUserInfo(res.data.user);
            // console.log("My session data:", res.data.user.image);
            // console.log("My session data:", res.data.user.user_id);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        GetUserInfo();
    }, []);

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">

                <div className="space-y-4 min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        HomeFinder
                    </h1>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        Find your dream home with HouseFinder - The best platform for property listings in Rwanda.
                    </p>

                    <div className="space-y-3">
                        <input
                            type="email"
                            className="w-full min-w-0 px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="Enter your email"
                        />

                        <button className="w-full bg-amber-500 text-white py-2.5 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors font-medium text-sm sm:text-base">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="space-y-4 min-w-0">
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">
                        Quick Links
                    </h1>

                    <div className="space-y-3 text-gray-600 text-sm sm:text-base">
                        <Link className="block hover:text-amber-500 transition-colors" to="/">
                            Home
                        </Link>

                        <Link className="block hover:text-amber-500 transition-colors" to="/buy">
                            Buy
                        </Link>

                        {(userInfo?.role === "seller" || userInfo?.role === "admin") && (
                            <Link className="block hover:text-amber-500 transition-colors" to="/sell">
                                Sell
                            </Link>
                        )}

                        <Link className="block hover:text-amber-500 transition-colors" to="/rent">
                            Rent
                        </Link>

                        <Link className="block hover:text-amber-500 transition-colors" to="/about">
                            About Us
                        </Link>
                    </div>
                </div>

                <div className="space-y-4 min-w-0">
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">
                        Support
                    </h1>

                    <div className="space-y-4 text-gray-600 text-sm sm:text-base">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-amber-500 rounded-full shrink-0"></span>
                            <span>Kigali, Rwanda</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-amber-500 rounded-full shrink-0"></span>
                            <span>+250 728 184 299</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-amber-500 rounded-full shrink-0"></span>
                            <span className="break-all">niyomugaboetiene53@gmail.com</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 min-w-0">
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">
                        Connect With Us
                    </h1>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        Follow us for the latest property updates and listings.
                    </p>

                    <div className="grid grid-cols-3 gap-3 max-w-xs sm:max-w-none">
                        <Link
                            className="p-3 bg-gray-100 rounded-md hover:bg-blue-500 hover:text-white transition-colors group flex justify-center items-center"
                            to="https://www.facebook.com/profile.php?id=100090629463936"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <FaFacebook className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>

                        <Link
                            className="p-3 bg-gray-100 rounded-md hover:bg-pink-600 hover:text-white transition-colors group flex justify-center items-center"
                            to="https://www.instagram.com/codeexplorerrwanda"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>

                        <Link
                            className="p-3 bg-gray-100 rounded-md hover:bg-sky-500 hover:text-white transition-colors group flex justify-center items-center"
                            to="https://x.com/Niyomugabo_250"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>

                        <Link
                            className="p-3 bg-gray-100 rounded-md hover:bg-purple-600 hover:text-white transition-colors group flex justify-center items-center"
                            to="https://www.twitch.tv/signup"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitch"
                        >
                            <FaTwitch className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>

                        <Link
                            className="p-3 bg-gray-100 rounded-md hover:bg-green-500 hover:text-white transition-colors group flex justify-center items-center"
                            to="https://wa.me/250728184299"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>

                        <Link
                            className="p-3 bg-gray-100 rounded-md hover:bg-blue-600 hover:text-white transition-colors group flex justify-center items-center"
                            to="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
                            © 2025 HouseFinder. All rights reserved.
                        </p>

                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-500">
                            <Link to="/privancy" className="hover:text-amber-500 transition-colors">
                                Privacy Policy
                            </Link>

                            <Link to="/terms" className="hover:text-amber-500 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
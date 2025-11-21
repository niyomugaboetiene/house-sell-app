import { FaFacebook, FaInstagram, FaTwitter, FaTwitch, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        HouseFinder
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Find your dream home with HouseFinder - The best platform for property listings in Rwanda.
                    </p>
                    <div className="space-y-3">
                        <input 
                            type="email" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                            placeholder="Enter your email"
                        />
                        <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors font-medium">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">Quick Links</h1>
                    <div className="space-y-2 text-gray-600">
                        <Link className="block hover:text-amber-600 transition-colors" to="/">
                            Home
                        </Link>
                        <Link className="block hover:text-amber-600 transition-colors" to="/buy">
                            Buy
                        </Link>
                        <Link className="block hover:text-amber-600 transition-colors" to="/sell">
                            Sell
                        </Link>
                        <Link className="block hover:text-amber-600 transition-colors" to="/rent">
                            Rent
                        </Link>
                        <Link className="block hover:text-amber-600 transition-colors" to="/about">
                            About Us
                        </Link>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">Support</h1>
                    <div className="space-y-3 text-gray-600">
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <span>Kigali, Rwanda</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <span>+250 728 184 299</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <span>I'll enter email here later</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">Connect With Us</h1>
                    <p className="text-gray-600 text-sm">
                        Follow us for the latest property updates and listings.
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        <Link 
                            className="p-3 bg-gray-100 rounded-md hover:bg-amber-600 hover:text-white transition-colors group flex justify-center" 
                            to="https://www.facebook.com/profile.php?id=100090629463936" 
                            rel="noopener noreferrer" 
                            target="_blank"
                        >
                            <FaFacebook className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link 
                            className="p-3 bg-gray-100 rounded-md hover:bg-pink-600 hover:text-white transition-colors group flex justify-center" 
                            to="https://www.instagram.com/niyomugabo_etiene" 
                            rel="noopener noreferrer" 
                            target="_blank"
                        >
                            <FaInstagram className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link 
                            className="p-3 bg-gray-100 rounded-md hover:bg-amber-400 hover:text-white transition-colors group flex justify-center" 
                            to="https://x.com/Niyomugabo_250" 
                            rel="noopener noreferrer" 
                            target="_blank"
                        >
                            <FaTwitter className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link 
                            className="p-3 bg-gray-100 rounded-md hover:bg-purple-600 hover:text-white transition-colors group flex justify-center" 
                            to="https://www.twitch.tv/signup" 
                            rel="noopener noreferrer" 
                            target="_blank"
                        >
                            <FaTwitch className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link 
                            className="p-3 bg-gray-100 rounded-md hover:bg-green-500 hover:text-white transition-colors group flex justify-center" 
                            to="https://wa.me/+250728184299" 
                            rel="noopener noreferrer" 
                            target="_blank"
                        >
                            <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link 
                            className="p-3 bg-gray-100 rounded-md hover:bg-amber-700 hover:text-white transition-colors group flex justify-center" 
                            to="https://www.linkedin.com" 
                            rel="noopener noreferrer" 
                            target="_blank"
                        >
                            <FaLinkedinIn className="text-xl group-hover:scale-110 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-gray-500 text-sm text-center md:text-left">
                            © 2025 HouseFinder. All rights reserved.
                        </p>
                        <div className="flex space-x-4 text-sm text-gray-500">
                            <Link to="/privacy" className="hover:text-amber-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="hover:text-amber-600 transition-colors">
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
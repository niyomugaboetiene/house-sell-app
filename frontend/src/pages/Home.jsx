import React from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "./SearchedApi";
import House3 from "../assets/House_Images/house3.jpg";
import House4 from "../assets/House_Images/house4.jpg";
import House5 from "../assets/House_Images/house5.jpg";
import Lottien1 from "../assets/House_Images/lottie1.png";
import Lottien2 from "../assets/House_Images/lottie2.png";
import Lottien3 from "../assets/House_Images/lottie3.png";

const Images = [House3, House4, House5];

const HomePage = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState([]);
    const [message, setMessage] = useState("");
    const [userInfo, setUserInfo] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const fetchHouses = async () => {
        try {
            const res = await axios.get("http://localhost:5000/house/recentlyAdded", {
                withCredentials: true
            });

            setHouses(res.data.houses);

            const indexes = {};
            res.data.houses.forEach(house => {
                indexes[house._id] = 0;
            });

            setCurrentImageIndex(indexes);

        } catch (error) {
            console.error("Error fetching houses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prev) =>
                prev === Images.length - 1 ? 0 : prev + 1
            );
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchHouses();
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            alert("please enter search query");
            return;
        }

        try {
            const results = await searchProducts(searchQuery);

            navigate("/search", {
                state: {
                    results,
                    query: searchQuery
                }
            });
        } catch (error) {
            console.error("Search failed", error);
        }
    };

    const LikeProperty = async (_id) => {
        try {
            const res = await axios.post(
                `http://localhost:5000/house/like/${_id}`,
                {},
                { withCredentials: true }
            );

            const updateLike = res.data.likes;

            setHouses((prev) =>
                prev.map((h) =>
                    h._id === _id ? { ...h, likes: updateLike } : h
                )
            );

            setMessage(res.data.message || "");

            setTimeout(() => {
                setMessage("");
            }, 2000);

        } catch (error) {
            const errorMessage = error?.response?.data?.error || "Something went wrong";
            console.error(error);
            setError(errorMessage);

            setTimeout(() => {
                setError("");
            }, 2000);
        }
    };

    const GetUserInfo = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/user/userInfo",
                { withCredentials: true }
            );

            setUserInfo(res.data.user);
            console.log("My session data:", res.data.user.image);
            console.log("My session data:", res.data.user.user_id);

        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        GetUserInfo();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">

            <div className="relative w-full">
                <img
                    src={Images[imageIndex]}
                    key={imageIndex}
                    alt="Featured house"
                    className="w-full h-[420px] sm:h-[500px] md:h-[560px] lg:h-[600px] object-cover fade"
                />

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute inset-0 flex items-center">
                    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
                        <div className="max-w-3xl">
                            <h1 className="text-white font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-tight mb-5 sm:mb-7">
                                Search your desired House
                            </h1>

                            <div className="flex flex-col sm:flex-row w-full max-w-2xl bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                                <input
                                    type="text"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    className="py-3 sm:py-4 px-4 w-full min-w-0 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-100 text-sm sm:text-base"
                                    placeholder="Search by address, type of house, country, district..."
                                />

                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    className="flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-amber-500 hover:bg-amber-600 transition-colors text-white font-semibold"
                                >
                                    <FaSearch />
                                    <span className="sm:hidden">Search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-amber-500 text-center mt-8 sm:mt-10">
                New Houses
            </p>

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                {message && (
                    <div className="fixed top-24 sm:top-28 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto text-center bg-green-500 font-bold text-white px-6 py-3 rounded-lg shadow-lg z-50">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="fixed top-24 sm:top-28 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto text-center bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                        {error}
                    </div>
                )}

                <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mx-auto">

                    {houses.map((house, idx) => (
                        <div
                            key={house._id || idx}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                        >
                            <div className="relative bg-gray-200">
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="absolute top-3 right-12 bg-white p-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition z-10"
                                        onClick={() => LikeProperty(house._id)}
                                    >
                                        <FaHeart
                                            className={`${house.likes.includes(userInfo.user_id) ? "text-red-500" : "text-gray-500"} text-lg`}
                                        />
                                    </button>

                                    <p className="absolute bg-gray-900 px-2 py-1 top-3 text-white text-xs sm:text-sm font-bold rounded-full right-2">
                                        {house.likes.length}
                                    </p>
                                </div>

                                {house.image && house.image.length > 0 ? (
                                    <img
                                        src={`http://localhost:5000/House_Images/${house.image[0]}`}
                                        alt={house.title}
                                        className="w-full h-52 sm:h-56 lg:h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-52 sm:h-56 lg:h-48 flex items-center justify-center bg-gray-100">
                                        <p className="text-gray-500 text-sm">
                                            No Image Available
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 relative">
                                <div className="mb-3">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                                        {house.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                                        <p className="text-sm font-light text-gray-900">
                                            bath: <span className="font-bold">{house.bathrooms}</span>
                                        </p>

                                        <p className="text-sm font-light text-gray-900">
                                            bed: <span className="font-bold">{house.bedrooms}</span>
                                        </p>
                                    </div>

                                    <p className="text-lg sm:text-xl font-bold text-amber-500 mt-2">
                                        ${house.price}
                                    </p>
                                </div>

                                <div className="bg-green-100 p-2 mt-3 rounded-lg inline-block max-w-full">
                                    <p className="text-xs sm:text-sm text-gray-700 break-words">
                                        {house.Activity ? `For ${house.Activity}` : "For: Not specified"}
                                    </p>
                                </div>

                                <button
                                    className="w-full bg-amber-500 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors mt-4"
                                    onClick={() => navigate(`/allHouse/${house._id}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

                {houses.length === 0 && (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>

                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No properties found
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Get started by adding a new property listing.
                        </p>
                    </div>
                )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full max-w-6xl px-4 sm:px-6 py-2 mt-8 sm:mt-12 mb-9 items-stretch gap-6 mx-auto">

                <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl flex flex-col overflow-hidden">
                    <img
                        src={Lottien1}
                        alt="Buy a house"
                        className="w-48 sm:w-54 h-40 object-contain mx-auto mt-4"
                    />

                    <h1 className="text-center text-xl font-bold mt-2 text-amber-500">
                        Buy a House
                    </h1>

                    <p className="p-5 text-sm sm:text-base text-gray-700 flex-grow leading-relaxed">
                        Take the first step toward building your legacy.
                        Homeownership isn't just about having a roof over your head - it's
                        about creating a space that's truly yours, where every wall holds your
                        memories and every room reflects your journey.
                    </p>

                    <div className="p-5 pt-0">
                        <button
                            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 transition-colors px-6 py-3 text-white rounded-lg"
                            onClick={() => navigate("/buy")}
                        >
                            Buy House
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl flex flex-col overflow-hidden">
                    <img
                        src={Lottien3}
                        alt="Rent a house"
                        className="w-48 sm:w-54 h-40 object-contain mx-auto mt-4"
                    />

                    <h1 className="text-center text-xl font-bold mt-2 text-amber-500">
                        Rent a House
                    </h1>

                    <p className="p-5 text-sm sm:text-base text-gray-700 flex-grow leading-relaxed">
                        Experience the freedom to explore new neighborhoods
                        and lifestyles without long-term commitment.
                        Renting gives you the flexibility to adapt to life's
                        changes - whether it's a career move,
                        relationship shift, or simply the desire for a fresh start.
                    </p>

                    <div className="p-5 pt-0">
                        <button
                            className="w-full sm:w-auto bg-amber-500 px-6 py-3 text-white rounded-lg hover:bg-amber-600 transition-colors"
                            onClick={() => navigate("/rent")}
                        >
                            Rent House
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl flex flex-col overflow-hidden">
                    <img
                        src={Lottien2}
                        alt="Sell a house"
                        className="w-48 sm:w-54 h-40 object-contain mx-auto mt-4"
                    />

                    <h1 className="text-center text-xl font-bold text-amber-500 mt-2">
                        Sell a House
                    </h1>

                    <p className="p-5 text-sm sm:text-base text-gray-700 flex-grow leading-relaxed">
                        Your home has been more than just a house - it's been your sanctuary,
                        your memory-maker, and now it's time to turn those cherished moments into financial success.
                    </p>

                    <div className="p-5 pt-0">
                        <button
                            className="w-full sm:w-auto bg-amber-500 px-6 py-3 text-white rounded-lg hover:bg-amber-600 transition-colors"
                            onClick={() => navigate("/addHouse")}
                        >
                            Sell House
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default HomePage;
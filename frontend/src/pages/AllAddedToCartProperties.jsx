import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllAddedToCart = () => {
    const [myCart, setMyCart] = useState([]);
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState([]);
    const [message, setMessage] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const GetMyCart = async () => {
        try {
            const res = await axios.get('BACKEND_URL/house/allAddedToCart', { withCredentials: true });
            setMyCart(res.data.houses);
            const indexes = {};
            res.data.houses.forEach(house => {
                indexes[house._id] = 0;
            });
            setCurrentImageIndex(indexes);
        } catch (error) {
            console.error(error.message);
            const errorMessage = error.response?.data?.error || "Failed to load cart";
            setError(errorMessage);
        }
    };

    const LikeProperty = async (_id) => {
        try {
            const res = await axios.post(`BACKEND_URL/house/like/${_id}`, {}, { withCredentials: true });
            const updateLike = res.data.likes;
            setMyCart((prev) =>
                prev.map((h) =>
                    h._id === _id ? { ...h, likes: updateLike } : h
                )
            );
            console.log("console message", res.data.message);
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
            const res = await axios.get('BACKEND_URL/user/userInfo', { withCredentials: true });
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

    useEffect(() => {
        GetMyCart();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 mt-20 px-3 sm:px-5 lg:px-8">
            {message && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    <p className="text-white font-medium">{message}</p>
                </div>
            )}

            {error && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-red-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    <p className="text-white font-medium">{error}</p>
                </div>
            )}

            <p className="mx-2 sm:mx-6 lg:mx-10 mt-4 text-xl sm:text-2xl lg:text-3xl font-bold text-amber-500">
                All Properties Added to Cart
            </p>

            <div className="mx-auto py-6 sm:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {myCart.map((house, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden min-w-0">
                            <div className="relative h-56 sm:h-64 lg:h-72 xl:h-80 bg-gray-200">
                                <div className="relative">
                                    <button
                                        className="absolute top-3 right-12 bg-white p-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition z-10"
                                        onClick={() => LikeProperty(house._id)}
                                    >
                                        <FaHeart className={house.likes?.includes(userInfo.user_id) ? "text-red-500" : "text-gray-500"} />
                                    </button>

                                    <p className="absolute bg-gray-900 px-2 top-4 text-white font-bold rounded-full right-2 z-10">
                                        {house.likes?.length || 0}
                                    </p>
                                </div>

                                {house.image && house.image.length > 0 ? (
                                    <img
                                        src={`BACKEND_URL/House_Images/${house.image[0]}`}
                                        alt={house.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <p className="text-gray-500 text-sm">No Image Available</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 sm:p-5 lg:p-6">
                                <div className="mb-4">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 mb-3">
                                        {house.title}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-gray-900">
                                        <p className="font-light">
                                            Bath: <span className="font-bold">{house.bathrooms}</span>
                                        </p>

                                        <p className="font-light">
                                            Bed: <span className="font-bold">{house.bedrooms}</span>
                                        </p>

                                        <p className="font-light col-span-2 truncate">
                                            Owner: <span className="font-bold">{house.owner?.user_name}</span>
                                        </p>

                                        <p className="font-light col-span-2 truncate">
                                            Buyer: <span className="font-bold">{house.buyer?.user_name || "None"}</span>
                                        </p>
                                    </div>

                                    <p className="text-xl sm:text-2xl font-bold text-amber-500 mt-4">
                                        ${house.price}
                                    </p>
                                </div>

                                <button
                                    className="w-full bg-amber-500 px-4 py-2.5 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base"
                                    onClick={() => navigate(`/allHouse/${house._id}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {myCart.length === 0 && (
                    <div className="text-center py-12 px-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
        </div>
    );
};

export default AllAddedToCart;
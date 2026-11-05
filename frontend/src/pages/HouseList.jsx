import React from "react";
import axios from "axios";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HouseListComponent = () => {
    const [houses, setHouses] = useState([]);
    const [UserInfo, setUserInfo] = useState([]);
    const [error, setError] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchHouses = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/house/houses`, { withCredentials: true });
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

    const LikeProperty = async (_id) => {
        try {
            const res = await axios.post(`${BACKEND_UR}L/house/like/${_id}`, {}, { withCredentials: true });
            const updateLike = res.data.likes;

            setHouses((prev) =>
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

    useEffect(() => {
        fetchHouses();
    }, []);

    const GetUserInfo = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/user/userInfo`, { withCredentials: true });
            setUserInfo(res.data.user);
            console.log("My session data:", res.data.user.image);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        GetUserInfo();
    }, []);

    const DeleteHouse = async (_id) => {
        try {
            const confirm = window.confirm("Are you sure you want to delete this property");
            if (!confirm) return;

            await axios.post(`${BACKEND_URL}/house/delete/${_id}`, {}, { withCredentials: true });
            fetchHouses();
        } catch (error) {
            console.error(error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            {message && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    {message}
                </div>
            )}

            {error && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-red-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    {error}
                </div>
            )}

            <div className="px-4 sm:px-6 lg:px-8 pt-2">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                    &larr; Back
                </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 lg:px-8 mt-4">
                <p className="underline text-xl sm:text-2xl font-bold text-amber-500">
                    All Houses
                </p>

                {UserInfo.role === "admin" && (
                    <button
                        className="w-full sm:w-auto bg-amber-500 px-5 sm:px-6 py-2.5 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base"
                        onClick={() => navigate('/addHouse')}
                    >
                        + Add Product
                    </button>
                )}
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
                    {houses.map((house, idx) => (
                        <div
                            key={house._id || idx}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden min-w-0"
                        >
                            <div className="relative h-60 sm:h-64 lg:h-72 xl:h-80 bg-gray-200">
                                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                                    <button
                                        className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-all duration-300 hover:scale-110"
                                        onClick={() => LikeProperty(house._id)}
                                    >
                                        <FaHeart
                                            className={`text-lg transition-colors ${
                                                house.likes?.includes(UserInfo?.user_id)
                                                    ? 'text-red-500 fill-red-500'
                                                    : 'text-gray-400'
                                            }`}
                                        />
                                    </button>

                                    <span className="text-white text-sm font-bold bg-black bg-opacity-70 px-2 py-1 rounded-full min-w-8 text-center">
                                        {house.likes?.length || 0}
                                    </span>
                                </div>

                                {UserInfo.role === "admin" && (
                                    <>
                                        <button
                                            className="absolute top-16 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition z-10"
                                            onClick={() => navigate(`/update/${house._id}`)}
                                        >
                                            <FaEdit className="text-amber-500 text-xl" />
                                        </button>

                                        <button
                                            className="absolute top-28 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition z-10"
                                            onClick={() => DeleteHouse(house._id)}
                                        >
                                            <FaTrash className="text-green-500 text-xl" />
                                        </button>
                                    </>
                                )}

                                {house.image && house.image.length > 0 ? (
                                    <img
                                        src={`${BACKEND_URL}/House_Images/${house.image[0]}`}
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
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 mb-2 break-words">
                                        {house.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                                        <h3 className="text-sm font-light text-gray-900 mb-2">
                                            bath: <span className="font-bold">{house.bathrooms}</span>
                                        </h3>

                                        <h3 className="text-sm font-light text-gray-900 mb-2">
                                            bed: <span className="font-bold">{house.bedrooms}</span>
                                        </h3>
                                    </div>

                                    <p className="text-xl sm:text-2xl font-bold text-amber-500 break-words">
                                        ${(house.price)}
                                    </p>
                                </div>

                                <button
                                    className="w-full bg-amber-500 text-white py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-amber-600 transition-colors"
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
        </div>
    );
};

export default HouseListComponent;
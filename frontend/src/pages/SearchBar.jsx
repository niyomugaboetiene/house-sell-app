import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const SearchResults = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const houses = state?.results || [];
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const LikeProperty = async (_id) => {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/house/like/${_id}`,
                {},
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }
                }
            );

            setMessage(res.data.message);

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } catch (error) {
            const errorMessage = error.response?.data?.error || "Something went wrong";

            console.error(error.message);
            setError(errorMessage);

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-8">

            {message && (
                <div className="fixed top-24 sm:top-28 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    {message}
                </div>
            )}

            {error && (
                <div className="fixed top-24 sm:top-28 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-red-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    {error}
                </div>
            )}

            <div className="px-4 sm:px-6 lg:px-8">
                <p className="mt-4 text-xl sm:text-2xl lg:text-3xl font-bold text-amber-500">
                    Results
                </p>

                <div className="mx-auto py-6 sm:py-8">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">

                        {houses.map((house, idx) => (
                            <div
                                key={house._id || idx}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                            >

                                <div className="relative h-60 sm:h-64 lg:h-72 xl:h-80 bg-gray-200">

                                    {house.image && house.image.length > 0 ? (
                                        <img
                                            src={`${BACKEND_URL}/House_Images/${house.image}`}
                                            alt={house.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <p className="text-gray-500 text-sm">
                                                No Image Available
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        className="absolute top-3 right-3 bg-white p-2.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition"
                                        onClick={() => LikeProperty(house._id)}
                                    >
                                        <FaHeart className="text-red-500 text-lg sm:text-xl" />
                                    </button>

                                </div>

                                <div className="p-4 sm:p-5 lg:p-6">

                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 mb-3">
                                        {house.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-3 text-gray-700">
                                        <p>
                                            Bath: <span className="font-bold">{house.bathrooms}</span>
                                        </p>

                                        <p>
                                            Bed: <span className="font-bold">{house.bedrooms}</span>
                                        </p>
                                    </div>

                                    <p className="text-xl sm:text-2xl font-bold text-amber-500">
                                        ${house.price}
                                    </p>

                                    <button
                                        className="w-full bg-amber-500 text-white py-2.5 sm:py-3 px-4 rounded-lg mt-4 hover:bg-amber-600 transition-colors"
                                        onClick={() => navigate(`/allHouse/${house._id}`)}
                                    >
                                        View Details
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>

                    {houses.length === 0 && (
                        <div className="text-center py-12 px-4 text-gray-600">
                            <h3 className="text-lg sm:text-xl font-medium">
                                No properties found
                            </h3>

                            <p className="text-sm sm:text-base mt-2">
                                Try searching with different filters.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SearchResults;
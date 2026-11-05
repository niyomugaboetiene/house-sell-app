import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from "react-icons/fa";

const HouseListComponentWithId = () => {
    const { _id } = useParams();
    const [house, setHouse] = useState(null);
    const [watchVideo, setWatchVideo] = useState(false);
    const [message, setMessage] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const fetchHouse = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/house/houses/${_id}`,
                { withCredentials: true }
            );
            setHouse(res.data.houses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHouse();
    }, [_id]);

    const AddToCart = async (_id) => {
        try {
            await axios.post(`http://localhost:5000/house/AddToCart/${_id}`, {}, { withCredentials: true });
            setMessage("House Added to cart successfully");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.error(error.message);
        }
    };

    if (!house) return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <p className="text-lg sm:text-xl text-gray-600">Loading...</p>
        </div>
    );

    const hasImages = house.image && house.image.length > 0;

    return (
        <div className="min-h-screen bg-amber-50 py-6 sm:py-8 mt-10">
            {message && (
                <p className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-green-400 text-white px-4 sm:px-6 py-3 rounded-lg font-bold z-50 text-center shadow-lg">
                    {message}
                </p>
            )}

            <div className="px-4 sm:px-6 lg:px-8 mb-5">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                    &larr; Back
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-5 sm:mb-8">
                    House Details
                </h1>

                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8">
                    <div className="w-full lg:w-1/2 relative min-w-0">
                        {hasImages ? (
                            <div className="relative w-full h-[350px] sm:h-[500px] lg:h-[700px] xl:h-[820px] overflow-hidden rounded-2xl shadow-xl bg-gray-200">
                                <img
                                    src={`http://localhost:5000/House_Images/${house.image[currentImageIndex]}`}
                                    alt={`House Image ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />

                                {house.image.length > 1 && (
                                    <>
                                        <button
                                            className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 bg-amber-50 p-2 sm:p-3 rounded-full hover:bg-amber-100 transition duration-200 hover:scale-105 shadow-md"
                                            onClick={() =>
                                                setCurrentImageIndex(
                                                    currentImageIndex === 0
                                                        ? house.image.length - 1
                                                        : currentImageIndex - 1
                                                )
                                            }
                                        >
                                            <FaChevronLeft className="text-gray-500 text-lg sm:text-2xl" />
                                        </button>

                                        <button
                                            className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 bg-amber-50 p-2 sm:p-3 rounded-full hover:bg-amber-100 transition duration-200 hover:scale-105 shadow-md"
                                            onClick={() =>
                                                setCurrentImageIndex(
                                                    currentImageIndex === house.image.length - 1
                                                        ? 0
                                                        : currentImageIndex + 1
                                                )
                                            }
                                        >
                                            <FaChevronRight className="text-gray-500 text-lg sm:text-2xl" />
                                        </button>
                                    </>
                                )}

                                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} / {house.image.length}
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-2xl shadow-xl w-full h-[350px] sm:h-[500px] flex items-center justify-center bg-gray-100">
                                <p className="text-lg sm:text-2xl text-gray-500">No image uploaded</p>
                            </div>
                        )}
                    </div>

                    <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 min-w-0">
                        <div className="mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">
                                {house.title}
                            </h2>

                            <p className="text-base sm:text-lg text-gray-600 mb-4 break-words">
                                {house.description}
                            </p>

                            <p className="text-2xl sm:text-3xl font-bold text-amber-500">
                                ${house.price.toLocaleString()}
                            </p>
                        </div>

                        {house.location && (
                            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-100 shadow-inner rounded-xl hover:-translate-y-1 transition duration-200">
                                <h3 className="text-lg sm:text-xl font-serif text-amber-500 mb-4 text-center">
                                    Location Details
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <p className="text-sm sm:text-base text-gray-700 break-words">
                                        <span className="font-medium">Country:</span> {house.location.country}
                                    </p>

                                    <p className="text-sm sm:text-base text-gray-700 break-words">
                                        <span className="font-medium">City:</span> {house.location.city}
                                    </p>

                                    <p className="text-sm sm:text-base text-gray-700 break-words">
                                        <span className="font-medium">District:</span> {house.location.district}
                                    </p>

                                    <p className="text-sm sm:text-base text-gray-700 break-words">
                                        <span className="font-medium">Sector:</span> {house.location.sector}
                                    </p>

                                    <p className="text-sm sm:text-base text-gray-700 break-words">
                                        <span className="font-medium">Street:</span> {house.location.street}
                                    </p>

                                    <p className="text-sm sm:text-base text-gray-700 break-words">
                                        <span className="font-medium">Owner:</span> {house.owner?.full_name}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="mb-6 sm:mb-8">
                            <h3 className="text-lg sm:text-xl font-semibold text-amber-500 mb-4">
                                Property Features
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-xs sm:text-sm text-gray-600">Bedrooms</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900">{house.bedrooms}</p>
                                </div>

                                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-xs sm:text-sm text-gray-600">Bathrooms</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900">{house.bathrooms}</p>
                                </div>

                                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-xs sm:text-sm text-gray-600">Size</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900">{house.size} sqft</p>
                                </div>

                                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-xs sm:text-sm text-gray-600">Year Built</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900">{house.yearBuilt}</p>
                                </div>

                                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-xs sm:text-sm text-gray-600">Garden</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900">{house.hasGarden ? "Yes" : "No"}</p>
                                </div>

                                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-xs sm:text-sm text-gray-600">Type</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{house.PropertyType}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full sm:w-40">
                            <p className={`${house.isAvailable ? 'bg-green-500' : 'bg-red-500'} px-4 sm:px-5 py-2 mb-6 rounded-full text-white text-center font-bold text-sm sm:text-base`}>
                                Available: {house.isAvailable ? 'Yes' : 'No'}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => setWatchVideo(true)}
                                className="w-full sm:w-1/2 bg-red-500 px-4 sm:px-6 py-3 sm:py-4 text-white text-base sm:text-lg font-semibold rounded-xl hover:bg-red-400 transition duration-200 hover:scale-105 shadow-lg"
                            >
                                Watch Video
                            </button>

                            <button
                                className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-amber-500 text-white px-4 py-3 sm:py-4 rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                                onClick={() => AddToCart(house._id)}
                            >
                                <FaShoppingCart /> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {watchVideo && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-3 sm:p-4">
                        <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4 gap-3">
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    Property Video
                                </h3>

                                <button
                                    onClick={() => setWatchVideo(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl flex-shrink-0"
                                >
                                    ×
                                </button>
                            </div>

                            {house.video && house.video.length !== 0 ? (
                                <video controls className="w-full max-h-[70vh] rounded-lg">
                                    <source src={`http://localhost:5000/House_Images/${house.video}`} />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 text-base sm:text-lg">
                                        No video uploaded for this property
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HouseListComponentWithId;
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
        <div className="h-screen flex items-center justify-center">
            <p className="text-xl text-gray-600">Loading...</p>
        </div>
    );

    const hasImages = house.image && house.image.length > 0;

    return (
        <div className="min-h-screen bg-amber-50 py-8 mt-10">
            {message && (
                <p className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-6 py-2 rounded-lg font-bold z-50">
                    {message}
                </p>
            )}

            <button onClick={() => navigate(-1)} className="bg-gray-200 ms-13 px-3 py-1 hover:bg-gray-300 transition-colors">&larr; Back</button>

            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-amber-500 mb-8">House Details</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2 relative">
                        {hasImages ? (
                            <div className="w-full h-[800px] lg:h-[820px] overflow-hidden rounded-2xl shadow-xl">
                                <img
                                    src={`http://localhost:5000/House_Images/${house.image[currentImageIndex]}`}
                                    alt={`House Image ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-1/2 left-2 bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition duration-200 hover:scale-105"
                                    onClick={() =>
                                        setCurrentImageIndex(
                                            currentImageIndex === 0 ? house.image.length - 1 : currentImageIndex - 1
                                        )
                                    }
                                >
                                    <FaChevronLeft className="text-gray-500 text-2xl" />
                                </button>
                                <button
                                    className="absolute top-1/2 right-2 bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition duration-200 hover:scale-105"
                                    onClick={() =>
                                        setCurrentImageIndex(
                                            currentImageIndex === house.image.length - 1 ? 0 : currentImageIndex + 1
                                        )
                                    }
                                >
                                    <FaChevronRight className="text-gray-500 text-2xl" />
                                </button>
                                <p className="absolute bottom-2 right-1/2 transform translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                                    {currentImageIndex + 1} / {house.image.length}
                                </p>
                            </div>
                        ) : (
                            <p className="rounded-2xl shadow-xl w-full h-full text-2xl flex items-center justify-center">No image uploaded</p>
                        )}
                    </div>

                    {/* House Details */}
                    <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{house.title}</h2>
                            <p className="text-lg text-gray-600 mb-4">{house.description}</p>
                            <p className="text-3xl font-bold text-amber-500">${house.price.toLocaleString()}</p>
                        </div>

                        {house.location && (
                            <div className="mb-8 p-6 bg-gray-100 shadow-inner rounded-xl hover:-translate-y-1 transition duration-200">
                                <h3 className="text-xl font-serif text-amber-500 mb-4 text-center">Location Details</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-700"><span className="font-medium">Country:</span> {house.location.country}</p>
                                    <p className="text-gray-700"><span className="font-medium">City:</span> {house.location.city}</p>
                                    <p className="text-gray-700"><span className="font-medium">District:</span> {house.location.district}</p>
                                    <p className="text-gray-700"><span className="font-medium">Sector:</span> {house.location.sector}</p>
                                    <p className="text-gray-700"><span className="font-medium">Street:</span> {house.location.street}</p>
                                    <p className="text-gray-700"><span className="font-medium">Owner:</span> {house.owner.full_name}</p>
                                </div>
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-amber-500 mb-4">Property Features</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Bedrooms</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.bedrooms}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Bathrooms</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.bathrooms}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Size</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.size} sqft</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Year Built</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.yearBuilt}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Garden</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.hasGarden ? "Yes" : "No"}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Type</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.PropertyType}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mb-8">
                            <button
                                onClick={() => setWatchVideo(true)}
                                className="bg-red-500 px-6 py-4 text-white text-lg font-semibold rounded-xl hover:bg-red-400 transition duration-200 hover:scale-105 shadow-lg"
                            >
                                Watch Video
                            </button>
                            <button
                                className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                                onClick={() => AddToCart(house._id)}
                            >
                                <FaShoppingCart /> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {watchVideo && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-4xl w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Property Video</h3>
                                <button
                                    onClick={() => setWatchVideo(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            {house.video && house.video.length !== 0 ? (
                                <video controls className="w-full h-auto rounded-lg">
                                    <source src={`http://localhost:5000/House_Images/${house.video}`} />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 text-lg">No video uploaded for this property</p>
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

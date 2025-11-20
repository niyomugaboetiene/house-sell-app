import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {FaChevronLeft, FaChevronRight, FaShoppingCart} from "react-icons/fa"

const HouseListComponentWithId = () => {
    const { _id } = useParams();
    const [house, setHouse] = useState(null);
    const [watchVideo, setWatchVideo] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    

    const fetchHouse = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/house/houses/${_id}`,
                { withCredentials: true }
            );

            setHouse(res.data.houses); 
            console.log('Data received', res.data.houses);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchHouse();
    }, [_id]);


    const AddToCart = async(_id) => {
        try {
            await axios.post(`http://localhost:5000/house/BuyHouse/${_id}`, {}, { withCredentials: true });
            setMessage("House Added to cart successfully");
        } catch (error) {
            console.error(error.message);
        }
    }

    if (!house) return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-xl text-gray-600">Loading...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-blue-50 py-8 mt-10">
           <button onClick={() => navigate(-1)} className="bg-gray-200 ms-13 px-3 py-1 hover:bg-gray-300 transition-colors">&larr; Back</button>
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-blue-500 mb-8">House Details</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                    {house.length || house.image.length > 0 ? (
                        <div>
                           <img 
                               src={`http://localhost:5000/House_Images/${house.image}`} 
                               className="w-full h-[800px] lg:h-[820px] object-cover rounded-2xl shadow-xl"
                        />
                        <button className="absolute top-130 left-84 bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition duration-200 hover:scale-105">
                            <FaChevronLeft className="text-gray-500 text-2xl"/>
                        </button>
                        <button className="absolute top-130 left-222 bg-blue-50 p-2 rounded-full  hover:bg-blue-100 transition duration-200 hover:scale-105">
                            <FaChevronRight className="text-gray-500 text-2xl" />
                        </button>
                        </div>

                    ) : (
                        <p className="rounded-2xl shadow-xl w-full h-full text-2xl ">No image uploaded</p>
                    )}

                    </div>

                    <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{house.title}</h2>
                            <p className="text-lg text-gray-600 mb-4">{house.description}</p>
                            <p className="text-3xl font-bold text-blue-600">${house.price.toLocaleString()}</p>
                        </div>

                        {house.location && (
                            <div className="mb-8 p-6 bg-gray-100 shadow-inner shadow-sky-500xl rounded-xl hover:-translate-y-1 transition duration-200">
                                <h3 className="text-xl font-serif text-blue-500 mb-4 text-center">Location Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-700"><span className="font-medium">Country:</span> {house.location.country}</p>
                                        <p className="text-gray-700"><span className="font-medium">City:</span> {house.location.city}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><span className="font-medium">District:</span> {house.location.district}</p>
                                        <p className="text-gray-700"><span className="font-medium">Sector:</span> {house.location.sector}</p>
                                    </div>
                                    <p className="text-gray-700 md:col-span-2"><span className="font-medium">Street:</span> {house.location.street}</p>
                                </div>
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-blue-500 mb-4">Property Features</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner shadow-2xl hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Bedrooms</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.bedrooms}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner shadow-2xl hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Bathrooms</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.bathrooms}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner shadow-2xl hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Size</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.size} sqft</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner shadow-2xl hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Year Built</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.yearBuilt}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner shadow-2xl hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Garden</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.hasGarden ? "Yes" : "No"}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner shadow-2xl hover:-translate-y-1 transition duration-200">
                                    <p className="text-sm text-gray-600">Type</p>
                                    <p className="text-lg font-semibold text-gray-900">{house.PropertyType}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full hover:translate-y-1 transition duration-200 ho ${house.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                <span className="font-medium">Available: {house.isAvailable ? "Yes" : "No"}</span>
                            </div>
                        </div>
                        
                        <div className="justify-between flex">
                           <button 
                              onClick={() => setWatchVideo(true)} 
                              className="bg-red-500 px-6 py-4 text-white text-lg font-semibold rounded-xl hover:bg-red-400 transition duration-200 hover:scale-105 shadow-lg"
                          >
                              Watch Video
                          </button>
                         <button
                           className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
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
                                <video 
                                    controls 
                                    className="w-full h-auto rounded-lg"
                                >
                                    <source src={`http://localhost:5000/House_Images/${house.video}`}/>
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
    )
}

export default HouseListComponentWithId;
import React from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import House1 from "../assets/House_Images/house-1.jpg"
import House2 from "../assets/House_Images/house2.jpg"
import House3 from "../assets/House_Images/house3.jpg"
import House4 from "../assets/House_Images/house4.jpg"
import House5 from "../assets/House_Images/house5.jpg"

const Images = [House1, House2, House3, House4, House5];

const HomePage = () => {
    const [imageIndex, setImageIndex] = useState(0)
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(0);
    
    const fetchHouses = async () => {
        try {
            const res = await axios.get('http://localhost:5000/house/recentlyAdded', { withCredentials: true });
            setHouses(res.data.houses);
        } catch (error) {
            console.error("Error fetching houses:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prev) => prev === Images.length - 1 ? 0 : prev + 1)
        }, 10000);

        return () => clearInterval(interval)
    }, [])


    useEffect(() => {
        fetchHouses();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div>
                <img 
                   src={Images[imageIndex]} 
                   key={imageIndex}
                  className="w-full h-140 fade"
                />

                <div className="absolute top-50 left-11">
                    <h1 className=" text-white font-medium text-[50px]">Search your desired House</h1>
                    <div className="flex justify-between w-110 bg-gray-50 rounded-xl">
                        <input type="text" className="py-4 placeholder:text-blue-500 placeholder:font-light ps-2 w-full focus:outline-2 focus:outline-blue-500 rounded-s-lg bg-gray-100" 
                           placeholder="Search by address, type of house, country, district, ..."
                        />
                        <div className="p-5 hover:bg-gray-200 transition-colors bg-gray-100 rounded-e-2xl active:border-2 border-blue-500">
                           <FaSearch className="text-blue-500  "/>
                        </div>
                    </div>
                </div>
            </div>
            <p className="ms-10 mt-4 underline text-2xl font-bold text-blue-500">Recent House</p> 

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {houses.map((house, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                            <div className="relative bg-gray-200">
                                <div className="relative">
                                    <button
                                        className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition z-10"
                                    >
                                        <FaHeart className="text-red-500 text-lg" />
                                    </button>
                                </div>
                                {house.image && house.image.length > 0 ? (
                                    <img 
                                        src={`http://localhost:5000/House_Images/${house.image}`} 
                                        alt={house.title}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                                        <p className="text-gray-500 text-sm">No Image Available</p>
                                    </div>
                                )}
                            </div>

                            {/* Content Section - Reduced Padding */}
                            <div className="p-4">
                                <div className="mb-3">
                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                                        {house.title}
                                    </h3>
                                    <div className="flex space-x-3">
                                        <h3 className="text-sm font-light text-gray-900">
                                           bath: <span className="font-bold">{house.bathrooms}</span>
                                        </h3>
                                        <h3 className="text-sm font-light text-gray-900">
                                           bed: <span className="font-bold">{house.bedrooms}</span>
                                        </h3>
                                    </div>
                                    <p className="text-xl font-bold text-blue-600 mt-1">
                                        ${house.price}
                                    </p>
                                </div>

                                <button 
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
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
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by adding a new property listing.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage;
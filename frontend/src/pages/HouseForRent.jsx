import React from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HouseForRent = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const fetchHouses = async () => {
        try {
            const res = await axios.get('http://localhost:5000/house/rent', { withCredentials: true });
            setHouses(res.data.houses);
        } catch (error) {
            console.error("Error fetching houses:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHouses();
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
               <p className="ms-10 mt-4 text-2xl font-bold text-amber-500">Quick Rent </p> 


            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {houses.map((house, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                            <div className="relative h-80 bg-gray-200">
                              <div className="relative">
                                  <button
                                         className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition"
                                  >
                                     <FaHeart className="text-red-500 text-xl" />
                                 </button>
                                </div>
                                {house.image && house.image.length > 0 ? (
                                    <img 
                                        src={`http://localhost:5000/House_Images/${house.image}`} 
                                        alt={house.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <p className="text-gray-500 text-sm">No Image Available</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                       <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-2">
                                           {house.title}
                                        </h3>
                                    <div className="flex  space-x-2">
                                        <h3 className="text-sm font-light text-gray-900 line-clamp-2 mb-2">
                                           bath: <span className="font-bold">{house.bathrooms}</span>
                                        </h3>
                                        <h3 className="text-sm font-light text-gray-900 line-clamp-2 mb-2">
                                           bed: <span className="font-bold">{house.bedrooms} </span>
                                        </h3>
                                       </div>

                                    <p className="text-2xl font-bold text-amber-500">
                                        ${(house.price)}
                                    </p>
                                </div>

                                <button className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg text-base font-medium hover:bg-amber-600 transition-colors"
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

export default HouseForRent;
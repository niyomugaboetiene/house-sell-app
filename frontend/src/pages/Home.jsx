import React from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "./SearchedApi";
import House1 from "../assets/House_Images/house-1.jpg"
import House2 from "../assets/House_Images/house2.jpg"
import House3 from "../assets/House_Images/house3.jpg"
import House4 from "../assets/House_Images/house4.jpg"
import House5 from "../assets/House_Images/house5.jpg"

import Lottien1 from "../assets/House_Images/lottie1.png"
import Lottien2 from "../assets/House_Images/lottie2.png"
import Lottien3 from "../assets/House_Images/lottie3.png"

const Images = [House1, House2, House3, House4, House5];

const HomePage = () => {
    const [imageIndex, setImageIndex] = useState(0)
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
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

    const handleSearch = async() => {
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
            })
        } catch (error) {
            console.error("Search failed", error);
        }
    }

    const LikeProperty = async (_id) => {
    try {
        const res = await axios.post(`http://localhost:5000/house/like/${_id}`, {}, { withCredentials: true });
        const updateLike = res.data.likes;  
        setHouses((prev) =>
            prev.map((h) =>
                h._id === _id ? { ...h, likes: updateLike } : h
            )
        );
        console.log("console message", res.data.message);
        setMessage(res.data.message || "");
        // alert("liked successfully")

    } catch (error) {
        const errorMessage = error?.response?.data?.error || "Something went wrong";
        console.error(error);
        setError(errorMessage);
    }
}

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
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
                        <input type="text" 
                           onChange={(e) => setSearchQuery(e.target.value)}
                           onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                           className="py-4 placeholder:text-amber-500 placeholder:font-light ps-2 w-96 focus:outline-2 focus:outline-amber-500 rounded-s-lg bg-gray-100" 
                           placeholder="Search by address, type of house, country, district, ..."
                        />
                        <div 
                        className="p-5 hover:bg-gray-200 transition-colors bg-gray-100 rounded-e-2xl active:border-2 border-amber-500 ms-0.5"
                           onClick={handleSearch}
                        >
                           <FaSearch className="text-amber-500  "/>
                        </div>
                    </div>
                </div>
            </div>
            <p className="ms-10 text-2xl font-bold text-amber-500 text-center mt-8">New Houses</p> 

<div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
        {houses.map((house, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="relative bg-gray-200">
                    <div className="relative">
                        <button
                            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition z-10"
                            onClick={() => LikeProperty(house._id)}
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

<div className="p-4 relative"> 
    <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
            {house.title}
        </h3>
        <div className="flex space-x-3">
            <p className="text-sm font-light text-gray-900">
                bath: <span className="font-bold">{house.bathrooms}</span>
            </p>
            <p className="text-sm font-light text-gray-900"> 
                bed: <span className="font-bold">{house.bedrooms}</span>
            </p>
        </div>
        <p className="text-xl font-bold text-amber-500 mt-1">
            ${house.price}
        </p>
    </div>

    <div className="absolute bg-green-100 p-2 mt-2 top-5 right-2 rounded-full"> 
        <p className="text-sm text-gray-700">{house.Activity ? `For ${house.Activity}` : 'For: Not specified' }</p>
    </div>

         <button 
             className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
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

 <div className="grid grid-cols-3 w-[65%] p-2 mt-12 mb-9 items-stretch gap-6 mx-auto">
    <div className="bg-white shadow-2xl rounded-2xl flex flex-col">
        <img src={Lottien1} 
            className="w-54 h-40 mx-auto mt-4"
        />
        <h1 className="text-center text-xl font-bold mt-2 text-amber-500">Buy a House</h1>
        <p className="p-5 text-sm text-gray-700 flex-grow">
            Take the first step toward building your legacy.
            Homeownership isn't just about having a roof over your head - it's
            about creating a space that's truly yours, where every wall holds your
            memories and every room reflects your journey.
        </p>
        <div className="p-5">
            <button className="bg-amber-500 hover:bg-amber-600 transition-colors px-6 py-3 text-white rounded-lg ms-24"
             onClick={() => navigate('/buy')}
            >
                Buy House
        </button>
        </div>
    </div>
    
    <div className="bg-white shadow-2xl rounded-2xl flex flex-col">
        <img src={Lottien3} 
            className="w-54 h-40 mx-auto mt-4"
        />
        <h1 className="text-center text-xl font-bold mt-2 text-amber-500">Rent a House</h1>
        <p className="p-5 text-sm text-gray-700 flex-grow">
            Experience the freedom to explore new neighborhoods
            and lifestyles without long-term commitment. 
            Renting gives you the flexibility to adapt to life's
            changes - whether it's a career move, 
            relationship shift, or simply the desire for a fresh start
        </p>
        <div className="p-5">
            <button className="bg-amber-500 px-6 py-3 text-white rounded-lg  hover:bg-amber-600 transition-colors ms-24"
             onClick={() => navigate('/rent')}
            >
                Rent House
            </button>
        </div>
    </div>

    <div className="bg-white shadow-2xl rounded-2xl flex flex-col">
        <img src={Lottien2} 
            className="w-54 h-40 mx-auto mt-4"
        />
        <h1 className="text-center text-xl font-bold text-amber-500 mt-2">Sell a House</h1>
        <p className="p-5 text-sm text-gray-700 flex-grow">
            Your home has been more than just a house - it's been your sanctuary, 
            your memory-maker, and now it's time to turn those cherished moments into financial success
        </p>
        <div className="p-5">
            <button className="bg-amber-500 px-6 py-3 text-white rounded-lg hover:bg-amber-600 transition-colors ms-24"
                onClick={() => navigate('/sell')}
            >
                Sell House</button>
        </div>
    </div>
</div>
</div>
    )
}

export default HomePage;
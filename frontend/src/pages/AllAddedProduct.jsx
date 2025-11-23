import axios from "axios";
import React, { useState, useEffect }  from "react";
import { FaHeart } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

const AllAddedToCart = () => {
    const [myCart, setMyCart] = useState([]);
     const [error, setError] = useState("");
     const [userInfo, setUserInfo] = useState([]);
     const [message, setMessage] = useState("");
     const navigate = useNavigate();
    
     const GetMyCart = async() => {
            try {
               const res = await axios.get('http://localhost:5000/house/allAddedToCart', { withCredentials: true });
               setMyCart(res.data.houses);
            } catch(error) {
                console.error(error.message);
                const errorMessage = err.response?.data?.error || "Failed login";
                setError(errorMessage);
            }
        }

        const LikeProperty = async (_id) => {
            try {
                const res = await axios.post(`http://localhost:5000/house/like/${_id}`, {}, { withCredentials: true });
                const updateLike = res.data.likes;
                setMyCart((prev) =>
                    prev.map((h) =>
                      h._id === _id ? { ...h, likes: updateLike } : h
                    )
                );

            } catch (error) {
                const errorMessage = error?.response?.data?.error || "Something went wrong";
                console.error(error);
                setError(errorMessage);
            }
        }


    const GetUserInfo = async() => {
    try {
        const res = await axios.get('http://localhost:5000/user/userInfo', { withCredentials: true });
        setUserInfo(res.data.user)
        const userId = res.data.user.user_id;
        console.log("My session data:", res.data.user.image)
        console.log("My session data:", res.data.user.user_id)
    } catch (error) {
      console.error(error.message);
    }

  }
  useEffect(() => {
         GetUserInfo();
  }, []);
    useEffect(() => {
       GetMyCart();
    }, [])

    return (
 <div className="min-h-screen bg-gray-50 mt-20">
            <p className="ms-10 mt-4 text-2xl font-bold text-amber-500">All Properties added to cart</p> 
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {myCart.map((house, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                            <div className="relative h-80 bg-gray-200">
                              <div className="relative">
                                  <button
                                         className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition"
                                         onClick={() => LikeProperty(house._id)}
                                  >
                                     <FaHeart className={`${house.likes?.includes(userId)}`} />
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
                                        <h3 className="text-sm font-light text-gray-900 line-clamp-2 mb-2">
                                           Owner: <span className="font-bold">{house.owner.full_name} </span>
                                        </h3>
                                       </div>

                                    <p className="text-2xl font-bold text-amber-500">
                                        ${(house.price)}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <button 
                                   className="bg-amber-500 px-10 py-2 ms-3 text-white rounded-lg hover:bg-amber-600 transition-colors mb-4"
                                   onClick={() => navigate(`/allHouse/${house._id}`)}
                                   >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {myCart.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by adding a new property listing.</p>
                    </div>
                )}
            </div>
            {error && (
                <p>{error}</p>
            )}
        </div>
    )
}

export default AllAddedToCart
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

     const LikeProperty = async (_id) => {
        try {
           const res = await axios.post(`http://localhost:5000/house/like/${_id}`, {}, {withCredentials: true, headers: { 'Content-Type': 'application/json'} });
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
    }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
           {message && (
             <div className="fixed top-28 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg z-50">
                 {message}
            </div>
          )}
          {error && (
             <div className="fixed top-28 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg z-50">
                 {error}
            </div>
          )}
      <p className="ms-10 mt-4 text-2xl font-bold text-amber-500">
        Results
      </p>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {houses.map((house, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >

              <div className="relative h-80 bg-gray-200">
                 <div className="relative">
                      <button
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition"
                       onClick={() => LikeProperty(house._id)}
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
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-2">
                  {house.title}
                </h3>

                <div className="flex space-x-2 text-sm mb-2">
                  <p>Bath: <span className="font-bold">{house.bathrooms}</span></p>
                  <p>Bed: <span className="font-bold">{house.bedrooms}</span></p>
                </div>

                <p className="text-2xl font-bold text-amber-500">${house.price}</p>

                <button
                  className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg mt-4 hover:bg-amber-600"
                  onClick={() => navigate(`/allHouse/${house._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {houses.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            <h3 className="text-lg font-medium">No properties found</h3>
            <p>Try searching with different filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

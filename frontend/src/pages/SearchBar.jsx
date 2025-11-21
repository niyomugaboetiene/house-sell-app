import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const houses = state?.results || [];
  const [error] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <p className="ms-10 mt-4 underline text-2xl font-bold text-amber-500">
        All Houses
      </p>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {houses.map((house, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="relative h-80 bg-gray-200">

                {house.image ? (
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

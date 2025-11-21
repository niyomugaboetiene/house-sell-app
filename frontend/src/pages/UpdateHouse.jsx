import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateHouseComponent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState({
        country: '', city: '', district: '', sector: '', street: ''
    });
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [size, setSize] = useState("");
    const [yearBuilt, setYearBuilt] = useState("");
    const [parkingSpace, setParkingSpace] = useState("");
    const [hasGarden, setHasGarden] = useState(false); 
    const [PropertyType, setPropertyType] = useState("House");
    const [isAvailable, setIsAvailable] = useState(true);
    const [image, setImage] = useState(null); 
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [Activity, setActivity] = useState("");
    const [propertyInfo, setPropertyInfo] = useState([]);

    const [error, setError] = useState("");

    const { _id } = useParams();

    const FetchProperyInfo = async(req, res) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/house/houses/${_id}`,
                { withCredentials: true }
            );

            setPropertyInfo(res.data.houses); 
            console.log('Data received', res.data.houses);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        FetchProperyInfo();
    }, []);
    
    const UpdateHouse = async () => {
        try {
            setLoading(true);
            
            const formData = new FormData();
            if (title) {
                formData.append("title", title);
            }
            if (description) {
                formData.append("description", description);
            }

            if (price) {
                formData.append("price", price);
            }
            if (location) {
               formData.append("location", JSON.stringify(location));
            }
            if (bathrooms) {
                formData.append("bathrooms", bathrooms);
            }

            if (bedrooms) {
               formData.append("bedrooms", bedrooms);
            }
            if (size) {
               formData.append("size", size);
            }
            if (Activity) {
                formData.append("Activity", Activity);
            }
            if (yearBuilt) {
                formData.append("yearBuilt", yearBuilt);
            }
            if (parkingSpace) {
                formData.append("parkingSpace", parkingSpace);
            }
            if (hasGarden) {
                formData.append("hasGarden", hasGarden);
            }
            if (PropertyType) {
                formData.append("PropertyType", PropertyType);
            }
            if (isAvailable) {
                 formData.append("isAvailable", isAvailable);
            }
            
            if (video) {
                formData.append("video", video);
            }
            
            if (image) {
                formData.append("image", image); 
            }

            await axios.put(`http://localhost:5000/house/update/${_id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setError("");
            setSuccess("House Updated successfully");
            
            setTitle("");
            setDescription("");
            setPrice("");
            setLocation({ country: '', city: '', district: '', sector: '', street: '' });
            setBathrooms("");
            setBedrooms("");
            setSize("");
            setYearBuilt("");
            setParkingSpace("");
            setHasGarden(false);
            setPropertyType("House");
            setIsAvailable(true);
            setImage(null);
            setVideo("");
            
        } catch (err) {
            console.error("Error", err.response?.data || err.message);
            const errorMessage = err.response?.error;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Property</h1>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                        type="text" 
                        placeholder={propertyInfo.title}
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input 
                        type="text" 
                        placeholder={propertyInfo.description}
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input 
                        type="number" 
                        placeholder={`$ ${propertyInfo.price}`}
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <input 
            type="text" 
            // value={location.country} 
            placeholder={propertyInfo?.location?.country}
            onChange={(e) => setLocation({...location, country: e.target.value})} 
            className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
        <input 
            type="text" 
            placeholder={propertyInfo?.location?.city}
            value={location.city} 
            onChange={(e) => setLocation({...location, city: e.target.value})} 
            className="w-full px-3 py-2 placeholder:text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
        <input 
            type="text" 
            value={location.district} 
            placeholder={propertyInfo?.location?.district}
            onChange={(e) => setLocation({...location, district: e.target.value})} 
            className="w-full px-3 py-2 placeholder:text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
        <input 
            type="text" 
            value={location.sector} 
            placeholder={propertyInfo?.location?.sector}
            onChange={(e) => setLocation({...location, sector: e.target.value})} 
            className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
    <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
        <input 
            type="text" 
            value={location.street} 
            placeholder={propertyInfo?.location?.street}
            onChange={(e) => setLocation({...location, street: e.target.value})} 
            className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
     </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Bathrooms</label>
                        <input 
                            type="number" 
                            placeholder={propertyInfo.bathrooms}
                            value={bathrooms} 
                            onChange={(e) => setBathrooms(e.target.value)} 
                            className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Bedrooms</label>
                        <input 
                            type="number" 
                            placeholder={propertyInfo.bedrooms}
                            value={bedrooms} 
                            onChange={(e) => setBedrooms(e.target.value)} 
                            className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Size (sq ft)</label>
                        <input 
                            type="number" 
                            placeholder={propertyInfo.size}
                            value={size} 
                            onChange={(e) => setSize(e.target.value)} 
                            className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                        <input 
                            type="number" 
                            value={yearBuilt} 
                            placeholder={propertyInfo.yearBuilt}
                            onChange={(e) => setYearBuilt(e.target.value)} 
                            className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parking Spaces</label>
                        <input 
                            type="number" 
                            placeholder={propertyInfo.parkingSpace}
                            value={parkingSpace} 
                            onChange={(e) => setParkingSpace(e.target.value)} 
                            className="w-full px-3 py-2 border placeholder:text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 

                            checked={hasGarden} 
                            onChange={(e) => setHasGarden(e.target.checked)} 
                            className="w-4 h-4 placeholder:text-black text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-sm font-medium text-gray-700">Has Garden</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            checked={isAvailable} 
                            onChange={(e) => setIsAvailable(e.target.checked)} 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-sm font-medium text-gray-700">Is Available</label>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                        <select 
                            value={PropertyType} 
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="House">House</option>
                            <option value="Office">Office</option>
                            <option value="Industry">Industry</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Land">Land</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
                        <select 
                            value={Activity} 
                            onChange={(e) => setActivity(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="Sell">Sell</option>
                            <option value="Rent">Rent</option>
                        </select>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <input 
                            type="file" 
                            onChange={(e) => setImage(e.target.files[0])} 
                            accept="image/*" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video (Optional)</label>
                        <input 
                            type="file" 
                            onChange={(e) => setVideo(e.target.files[0])} 
                            accept="video/*"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <button 
                    onClick={UpdateHouse} 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Updaing..." : "Update"}
                </button>

                {success && (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UpdateHouseComponent;
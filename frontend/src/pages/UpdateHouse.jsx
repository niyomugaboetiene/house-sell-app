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
    const [propertyInfo, setPropertyInfo] = useState({});
    const [error, setError] = useState("");

    const { _id } = useParams();

    const FetchProperyInfo = async() => {
        try {
            const res = await axios.get(
                `http://localhost:5000/house/houses/${_id}`,
                { withCredentials: true }
            );

            const houseData = res.data.house || res.data.houses || res.data;
            setPropertyInfo(houseData);
            
            if (houseData) {
                setTitle(houseData.title || "");
                setDescription(houseData.description || "");
                setPrice(houseData.price || "");
                setLocation(houseData.location || { country: '', city: '', district: '', sector: '', street: '' });
                setBathrooms(houseData.bathrooms || "");
                setBedrooms(houseData.bedrooms || "");
                setSize(houseData.size || "");
                setYearBuilt(houseData.yearBuilt || "");
                setParkingSpace(houseData.parkingSpace || "");
                setHasGarden(houseData.hasGarden || false);
                setPropertyType(houseData.PropertyType || "House");
                setIsAvailable(houseData.isAvailable !== undefined ? houseData.isAvailable : true);
                setActivity(houseData.Activity || "");
            }
            
            console.log('Data received', houseData);
        } catch (error) {
            console.error("Error fetching property:", error);
            setError("Failed to load property data");
        }
    }

    useEffect(() => {
        FetchProperyInfo();
    }, [_id]);

    const UpdateHouse = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");
            
            const formData = new FormData();
            
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("location", JSON.stringify(location));
            formData.append("bathrooms", bathrooms);
            formData.append("bedrooms", bedrooms);
            formData.append("size", size);
            formData.append("Activity", Activity);
            formData.append("yearBuilt", yearBuilt);
            formData.append("parkingSpace", parkingSpace);
            formData.append("hasGarden", hasGarden);
            formData.append("PropertyType", PropertyType);
            formData.append("isAvailable", isAvailable);
            
            if (video) {
                formData.append("video", video);
            }
            
            if (image) {
                formData.append("image", image); 
            }

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await axios.put(`http://localhost:5000/house/update/${_id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Update response:', response.data);

            setSuccess("House updated successfully");
            
        } catch (err) {
            console.error("Update Error:", err.response?.data || err.message);
            const errorMessage = err.response?.data?.error || "Failed to update house";
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input 
                            type="text" 
                            value={location.country} 
                            onChange={(e) => setLocation({...location, country: e.target.value})} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input 
                            type="text" 
                            value={location.city} 
                            onChange={(e) => setLocation({...location, city: e.target.value})} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                        <input 
                            type="text" 
                            value={location.district} 
                            onChange={(e) => setLocation({...location, district: e.target.value})} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                        <input 
                            type="text" 
                            value={location.sector} 
                            onChange={(e) => setLocation({...location, sector: e.target.value})} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                        <input 
                            type="text" 
                            value={location.street} 
                            onChange={(e) => setLocation({...location, street: e.target.value})} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Bathrooms</label>
                        <input 
                            type="number" 
                            value={bathrooms} 
                            onChange={(e) => setBathrooms(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Bedrooms</label>
                        <input 
                            type="number" 
                            value={bedrooms} 
                            onChange={(e) => setBedrooms(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Size (sq ft)</label>
                        <input 
                            type="number" 
                            value={size} 
                            onChange={(e) => setSize(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                        <input 
                            type="number" 
                            value={yearBuilt} 
                            onChange={(e) => setYearBuilt(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parking Spaces</label>
                        <input 
                            type="number" 
                            value={parkingSpace} 
                            onChange={(e) => setParkingSpace(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            checked={hasGarden} 
                            onChange={(e) => setHasGarden(e.target.checked)} 
                            className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        />
                        <label className="text-sm font-medium text-gray-700">Has Garden</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            checked={isAvailable} 
                            onChange={(e) => setIsAvailable(e.target.checked)} 
                            className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video (Optional)</label>
                        <input 
                            type="file" 
                            onChange={(e) => setVideo(e.target.files[0])} 
                            accept="video/*"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <button 
                    onClick={UpdateHouse} 
                    disabled={loading}
                    className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Updating..." : "Update Property"}
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
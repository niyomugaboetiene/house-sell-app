import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HouseComponent = () => {
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
    const [PropertyType, setPropertyType] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [image, setImage] = useState(null); 
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [Activity, setActivity] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const AddHouse = async () => {
        if (!title || !description || !price || !bathrooms  || !bedrooms || !size || !yearBuilt || !Activity) {
            alert("Missing some fields");
            return;
        }

        try {
            setLoading(true);
            
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

            await axios.post('http://localhost:5000/house/add', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setError("");            
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
            setSuccess("House added successfully");

            setTimeout(() => {
                navigate('/');
                setSuccess("");
            }, 2000);
            
        } catch (err) {
            console.error("Error", err.response?.data || err.message);
            const errorMessage = err.response?.data?.error || "Some thing went wrong";
            if (err.response?.status === 401) {
                 setError(errorMessage);
                 setTimeout(() => {
                      navigate('/login');
                      setError("");
                 }, 3000);
            } else {
                setError(errorMessage);
                setTimeout(() => {
                    setError("");
                }, 3000);
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md  border-amber-500 border-2">
           {error && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-500 font-bold text-white px-6 py-3 rounded-lg shadow-lg z-50">
                   <p className="text-white font-medium">{error}</p>
                </div>
           )}
           
           {success && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 font-bold text-white px-6 py-3 rounded-lg shadow-lg z-50">
                   <p className="text-white font-medium">{success}</p>
                </div>
             )}
            <h1 className="text-2xl font-bold text-amber-500 mb-6">Sell New Property</h1>
            
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
                            className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                        />
                        <label className="text-sm font-medium text-gray-700">Has Garden</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            checked={isAvailable} 
                            onChange={(e) => setIsAvailable(e.target.checked)} 
                            className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
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
                            <option value="" disabled>Select propery type</option>
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
                            <option value="" disabled>Select activity</option>
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

             <div className="flex justify-between">
                <button 
                    onClick={AddHouse} 
                    disabled={loading}
                    className="w-1/2 bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Adding..." : "Add House"}
                </button>
               <button onClick={() => navigate(-1)} className="rounded-lg border-2 hover:text-white w-1/2 border-amber-500 ms-13 px-3 py-1 hover:bg-amber-500 transition-colors">&larr; Back</button>
             </div>
            </div>
        </div>
    )
}

export default HouseComponent;
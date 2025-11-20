import { useState } from "react";
import axios from "axios";

const HouseComponent = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: { country: '', city: '', district: '', sector: '', street: '' },
        bathrooms: "",
        bedrooms: "",
        size: "",
        yearBuilt: "",
        parkingSpace: "",
        hasGarden: false,
        PropertyType: "House",
        isAvailable: true,
        Activity: ""
    });
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            location: {
                ...prev.location,
                [name]: value
            }
        }));
    };

    const AddHouse = async () => {
        const { title, description, price, bathrooms, bedrooms, size, yearBuilt, Activity } = formData;
        
        if (!title || !description || !price || !bathrooms || !bedrooms || !size || !yearBuilt || !Activity) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            setLoading(true);
            setError("");
            
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'location') {
                    submitData.append(key, JSON.stringify(formData[key]));
                } else {
                    submitData.append(key, formData[key]);
                }
            });
            
            if (image) submitData.append("image", image);
            if (video) submitData.append("video", video);

            await axios.post('http://localhost:5000/house/add', submitData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSuccess("House added successfully");
            
            setFormData({
                title: "",
                description: "",
                price: "",
                location: { country: '', city: '', district: '', sector: '', street: '' },
                bathrooms: "",
                bedrooms: "",
                size: "",
                yearBuilt: "",
                parkingSpace: "",
                hasGarden: false,
                PropertyType: "House",
                isAvailable: true,
                Activity: ""
            });
            setImage(null);
            setVideo(null);
            
        } catch (err) {
            console.error("Error", err.response?.data || err.message);
            setError(err.response?.data?.error || "Failed to add house");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-15">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Property</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter property title"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter property description"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                            <input 
                                type="number" 
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms *</label>
                            <input 
                                type="number" 
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms *</label>
                            <input 
                                type="number" 
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Size (sq ft) *</label>
                            <input 
                                type="number" 
                                name="size"
                                value={formData.size}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year Built *</label>
                            <input 
                                type="number" 
                                name="yearBuilt"
                                value={formData.yearBuilt}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1800"
                                max={new Date().getFullYear()}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Location Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['country', 'city', 'district', 'sector', 'street'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
                            <input 
                                type="text" 
                                name={field}
                                value={formData.location[field]}
                                onChange={handleLocationChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Enter ${field}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Features */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parking Spaces</label>
                        <input 
                            type="number" 
                            name="parkingSpace"
                            value={formData.parkingSpace}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                        />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            id="hasGarden"
                            name="hasGarden"
                            checked={formData.hasGarden}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="hasGarden" className="text-sm font-medium text-gray-700">
                            Has Garden
                        </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            id="isAvailable"
                            name="isAvailable"
                            checked={formData.isAvailable}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
                            Available for Viewing
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                        <select 
                            name="PropertyType"
                            value={formData.PropertyType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="House">House</option>
                            <option value="Office">Office</option>
                            <option value="Industry">Industry</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Land">Land</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Activity *</label>
                        <select 
                            name="Activity"
                            value={formData.Activity}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Activity</option>
                            <option value="Sell">Sell</option>
                            <option value="Rent">Rent</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Image *</label>
                    <input 
                        type="file" 
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video Tour (Optional)</label>
                    <input 
                        type="file" 
                        onChange={(e) => setVideo(e.target.files[0])}
                        accept="video/*"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button 
                    onClick={AddHouse} 
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding Property...
                        </span>
                    ) : "Add Property"}
                </button>
            </div>

            <div className="mt-4">
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
    );
};

export default HouseComponent;
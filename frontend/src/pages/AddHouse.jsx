
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

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const AddHouse = async () => {
        if (!title || !description || !price || !bathrooms || !bedrooms || !size || !yearBuilt || !Activity) {
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

            await axios.post(`${BACKEND_URL}/house/add`, formData, {
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
            setVideo(null);
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
    };

    const inputClass = "w-full min-w-0 px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base";

    const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

    return (
        <div className="min-h-screen bg-gray-50 px-3 sm:px-5 md:px-6 py-8 sm:py-12 md:py-16">
            {error && (
                <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-auto max-w-md bg-red-500 font-bold text-white px-5 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    <p className="text-white font-medium">{error}</p>
                </div>
            )}

            {success && (
                <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-auto max-w-md bg-green-500 font-bold text-white px-5 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    <p className="text-white font-medium">{success}</p>
                </div>
            )}

            <div className="max-w-3xl w-full mx-auto mt-8 sm:mt-10 md:mt-12 p-4 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-md border-amber-500 border-2">

                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-500 mb-6 sm:mb-8">
                    Sell New Property
                </h1>

                <div className="space-y-5 sm:space-y-6">

                    <div>
                        <label className={labelClass}>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={inputClass}
                            placeholder="Enter property title"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`${inputClass} min-h-28 resize-y`}
                            placeholder="Describe your property"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className={inputClass}
                            placeholder="Enter price"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className={labelClass}>Country</label>
                            <input
                                type="text"
                                value={location.country}
                                onChange={(e) => setLocation({ ...location, country: e.target.value })}
                                className={inputClass}
                                placeholder="Country"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>City</label>
                            <input
                                type="text"
                                value={location.city}
                                onChange={(e) => setLocation({ ...location, city: e.target.value })}
                                className={inputClass}
                                placeholder="City"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>District</label>
                            <input
                                type="text"
                                value={location.district}
                                onChange={(e) => setLocation({ ...location, district: e.target.value })}
                                className={inputClass}
                                placeholder="District"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Sector</label>
                            <input
                                type="text"
                                value={location.sector}
                                onChange={(e) => setLocation({ ...location, sector: e.target.value })}
                                className={inputClass}
                                placeholder="Sector"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className={labelClass}>Street</label>
                            <input
                                type="text"
                                value={location.street}
                                onChange={(e) => setLocation({ ...location, street: e.target.value })}
                                className={inputClass}
                                placeholder="Street"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className={labelClass}>Number of Bathrooms</label>
                            <input
                                type="number"
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                                className={inputClass}
                                placeholder="Bathrooms"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Number of Bedrooms</label>
                            <input
                                type="number"
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                                className={inputClass}
                                placeholder="Bedrooms"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Size (sq ft)</label>
                            <input
                                type="number"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                className={inputClass}
                                placeholder="Property size"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Year Built</label>
                            <input
                                type="number"
                                value={yearBuilt}
                                onChange={(e) => setYearBuilt(e.target.value)}
                                className={inputClass}
                                placeholder="Year built"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Parking Spaces</label>
                            <input
                                type="number"
                                value={parkingSpace}
                                onChange={(e) => setParkingSpace(e.target.value)}
                                className={inputClass}
                                placeholder="Parking spaces"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors">
                            <input
                                type="checkbox"
                                checked={hasGarden}
                                onChange={(e) => setHasGarden(e.target.checked)}
                                className="w-5 h-5 shrink-0 accent-amber-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Has Garden</span>
                        </label>

                        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors">
                            <input
                                type="checkbox"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                                className="w-5 h-5 shrink-0 accent-amber-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Is Available</span>
                        </label>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className={labelClass}>Property Type</label>
                            <select
                                value={PropertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className={inputClass}
                            >
                                <option value="" disabled>Select property type</option>
                                <option value="House">House</option>
                                <option value="Office">Office</option>
                                <option value="Industry">Industry</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Land">Land</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>Activity</label>
                            <select
                                value={Activity}
                                onChange={(e) => setActivity(e.target.value)}
                                className={inputClass}
                            >
                                <option value="" disabled>Select activity</option>
                                <option value="Sell">Sell</option>
                                <option value="Rent">Rent</option>
                            </select>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className={labelClass}>Image</label>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                accept="image/*"
                                className={`${inputClass} file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-amber-100 file:text-amber-700 file:font-medium`}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Video (Optional)</label>
                            <input
                                type="file"
                                onChange={(e) => setVideo(e.target.files[0])}
                                accept="video/*"
                                className={`${inputClass} file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-amber-100 file:text-amber-700 file:font-medium`}
                            />
                        </div>

                    </div>

                    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-3">

                        <button
                            onClick={() => navigate(-1)}
                            className="w-full sm:w-1/2 rounded-lg border-2 border-amber-500 text-amber-600 px-4 py-3 font-semibold hover:text-white hover:bg-amber-500 transition-colors"
                        >
                            &larr; Back
                        </button>

                        <button
                            onClick={AddHouse}
                            disabled={loading}
                            className="w-full sm:w-1/2 bg-amber-500 text-white py-3 px-4 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                        >
                            {loading ? "Adding..." : "Add House"}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default HouseComponent;

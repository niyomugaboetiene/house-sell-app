import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateHouseComponent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState({
        country: "",
        city: "",
        district: "",
        sector: "",
        street: ""
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
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const { _id } = useParams();

    const FetchProperyInfo = async () => {
        try {
            const res = await axios.get(
                `BACKEND_URL/house/houses/${_id}`,
                { withCredentials: true }
            );

            const houseData = res.data.house || res.data.houses || res.data;
            setPropertyInfo(houseData);

            if (houseData) {
                setTitle(houseData.title || "");
                setDescription(houseData.description || "");
                setPrice(houseData.price || "");
                setLocation(
                    houseData.location || {
                        country: "",
                        city: "",
                        district: "",
                        sector: "",
                        street: ""
                    }
                );
                setBathrooms(houseData.bathrooms || "");
                setBedrooms(houseData.bedrooms || "");
                setSize(houseData.size || "");
                setYearBuilt(houseData.yearBuilt || "");
                setParkingSpace(houseData.parkingSpace || "");
                setHasGarden(houseData.hasGarden || false);
                setPropertyType(houseData.PropertyType || "House");
                setIsAvailable(
                    houseData.isAvailable !== undefined
                        ? houseData.isAvailable
                        : true
                );
                setActivity(houseData.Activity || "");
            }

            console.log("Data received", houseData);
        } catch (error) {
            console.error("Error fetching property:", error);
            setError("Failed to load property data");
        }
    };

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

            if (image && image.length > 0) {
                image.forEach((img) => formData.append("image", img));
            }

            const response = await axios.put(
                `BACKEND_URL/house/update/${_id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setSuccess("House updated successfully");
            navigate("/");

        } catch (err) {
            console.error(
                "Update Error:",
                err.response?.data || err.message
            );

            const errorMessage =
                err.response?.data?.error || "Failed to update house";

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = "w-full min-w-0 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm sm:text-base";

    const labelStyle = "block text-sm font-medium text-gray-700 mb-1.5";

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8 sm:py-10 mt-16">

            <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">

                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Update Property
                    </h1>

                    <p className="text-sm sm:text-base text-gray-500 mt-2">
                        Update your property information and details.
                    </p>
                </div>

                <div className="space-y-5 sm:space-y-6">

                    <div>
                        <label className={labelStyle}>Title</label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={inputStyle}
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Description</label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className={`${inputStyle} resize-y`}
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Price</label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className={inputStyle}
                        />
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                            Property Location
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div>
                                <label className={labelStyle}>Country</label>

                                <input
                                    type="text"
                                    value={location.country || ""}
                                    onChange={(e) =>
                                        setLocation({
                                            ...location,
                                            country: e.target.value
                                        })
                                    }
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>City</label>

                                <input
                                    type="text"
                                    value={location.city || ""}
                                    onChange={(e) =>
                                        setLocation({
                                            ...location,
                                            city: e.target.value
                                        })
                                    }
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>District</label>

                                <input
                                    type="text"
                                    value={location.district || ""}
                                    onChange={(e) =>
                                        setLocation({
                                            ...location,
                                            district: e.target.value
                                        })
                                    }
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>Sector</label>

                                <input
                                    type="text"
                                    value={location.sector || ""}
                                    onChange={(e) =>
                                        setLocation({
                                            ...location,
                                            sector: e.target.value
                                        })
                                    }
                                    className={inputStyle}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className={labelStyle}>Street</label>

                                <input
                                    type="text"
                                    value={location.street || ""}
                                    onChange={(e) =>
                                        setLocation({
                                            ...location,
                                            street: e.target.value
                                        })
                                    }
                                    className={inputStyle}
                                />
                            </div>

                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                            Property Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div>
                                <label className={labelStyle}>
                                    Number of Bathrooms
                                </label>

                                <input
                                    type="number"
                                    value={bathrooms}
                                    onChange={(e) => setBathrooms(e.target.value)}
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>
                                    Number of Bedrooms
                                </label>

                                <input
                                    type="number"
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(e.target.value)}
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>
                                    Size (sq ft)
                                </label>

                                <input
                                    type="number"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>Year Built</label>

                                <input
                                    type="number"
                                    value={yearBuilt}
                                    onChange={(e) => setYearBuilt(e.target.value)}
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>
                                    Parking Spaces
                                </label>

                                <input
                                    type="number"
                                    value={parkingSpace}
                                    onChange={(e) => setParkingSpace(e.target.value)}
                                    className={inputStyle}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <label className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={hasGarden}
                                onChange={(e) => setHasGarden(e.target.checked)}
                                className="w-4 h-4 shrink-0 accent-amber-500"
                            />

                            <span className="text-sm font-medium text-gray-700">
                                Has Garden
                            </span>
                        </label>

                        <label className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                                className="w-4 h-4 shrink-0 accent-amber-500"
                            />

                            <span className="text-sm font-medium text-gray-700">
                                Is Available
                            </span>
                        </label>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className={labelStyle}>Property Type</label>

                            <select
                                value={PropertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className={inputStyle}
                            >
                                <option value="House">House</option>
                                <option value="Office">Office</option>
                                <option value="Industry">Industry</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Land">Land</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelStyle}>Activity</label>

                            <select
                                value={Activity}
                                onChange={(e) => setActivity(e.target.value)}
                                className={inputStyle}
                            >
                                <option value="Sell">Sell</option>
                                <option value="Rent">Rent</option>
                            </select>
                        </div>

                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                            Property Media
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="min-w-0">
                                <label className={labelStyle}>Images</label>

                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setImage(Array.from(e.target.files))
                                    }
                                    accept="image/*"
                                    multiple
                                    className={`${inputStyle} file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-amber-50 file:text-amber-700`}
                                />

                                <p className="text-xs text-gray-500 mt-2">
                                    Select new images if you want to replace or add images.
                                </p>
                            </div>

                            <div className="min-w-0">
                                <label className={labelStyle}>
                                    Video (Optional)
                                </label>

                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setVideo(e.target.files[0])
                                    }
                                    accept="video/*"
                                    className={`${inputStyle} file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-amber-50 file:text-amber-700`}
                                />
                            </div>

                        </div>
                    </div>

                    <button
                        onClick={UpdateHouse}
                        disabled={loading}
                        className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                        {loading ? "Updating..." : "Update Property"}
                    </button>

                    {success && (
                        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm sm:text-base">
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm sm:text-base">
                            {error}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default UpdateHouseComponent;
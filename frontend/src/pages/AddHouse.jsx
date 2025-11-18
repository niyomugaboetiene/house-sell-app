import { useState } from "react";
import axios from "axios";

const HouseComponent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState({
        country: '', city: '', district: '', sector: '', street: ''
    });
    const [bathrooms, setBathrooms] = useState("");
    const [size, setSize] = useState("");
    const [yearBuilt, setYearBuilt] = useState("");
    const [parkingSpace, setParkingSpace] = useState("");
    const [hasGarden, setHasGarden] = useState(false); 
    const [PropertyType, setPropertyType] = useState("House");
    const [isAvailable, setIsAvailable] = useState(true);
    const [image, setImage] = useState(null); 
    const [video, setVideo] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const AddHouse = async () => {
        if (!title || !description || !price || !bathrooms || !size || !yearBuilt) {
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
            formData.append("size", size);
            formData.append("yearBuilt", yearBuilt);
            formData.append("parkingSpace", parkingSpace);
            formData.append("hasGarden", hasGarden);
            formData.append("PropertyType", PropertyType);
            formData.append("isAvailable", isAvailable);
            formData.append("video", video);
            
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
            setSuccess("House added successfully");
            
            setTitle("");
            setDescription("");
            setPrice("");
            setLocation({ country: '', city: '', district: '', sector: '', street: '' });
            setBathrooms("");
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
        <div>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            
            <div>
                <h1>Location</h1>
                <div>
                    <label>Country</label>
                    <input type="text" value={location.country} onChange={(e) => setLocation({...location, country: e.target.value})} />
                </div>
                <div>
                    <label>City</label>
                    <input type="text" value={location.city} onChange={(e) => setLocation({...location, city: e.target.value})} />
                </div>
                <div>
                    <label>District</label>
                    <input type="text" value={location.district} onChange={(e) => setLocation({...location, district: e.target.value})} />
                </div>
                <div>
                    <label>Sector</label>
                    <input type="text" value={location.sector} onChange={(e) => setLocation({...location, sector: e.target.value})} />
                </div>
                <div>
                    <label>Street</label>
                    <input type="text" value={location.street} onChange={(e) => setLocation({...location, street: e.target.value})} />
                </div>
            </div>
            
            <div>
                <label>Number of Bathrooms</label>
                <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
            </div>
            <div>
                <label>Size (sq ft)</label>
                <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
            </div>
            <div>
                <label>Year Built</label>
                <input type="number" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} />
            </div>
            <div>
                <label>Parking Spaces</label>
                <input type="number" value={parkingSpace} onChange={(e) => setParkingSpace(e.target.value)} />
            </div>
            
            <div>
                <label>Has Garden</label>
                <input type="checkbox" checked={hasGarden} onChange={(e) => setHasGarden(e.target.checked)} />
            </div>
            
            <div>
                <label>Property Type</label>
                <select value={PropertyType} onChange={(e) => setPropertyType(e.target.value)}>
                    <option value="House">House</option>
                    <option value="Office">Office</option>
                    <option value="Industry">Industry</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Land">Land</option>
                </select>
            </div>
            
            <div>
                <label>Image</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
            </div>
            
            <div>
                <label>Video URL (Optional)</label>
                <input type="text" value={video} onChange={(e) => setVideo(e.target.value)} />
            </div>
            
            <div>
                <label>Is Available</label>
                <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
            </div>

            <button onClick={AddHouse} disabled={loading}>
                {loading ? "Adding..." : "Add House"}
            </button>

            {success && <div style={{color: 'green'}}>{success}</div>}
            {error && <div style={{color: 'red'}}>{error}</div>}
        </div>
    )
}

export default HouseComponent;
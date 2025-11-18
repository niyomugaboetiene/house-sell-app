import { useState } from "react";
import axios from "axios";

const HouseComponent = () => {
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState({
        country: '', city: '', district: '', sector: '', street: ''
    });
    const [bathrooms, setBathrooms] = useState("");
    const [size, setSize]  = useState("");
    const [yearBuilt, setYearBuilt] = useState("");
    const [parkingSpace, setParkingSpace] = useState("");
    const [PropertyType, setPropertyType] = useState("House")
    const [isAvailable, setIsAvailable] = useState(true)
    const [image, setImage] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const AddHouse = async() => {
        if  (!title || !description || !price  || !bathrooms || !size)  {
            alert("Missing some fields");
            return;
        }

        try {
           axios.post('http://localhost:5000/house/add', {
               title, 
               description, 
               price: Number(price), 
               location, 
               bathrooms: Number(bathrooms), 
               size: Number(size), 
               yearBuilt: Number(yearBuilt),
               parkingSpace: Number(parkingSpace), 
               PropertyType, 
               isAvailable, 
               image
           }, { withCredentials: true });

           setError("");
           setSuccess("Housed addedd successfully");
        } catch (err) {
            console.error("Error", err.message);
            setError("Error during adding house");
        }
    }

    return (
        <div>
            <div>
                <label>title</label>
                <input type="text"  onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>description</label>
                <input type="text"  onChange={(e) => setdescription(e.target.value)} />
            </div>
            <div>
                <label>price</label>
                <input type="text"  onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
                <h1>location</h1>
                <div>
                    <label>Country</label>
                    <input type="text"  onChange={(e) => setLocation({...prev, country: e.target.value })} />
                </div>
                <div>
                    <label>City</label>
                    <input type="text"  onChange={(e) => setLocation({...prev, city: e.target.value })} />
                </div>
                <div>
                    <label>District</label>
                    <input type="text"  onChange={(e) => setLocation({...prev, district: e.target.value })} />
                </div>
                <div>
                    <label>Sector</label>
                    <input type="text"  onChange={(e) => setLocation({...prev, sector: e.target.value })} />
                </div>
                <div>
                    <label>Street</label>
                    <input type="text"  onChange={(e) => setLocation({...prev, street: e.target.value })} />
                </div>
            </div>
            <div>
                <label>Number of Bathrooms</label>
                <input type="text"  onChange={(e) => setBathrooms(e.target.value)} />
            </div>
            <div>
                <label>Number of Parking space</label>
                <input type="text"  onChange={(e) => setParkingSpace(e.target.value)} />
            </div>
            <div>
            <div>
                <label>Choose Property Type</label>
                <select onChange={(e) => setPropertyType(e.target.value)}>
                    <option value="House">House</option>
                    <option value="Office">House</option>
                    <option value="Industry">House</option>
                    <option value="Apartment">House</option>
                    <option value="Land">House</option>
                </select>
            </div>
            <div>
                <label>Image</label>
                <input type="text"  onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
            </div>
    
            <div>
                <label>Is Available</label>
                <input type="checkbox"  onChange={(e) => setIsAvailable(true)} />
            </div>
        </div>
    )
}
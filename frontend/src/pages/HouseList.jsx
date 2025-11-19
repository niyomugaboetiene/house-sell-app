import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const HouseListComponent = () => {
    const [house, setHouse] = useState([]);
    
    const HouseList = async() => {
        const res = await axios.get('http://localhost:5000/house/houses', { withCredentials: true });
        
        setHouse(res.data.houses);
    }

    useEffect(() => {
        HouseList();
    }, []);


    return (
        <div>
            <div>
                <h1>House list</h1>
                {house.map((item, idx) => (
                    <div key={idx}>
                        {/*            title,
                 description,
                 price,
                 location: locationData,
                 bathrooms,
                 size,
                 yearBuilt,
                 parkingSpace,
                 hasGarden,
                 PropertyType,
                 owner: owner,
                 isAvailable,
                 image: imagePath,
                 video: videoPath */}
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        {item.location && (
                            `Location: ${item.location.country}, 
                             City: ${item.location.city},
                             District: ${item.location.district}, 
                             Sector: ${item.location.sector}, 
                             Street: ${item.location.street}`
                        )}
                        <p>Bathrooms: {item.bathrooms}</p>
                        <p>Size: {item.size}</p>
                        <p>Year Built: {item.size}</p>
                        <p>Has Garden: {item.hasGarden ? "Yes": "No"}</p>
                        <p>Property Type: {item.PropertyType}</p>
                        <p>Available: {item.isAvailable ? "Yes": "No" }</p>
                        <img src={`http://localhost:5000/House_Images/${item.image }`} alt="" />
                        <video src={`http://localhost:5000/House_Images/${item.video}`}></video>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HouseListComponent;
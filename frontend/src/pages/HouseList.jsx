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
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HouseListComponent;
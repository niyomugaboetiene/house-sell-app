import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HouseListComponentWithId = () => {
    const { _id } = useParams();
    const [house, setHouse] = useState([]);
    

    const fetchHouse = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/house/houses/${_id}`,
                { withCredentials: true }
            );

            setHouse(res.data.houses); 
            console.log('Data received', res.data.houses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHouse();
    }, [_id]);

    return (
        <div>
            <div>
                <h1>House list</h1>
                {house.map((item, idx) => (
                    <div key={idx}>

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
                        
                        {item.video.length !== 0 ? (
                           <video controls>
                               <source src={`http://localhost:5000/House_Images/${item.video}`}/>
                           </video>
                        ): (
                            <p>No video uploaded</p>
                        )}

                    </div>
                ))}
            </div>
        </div>
    )
}

export default HouseListComponentWithId;
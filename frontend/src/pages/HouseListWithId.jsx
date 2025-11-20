import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HouseListComponentWithId = () => {
    const { _id } = useParams();
    const [house, setHouse] = useState(null);
    

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

    if (!house) return <p>Loading...</p>
    return (
        <div>
            <div>
                <h1>House list</h1>

                        <p>{house.title}</p>
                        <p>{house.description}</p>
                        <p>{house.price}</p>
                        {house.location && (
                            `Location: ${house.location.country}, 
                             City: ${house.location.city},
                             District: ${house.location.district}, 
                             Sector: ${house.location.sector}, 
                             Street: ${house.location.street}`
                        )}
                        <p>Bathrooms: {house.bathrooms}</p>
                        <p>Bathrooms: {house.bedrooms}</p>
                        <p>Size: {house.size}</p>
                        <p>Year Built: {house.size}</p>
                        <p>Has Garden: {house.hasGarden ? "Yes": "No"}</p>
                        <p>Property Type: {house.PropertyType}</p>
                        <p>Available: {house.isAvailable ? "Yes": "No" }</p>
                        <img src={`http://localhost:5000/House_Images/${house.image }`} alt="" />
                        
                        {house.video.length !== 0 ? (
                           <video controls>
                               <source src={`http://localhost:5000/House_Images/${house.video}`}/>
                           </video>
                        ): (
                            <p>No video uploaded</p>
                        )}

                    </div>
        </div>
    )
}

export default HouseListComponentWithId;
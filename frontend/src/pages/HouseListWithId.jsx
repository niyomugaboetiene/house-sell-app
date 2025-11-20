import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HouseListComponentWithId = () => {
    const { _id } = useParams();
    const [house, setHouse] = useState(null);
    const [watchVideo, setWatchVideo] = useState(false);
    

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
        <div className="h-screen ">
            <h1 className="text-bold text-2xl  mt-5 font-medium text-blue-500">House Details</h1>
            <div className="ms-5 p-4 flex flex-1">
          <div className="p-4">
                 <img src={`http://localhost:5000/House_Images/${house.image }`} 
                   className="w-[740px] object-cover h-[850px] rounded-xl shadow-2xl"
                 />

           </div>
           <div className="ms-3 p-4">
                       <p className="text-2xl">Title: {house.title}</p>
                        <p className="text-xl">{house.description}</p>
            <div>
                        <p className="text-2xl">
                        {house.location && (
                            <>
                                 <p className="">Location:</p>
                                 <p>Country: {house.location.country}</p>
                                 City: {house.location.city}
                                 District: {house.location.district}
                                 Sector: {house.location.sector}
                                 Street: {house.location.street}
                            </>

                        )}
                        </p>
            </div>
                        <p className="text-2xl">${house.price}</p>


                        <p className="text-2xl">Bathrooms: {house.bathrooms}</p>
                        <p className="text-2xl">Bedrooms: {house.bedrooms}</p>
                        <p className="text-2xl">Size: {house.size}</p>
                        <p className="text-2xl">Year Built: {house.yearBuilt}</p>
                        <p className="text-2xl">Has Garden: {house.hasGarden ? "Yes": "No"}</p>
                        <p className="text-2xl">Property Type: {house.PropertyType}</p>
                        <p className="text-2xl"> Available: {house.isAvailable ? "Yes": "No" }</p>
                        <button onClick={() => setWatchVideo(true)} className="mt-3 bg-red-500 px-6 py-3 text-white rounded-xl hover:bg-red-400 transition duration-100 hover:scale-105">Watch Video</button>
           </div>
                       </div>

                        {watchVideo && (
                            <>
                              {house.video.length !== 0 ? (
                                 <video controls>
                                     <source src={`http://localhost:5000/House_Images/${house.video}`}/>
                                </video>
                              ): (
                                 <p>No video uploaded</p>
                             )}
                            </>

                        )}


        </div>
    )
}

export default HouseListComponentWithId;
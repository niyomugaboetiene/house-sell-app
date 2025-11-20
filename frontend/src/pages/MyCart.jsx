import axios from "axios";
import React, { useState, useEffect}  from "react";

const MyCart = () => {
    const [myCart, setMyCart] = useState([]);
    
     const GetMyCart = async() => {
            try {
               const res = await axios.get('http://localhost:5000/house/myCart', { withCredentials: true });
               setMyCart(res.data.my_cart);
            } catch(error) {
                console.error(error.message);
            }
        }

    useEffect(() => {
       GetMyCart();
    }, [])

    return (
        <div>
            <div>
                {myCart.map((house, idx) => (
                   <ul key={idx}>
                      <li>{house.title}</li>
                  </ul>
                ))}

            </div>
        </div>
    )
}
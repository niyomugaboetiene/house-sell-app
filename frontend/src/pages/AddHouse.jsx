import { use, useState } from "react";
import axios from "axios";

const HouseComponent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescripton] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState({});
    const [city, setCity] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [size, setSize]  = useState("");
    const [yearBuilt, setYearBuilt] = useState("");
    const [parkingSpace, setParkingSpace] = useState("");
    const [PropertyType, setPropertyType] = useState("")
    const [isAvailable, setIsAvailable] = useState(true)
    const [image, setImage] = useState("");

    const AddHouse = async() => {
        axios.post('http://localhost:5000/house/add', {
            title, description, price, location, city, bathrooms, size, yearBuilt, parkingSpace, PropertyType, isAvailable, image
        }, { withCredentials: true });
    }
}
import { useState } from "react";
import axios from "axios";

const RegisterComponent = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFull_name] = useState("");
    const [role, setRole] = useState("customer");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const Register = async() => {
    
        if (!full_name || !user_name || !password || !role) {
            alert("Please fill out all fields");
            return;
       } 

        try {
             await axios.post('http://localhost:5000/user/register', {
                full_name, user_name, password, role
             }, { withCredentials: true });
             setSuccess("Loggin successfully");
             setError("");
        } catch (error) {
            console.error(error);
            setError("Error during login");
            setSuccess("");

        }
    }

    return (
        <div>
            <div>
                <label>Full name</label>
                <input type="text" onChange={(e) => setFull_name(e.target.value)} /> <br />

                <label>User name</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} /> <br />
              
               <label>role</label>
                <select onChange={(e) => setRole(e.target.value)}>
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                </select> <br />

                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} /> <br />

                <button onClick={Register}>Register</button>

                {error && (
                    <p>{error}</p>
                )}

                {success && (
                    <p>{success}</p>
                )}
            </div>
        </div>
    )
}

export default RegisterComponent
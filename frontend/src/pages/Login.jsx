import { useState } from "react";
import axios from "axios";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const Login = async() => {
        try {
             await axios.post('http://localhost:5000/user/login', {
                username, password
             }, { withCredentials: true });
             setSuccess("Loggin successfully");
        } catch (error) {
            console.error(error);
            setError("Error during login");

        }
    }

    return (
        <div>
            <div>
                <label>User name</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} />

                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />

                <button onClick={Login}>Login</button>
            </div>
        </div>
    )
}

export default LoginComponent
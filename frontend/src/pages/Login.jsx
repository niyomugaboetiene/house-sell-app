import { useState } from "react";
import axios from "axios";

const LoginComponent = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const Login = async() => {
        try {
             await axios.post('http://localhost:5000/user/login', {
                user_name, password
             }, { withCredentials: true });
             setSuccess("Loggin successfully");
        } catch (error) {
            console.error(error);
            setError("Error during login");

        }
    }

    return (
        <div className="mt-15">
            <div>
                <label>User name</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} /> <br />

                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} /> <br />

                <button onClick={Login}>Login</button>

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

export default LoginComponent
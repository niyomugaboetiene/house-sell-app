import { useState } from "react";
import axios from "axios";

const LoginComponent = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const Login = async() => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");
            
            await axios.post('http://localhost:5000/user/login', {
                user_name, password
            }, { withCredentials: true });
            
            setSuccess("Logged in successfully");
        } catch (error) {
            console.error(error);
            setError("Error during login");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                        type="text" 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your password"
                    />
                </div>

                <button 
                    onClick={Login} 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {success && (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
                        {success}
                    </div>
                )}
                
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoginComponent;
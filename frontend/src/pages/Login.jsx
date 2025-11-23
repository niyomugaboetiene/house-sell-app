import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const Login = async() => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");
            
            await axios.post('http://localhost:5000/user/login', {
                user_name, password
            }, { withCredentials: true });
            
            setSuccess("Logged in successfully");
            setTimeout(() => {
                setSuccess("");
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.error || "Failed login";
            setError(errorMessage);
            setTimeout(() => {
                setError("");
            }, 2000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
                {success && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 font-bold text-white px-6 py-3 rounded-lg shadow-lg z-50">
                   <p className="text-white font-medium">{success}</p>
                </div>
                )}     
                {error && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-500 font-bold text-white px-6 py-3 rounded-lg shadow-lg z-50">
                   <p className="text-white font-medium">{error}</p>
                </div>
                )}
            <h1 className="text-2xl font-bold text-amber-500 mb-6 text-center">Login</h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                        type="text" 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your password"
                    />
                </div>

                <button 
                    onClick={Login} 
                    disabled={loading}
                    className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    )
}

export default LoginComponent;
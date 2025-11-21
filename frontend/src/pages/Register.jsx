import { useState } from "react";
import axios from "axios";

const RegisterComponent = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFull_name] = useState("");
    const [role, setRole] = useState("customer");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const Register = async() => {
        if (!full_name || !user_name || !password || !role) {
            alert("Please fill out all fields");
            return;
        } 

        try {
            setLoading(true);
            setError("");
            setSuccess("");
            
            await axios.post('http://localhost:5000/user/register', {
                full_name, user_name, password, role
            }, { withCredentials: true });
            
            setSuccess("Account created successfully");
            setError("");
        } catch (error) {
            console.error(error);
            setError("Error during registration");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-14 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h1>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                        type="text" 
                        onChange={(e) => setFull_name(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                        type="text" 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Choose a username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select 
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                        {/* <option value="admin">Admin</option> */}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Create a password"
                    />
                </div>

                <button 
                    onClick={Register} 
                    disabled={loading}
                    className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Creating Account..." : "Register"}
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

export default RegisterComponent;
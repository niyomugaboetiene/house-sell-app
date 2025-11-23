import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFull_name] = useState("");
    const [role, setRole] = useState("customer");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const Register = async() => {
        if (!full_name || !user_name || !password || !role) {
            setError("Please fill out all fields");
            setError(() => {
                setError("");
            }, 2000);
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
            setTimeout(() => {
                setSuccess("");
                navigate("/login");
            }, 2000);

            setError("");
        } catch (error) {
            console.error(error);
            const errorMessage = err.response?.data?.error || "Failed login";
            setError(errorMessage);
            setTimeout(() => {
                setError("");
            }, 2000);
            setSuccess("");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border border-amber-500">
              {success && (
                <div className="fixed top-27 left-1/2 transform -translate-x-1/2 bg-green-500 font-bold text-white px-6 py-3 rounded-lg shadow-lg z-50">
                   <p className="text-white font-medium">{success}</p>
                </div>
                )}     
                {error && (
                <div className="fixed top-27 left-1/2 transform -translate-x-1/2 bg-red-500 font-bold text-white px-6 py-3 rounded-lg shadow-lg z-50">
                   <p className="text-white font-medium">{error}</p>
                </div>
                )}
            <h1 className="text-2xl font-bold text-amber-500 mb-6 text-center">Create Account</h1>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-amber-500 mb-1">Full Name</label>
                    <input 
                        type="text" 
                        onChange={(e) => setFull_name(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-amber-500 mb-1">Username</label>
                    <input 
                        type="text" 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Choose a username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-amber-500 mb-1">Role</label>
                    <select 
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                        <option value="" disabled>Choose account type</option>
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                        {/* <option value="admin">Admin</option> */}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-amber-500 mb-1">Password</label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Create a password"
                    />
                </div>

             <div className="flex justify-between">
                <button 
                    onClick={Register} 
                    disabled={loading}
                    className="w-1/2 bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>
                <button onClick={() => navigate('/login')} className="text-amber-500 rounded-lg border-2 hover:text-white w-1/2 border-amber-500 ms-13 px-3 py-1 hover:bg-amber-500 transition-colors">Login</button>
            </div>
          </div>
        </div>
    )
}

export default RegisterComponent;
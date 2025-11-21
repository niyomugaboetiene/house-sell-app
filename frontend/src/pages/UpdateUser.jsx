import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateUserComponent = () => {
    const [full_name, setFull_name] = useState("");
    const [user_name, setUser_name] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const { _id } = useParams();

    const FetchUserInfo = async() => {
        try {
            const res = await axios.get(
                `http://localhost:5000/user/userInfo}`,
                { withCredentials: true }
            );

            const UserData = res.data.user || res.data.user || res.data;
            setUserInfo(UserData);
            
            if (UserData) {
                setFull_name(UserData.full_name || "");
                setUser_name(UserData.user_name || "");
                setPassword(UserData.password || "");
                setRole(UserData.role || "");
                setImage(UserData.image || null);
            }

            console.log('Data received', UserData);
        } catch (error) {
            console.error("Error fetching property:", error);
            setError("Failed to load property data");
        }
    }

    useEffect(() => {
        FetchUserInfo();
    }, []);

    const UpdateUser = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");
            
            const formData = new FormData();

            formData.append("full_name", full_name);
            formData.append("user_name", user_name);
            formData.append("password", password);
            formData.append("role", role);
            formData.append("image", image);

            if (image) {
                formData.append("image", image); 
            }

            const response = await axios.put(`http://localhost:5000/user/updateProfile`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Update response:', response.data);

            setSuccess("User updated successfully");
            
        } catch (err) {
            console.error("Update Error:", err.response?.data || err.message);
            const errorMessage = err.response?.data?.error || "Failed to update user";
            setError(errorMessage);
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
                        value={full_name}
                        onChange={(e) => setFull_name(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                        type="text" 
                        value={user_name}
                        onChange={(e) => setUser_name(e.target.value)} 
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
                
                <div>
                    <label htmlFor="">Choose your profile image (Optional)</label>
                    <input type="file"  onChange={(e) => setImage(e.target.files[0])} />
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
    );
}

export default UpdateUserComponent;
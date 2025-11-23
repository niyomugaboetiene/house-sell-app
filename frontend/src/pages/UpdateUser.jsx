import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateUserComponent = () => {
    const [full_name, setFull_name] = useState("");
    const [user_name, setUser_name] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const FetchUserInfo = async() => {
        try {
            const res = await axios.get(
                `http://localhost:5000/user/userInfo`,
                { withCredentials: true }
            );

            const UserData = res.data.user || res.data.user || res.data;
            setUserInfo(UserData);
            
            if (UserData) {
                setFull_name(UserData.full_name || "");
                setUser_name(UserData.user_name || "");
                setRole(UserData.role || "");
                setImage(null);
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
            formData.append("newPassword", newPassword);
            formData.append("oldPassword", oldPassword);
            formData.append("role", role);
            if (image) {
                formData.append("image", image); 
            }

             await axios.put(`http://localhost:5000/user/updateProfile`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess("User updated successfully");
            setTimeout(() => {
                setSuccess("");
                navigate('/');
            }, 2000);
            
        } catch (err) {
            console.error("Update Error:", err.response?.data || err.message);
            const errorMessage = err.response?.data?.error || "Failed to update user";
            if (err.response?.status === 403) {
                setError(errorMessage);
                setTimeout(() => {
                  setError("");
                  navigate('/login');
                }, 2000);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
       <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border-2 border-amber-500">
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
            <h1 className="text-2xl font-bold text-amber-500 mb-6 text-center">Update Your Account</h1>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-amber-500 mb-1">Full Name</label>
                    <input 
                        type="text" 
                        value={full_name}
                        onChange={(e) => setFull_name(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-amber-500 mb-1">Username</label>
                    <input 
                        type="text" 
                        value={user_name}
                        onChange={(e) => setUser_name(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Choose a username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-amber-500 mb-1">Role</label>
                    <select 
                         value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-amber-500 mb-1">New Password (Optional)</label>
                    <input 
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Create a password"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-amber-500 mb-1">Type old Password to apply changes</label>
                    <input 
                        type="password"
                        onChange={(e) => setOldPassword(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Create a password"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-amber-500 mb-1">Choose your profile image (Optional)</label>
                    <input type="file"  onChange={(e) => setImage(e.target.files[0])} accept="image/*" 
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
        <div className="flex justify-between">
                <button 
                    onClick={UpdateUser} 
                    disabled={loading}
                    className="w-1/2 bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Updaing Account..." : "Update"}
                </button>
                <button onClick={() => navigate(-1)} className="text-amber-500 rounded-lg border-2 hover:text-white w-1/2 border-amber-500 ms-13 px-3 py-1 hover:bg-amber-500 transition-colors">&larr; Back</button>
            </div>
         </div>
        </div>
    );
}

export default UpdateUserComponent;
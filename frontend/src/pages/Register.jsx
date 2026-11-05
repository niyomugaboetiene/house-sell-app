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
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const Register = async () => {
        if (!full_name || !user_name || !password || !role) {
            setError("Please fill out all fields");

            setTimeout(() => {
                setError("");
            }, 2000);

            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await axios.post(
                `${BACKEND_URL}/user/register`,
                {
                    full_name,
                    user_name,
                    password,
                    role
                },
                { withCredentials: true }
            );

            setSuccess("Account created successfully");

            setTimeout(() => {
                setSuccess("");
                navigate("/login");
            }, 2000);

            setError("");
        } catch (error) {
            console.error(error);

            const errorMessage = error.response?.data?.error || "Registration failed";
            setError(errorMessage);

            setTimeout(() => {
                setError("");
            }, 2000);

            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 sm:px-6">

            {success && (
                <div className="fixed top-24 sm:top-28 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-green-500 font-bold text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    <p className="text-white font-medium">{success}</p>
                </div>
            )}

            {error && (
                <div className="fixed top-24 sm:top-28 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-red-500 font-bold text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    <p className="text-white font-medium">{error}</p>
                </div>
            )}

            <div className="w-full max-w-md p-5 sm:p-6 md:p-8 bg-white rounded-xl shadow-md border border-amber-500">

                <h1 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-6 text-center">
                    Create Account
                </h1>

                <div className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-amber-500 mb-1">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={full_name}
                            onChange={(e) => setFull_name(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-500 mb-1">
                            Username
                        </label>

                        <input
                            type="text"
                            value={user_name}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="Choose a username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-500 mb-1">
                            Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                        >
                            <option value="" disabled>
                                Choose account type
                            </option>

                            <option value="customer">Customer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-500 mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">

                        <button
                            onClick={Register}
                            disabled={loading}
                            className="w-full sm:w-1/2 bg-amber-500 text-white py-2.5 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="w-full sm:w-1/2 text-amber-500 rounded-lg border-2 border-amber-500 px-3 py-2 hover:text-white hover:bg-amber-500 transition-colors"
                        >
                            Login
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
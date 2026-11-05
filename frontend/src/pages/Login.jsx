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
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const Login = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await axios.post(`${BACKEND_URL}/user/login`, {
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
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 sm:px-6">
            {success && (
                <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-green-500 font-bold text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    <p className="text-white font-medium">{success}</p>
                </div>
            )}

            {error && (
                <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-red-500 font-bold text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center">
                    <p className="text-white font-medium">{error}</p>
                </div>
            )}

            <div className="w-full max-w-md p-5 sm:p-6 md:p-8 bg-white rounded-xl shadow-md border-2 border-amber-500">
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-6 text-center">
                    Login
                </h1>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-amber-500 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            value={user_name}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base font-medium text-amber-500 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        onClick={Login}
                        disabled={loading}
                        className="w-full bg-amber-500 text-white py-3 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="text-right">
                        <button className="text-sky-500 hover:underline text-sm sm:text-base">
                            Forgot password
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600 text-sm sm:text-base">
                            Don't you have account?
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                        <button
                            onClick={() => navigate('/register')}
                            className="w-full sm:w-1/2 py-2 text-sky-500 hover:underline border border-gray-200 rounded-md sm:border-0"
                        >
                            Register
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full sm:w-1/2 text-amber-500 rounded-lg border-2 border-amber-500 px-3 py-2 hover:bg-amber-500 hover:text-white transition-colors"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
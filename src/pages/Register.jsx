import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


export default function Register() {
    // states ...
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation + axios logic same as before
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
            {/* Card container */}
            <div className="w-full max-w-md md:max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
                {/* Title */}
                <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    Create Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {formError && (
                        <div className="text-red-400 text-center font-medium border border-red-400/50 rounded-lg p-3 bg-red-500/10">
                            {formError}
                        </div>
                    )}

                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                        />
                        {usernameError && <p className="text-red-400 text-xs mt-1">{usernameError}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                        />
                        {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                        />
                        {passwordError && <p className="text-red-400 text-xs mt-1">{passwordError}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                        />
                        {confirmPasswordError && (
                            <p className="text-red-400 text-xs mt-1">{confirmPasswordError}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-red-700 hover:to-pink-700 transform hover:scale-[1.02] transition"
                    >
                        Register
                    </button>
                </form>

                {/* Sign in link */}
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-red-400 font-medium hover:underline">
                        Sign in here
                    </Link>
                </p>
            </div>

            {/* Success modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Registration Successful!</h2>
                        <p className="text-gray-700 mb-6">You can now log in with your credentials.</p>
                        <button
                            onClick={() => navigate('/signin')}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Go to Sign In
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function SignIn() {
    // Form states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // Validation and form error states
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const navigate = useNavigate()
    const { fetchUser } = useAuth();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const redirectPath = params.get('redirect') || '/'
    // Regex patterns for email and strong password
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Validates input fields before making request
    const validateLogin = () => {
        let isValid = true;
        setEmailError("");
        setPasswordError("");

        if (!email.trim()) {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            setEmailError("Invalid email format.");
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError("Password is required.");
            isValid = false;
        } else if (!passwordPattern.test(password)) {
            setPasswordError("Password must be 8+ characters with capital, number, and special char.");
            isValid = false;
        }

        return isValid;
    };
    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateLogin()) {
            try {
                const res = await axios.post("http://localhost:3000/user/signin", {
                    email,
                    password
                }, { withCredentials: true });
                await fetchUser();// Refresh user context after login
                navigate(redirectPath);// Redirect to intended path or homepage

            } catch (error) {
                if (error.response) {
                    setFormError(error.response.data.error || "Login failed");
                } else {
                    console.log(error)
                    setFormError("Something went wrong. Please try again later.");
                }
            }
        }

    };
    return (
  <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-50 via-white to-red-100">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-red-600">
        Sign In
      </h2>

      {/* Server-side or fallback error message */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {formError && (
          <div className="text-red-700 font-medium text-center border border-red-300 rounded-md p-3 bg-red-50 shadow-sm">
            {formError}
          </div>
        )}

        {/* Email input */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        {/* Password input */}
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition"
        >
          Sign In
        </button>
      </form>

      {/* Register link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-red-600 font-medium hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  </div>
);
}
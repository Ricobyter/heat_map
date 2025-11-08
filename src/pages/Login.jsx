import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FaGlobe, FaExclamationCircle, FaSpinner } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // blueirect if already authenticated
  // ✅ Use useEffect for navigation instead of during render
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/simulator");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // ADD DEBUGGING HERE
      console.log("=== LOGIN RESPONSE DEBUG ===");
      console.log("Response status:", response.status);
      console.log("Response data:", data);
      console.log("User data:", data.data?.user);
      console.log("User role:", data.data?.user?.role);
      console.log("============================");

      if (data.success) {
        // Store user data in context first
        login(data.data.user, data.token);

        // Add a small delay to ensure context is updated
        setTimeout(() => {
          if (data.data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/simulator");
          }
        }, 100);
      } else {
        setErrors({ submit: data.message || "Login failed" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        submit: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[125vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="auth-container max-w-md w-full">
        <div className="auth-card bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="auth-header text-center mb-8">
            <h1 className="auth-title text-3xl font-semibold text-gray-800 mb-2">
              Sign In
            </h1>
            <div className="flex flex-col ">
              <div className="text-lg font-semibold">
                <span className="text-[#004275]">MODEL </span>
                <span className="text-red-600">HEAT</span>
                <span className=" text-[#004275] ml-1">
                  ACTION PLAN FOR
                </span>
                <span className=" text-green-700 ml-1">PATNA</span>
              </div>
            </div>
            <p className="auth-subtitle text-gray-600 ">
              Access your account securely
            </p>
          </div>

          {/* Error Alert */}
          {errors.submit && (
            <div className="alert alert-error bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
              <div className="flex">
                <FaExclamationCircle className="w-5 h-5 text-blue-400 mr-2" />
                {errors.submit}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form space-y-6">
            <div className="form-group">
              <label
                htmlFor="email"
                className="form-label block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                requiblue
                value={formData.email}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700"
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="password"
                className="form-label block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                requiblue
                value={formData.password}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer btn btn-primary w-full bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="auth-link font-semibold text-blue-600 hover:text-blue-800 transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

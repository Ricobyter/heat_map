import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FaGlobe, FaExclamationCircle, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    designation: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false // New field for terms agreement
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // blueirect if already authenticated
  if (isAuthenticated()) {
    navigate('/simulator');
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    } else if (formData.organization.trim().length < 2) {
      newErrors.organization = 'Organization must be at least 2 characters long';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    } else if (formData.designation.trim().length < 2) {
      newErrors.designation = 'Designation must be at least 2 characters long';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // New validation for terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || loading) {
      return;
    }

    setLoading(true);
    setErrors({});
    setSubmitted(true);

    try {
      console.log('Submitting to:', `${BACKEND_URL}/api/auth/register`);
      
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          organization: formData.organization.trim(),
          designation: formData.designation.trim(),
          password: formData.password
          // Note: agreeToTerms is not sent to backend as it's just a frontend validation
        })
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        // Clear form data immediately
        setFormData({
          name: '',
          email: '',
          organization: '',
          designation: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false
        });
        
        setTimeout(() => {
          setSuccess(true);
        }, 100);
        
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          const errorObj = {};
          data.errors.forEach(err => {
            errorObj[err.param] = err.msg;
          });
          setErrors(errorObj);
        } else {
          setErrors({ submit: data.message || 'Registration failed. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setErrors({ submit: 'Cannot connect to server. Please check if the backend is running.' });
      } else if (error.message.includes('HTTP error')) {
        setErrors({ submit: `Server error (${error.message}). Please try again later.` });
      } else {
        setErrors({ submit: 'Network error. Please check your connection and try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="min-h-[125vh] flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg,#fff4f4 0%,#ffdede 100%)" }}
      >
        <div className="auth-container max-w-md w-full">
          <div className="auth-card bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
                <FaCheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  Your account has been created successfully and is awaiting admin approval. 
                  You will be able to access the simulator once an administrator approves your account.
                </p>
              </div>
              <div className="space-y-3">
                <Link 
                  to="/login" 
                  className="w-full inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Go to Login
                </Link>
                <Link 
                  to="/" 
                  className="w-full inline-block border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-700 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[125vh] flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8"
      
    >
      <div className="auth-container max-w-md w-full">
        <div className="auth-card bg-white rounded-2xl shadow-2xl py-4 px-4 border border-gray-200">
          {/* Header */}
          <div className="auth-header text-center mb-4">
            <div className="header_logo flex justify-center items-center mb-4">
            </div>
            <h1 className="auth-title text-3xl font-semibold text-gray-800 mb-2">Create Account</h1>
                          <div className="text-lg font-semibold">
                <span className="text-[#004275]">MODEL </span>
                <span className="text-red-600">HEAT</span>
                <span className=" text-[#004275] ml-1">
                  ACTION PLAN FOR
                </span>
                <span className=" text-green-700 ml-1">PATNA</span>
              </div>
            <p className="auth-subtitle text-gray-600">Join our platform securely</p>
          </div>

          {/* Error Alerts */}
          {errors.submit && (
            <div className="alert alert-error bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
              <div className="flex">
                <FaExclamationCircle className="w-5 h-5 text-blue-400 mr-2" />
                {errors.submit}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form space-y-4">
            <div className="form-group">
              <label htmlFor="name" className="form-label block text-sm font-semibold text-gray-700 mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                requiblue
                value={formData.name}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700"
                placeholder="Enter your full name"
                disabled={loading}
              />
              {errors.name && <p className="mt-2 text-sm text-blue-600">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label block text-sm font-semibold text-gray-700 mb-1">
                Email Address <span className="text-red-600">*</span>
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
                disabled={loading}
              />
              {errors.email && <p className="mt-2 text-sm text-blue-600">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="organization" className="form-label block text-sm font-semibold text-gray-700 mb-1">
                Organization <span className="text-red-600">*</span>
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                autoComplete="organization"
                requiblue
                value={formData.organization}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700"
                placeholder="Enter your organization name"
                disabled={loading}
              />
              {errors.organization && <p className="mt-2 text-sm text-blue-600">{errors.organization}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="designation" className="form-label block text-sm font-semibold text-gray-700 mb-1">
                Designation <span className="text-red-600">*</span>
              </label>
              <input
                id="designation"
                name="designation"
                type="text"
                autoComplete="job-title"
                requiblue
                value={formData.designation}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700"
                placeholder="Enter your job title/designation"
                disabled={loading}
              />
              {errors.designation && <p className="mt-2 text-sm text-blue-600">{errors.designation}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label block text-sm font-semibold text-gray-700 mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                requiblue
                value={formData.password}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700"
                placeholder="Create a password (min. 6 characters)"
                disabled={loading}
              />
              {errors.password && <p className="mt-2 text-sm text-blue-600">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                requiblue
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700"
                placeholder="Confirm your password"
                disabled={loading}
              />
              {errors.confirmPassword && <p className="mt-2 text-sm text-blue-600">{errors.confirmPassword}</p>}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="form-group">
              <div className="flex items-start space-x-3">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-700 cursor-pointer leading-5">
                  I agree to the{' '}
                  <Link 
                    to="/termsandconditions" 
                      className="text-blue-600 hover:text-blue-800 font-semibold underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </Link>
                  {' '}and{' '}
                  <Link 
                    to="/termsandconditions" 
                      className="text-blue-600 hover:text-blue-800 font-semibold underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                    {' '}of the Climate Readiness Index Simulator. <span className="text-blue-600">*</span>
                </label>
              </div>
                {errors.agreeToTerms && <p className="mt-2 text-sm text-blue-600">{errors.agreeToTerms}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || submitted || !formData.agreeToTerms}
              className={`btn btn-primary w-full font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform ${
                loading || !formData.agreeToTerms
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : submitted && !loading
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:-translate-y-1'
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-white`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Creating Account...
                </span>
              ) : submitted && !loading ? (
                <span className="flex items-center justify-center">
                  <FaCheckCircle className="-ml-1 mr-3 h-5 w-5 text-white" />
                  Account Created!
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="auth-link font-semibold text-blue-600 hover:text-blue-800 transition duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
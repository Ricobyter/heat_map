import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaGlobe,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaExclamationCircle,
  FaSignOutAlt,
  FaUserFriends,
  FaInbox,
  FaUserCheck,
  FaTimes,
  FaHome  
} from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingUsers: 0,
    approvedUsers: 0,
    rejectedUsers: 0,
  });
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState({});

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    user: null,
    action: "",
    userId: "",
  });

  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "https://your-backend-domain.com";

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    if (user && user.role === "admin") {
      loadDashboardData();
    }
  }, [user, token]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadStats(), loadPendingUsers(), loadAllUsers()]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setError("Failed to load dashboard data");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } else if (response.status === 401) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const loadPendingUsers = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/pending-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPendingUsers(data.data);
        }
      } else if (response.status === 401) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error loading pending users:", error);
    }
  };

  const loadAllUsers = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAllUsers(data.data);
        }
      } else if (response.status === 401) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error loading all users:", error);
    }
  };

  // Show confirmation modal
  const showConfirmationModal = (userId, action, userData) => {
    setModalData({
      user: userData,
      action: action,
      userId: userId,
    });
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setModalData({
      user: null,
      action: "",
      userId: "",
    });
  };

  // Confirm action
  const confirmAction = async () => {
    const { userId, action } = modalData;
    setShowModal(false);

    setActionLoading((prev) => ({ ...prev, [userId]: action }));

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/${action}-user/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Refresh data after successful action
        await loadDashboardData();

        // Show success toast notification
        if (action === "approve") {
          toast.success(`✅ User ${modalData.user?.name || 'User'} approved successfully!`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.success(`❌ User ${modalData.user?.name || 'User'} rejected successfully!`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        toast.error(data.message || `Failed to ${action} user`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Network error. Failed to ${action} user.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: null }));
      closeModal();
    }
  };

  const handleUserAction = (userId, action) => {
    const userData = pendingUsers.find((u) => u._id === userId);
    showConfirmationModal(userId, action, userData);
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1";
    switch (status) {
      case "pending":
        return (
          <span
            className={`${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-300`}
          >
            <FaClock className="w-3 h-3" />
            <span>PENDING</span>
          </span>
        );
      case "approved":
        return (
          <span
            className={`${baseClasses} bg-green-100 text-green-800 border border-green-300`}
          >
            <FaCheckCircle className="w-3 h-3" />
            <span>APPROVED</span>
          </span>
        );
      case "rejected":
        return (
          <span
            className={`${baseClasses} bg-red-100 text-red-800 border border-red-300`}
          >
            <FaTimesCircle className="w-3 h-3" />
            <span>REJECTED</span>
          </span>
        );
      default:
        return (
          <span
            className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-300`}
          >
            <span>{status.toUpperCase()}</span>
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        
      >
        <div className="text-center">
          <FaSpinner className="animate-spin h-16 w-16 text-white mx-auto mb-4" />
          <p className="text-white text-lg font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      
    >
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div
              className={`px-6 py-4 rounded-t-2xl ${
                modalData.action === "approve"
                  ? "bg-white"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center">
                  {modalData.action === "approve" ? (
                    <>
                      <FaCheckCircle className="mr-2" />
                      Approve User
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="mr-2" />
                      Reject User
                    </>
                  )}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200 transition-colors duration-200"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="text-center mb-6">
                {modalData.action === "approve" ? (
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaTimesCircle className="w-8 h-8 text-red-600" />
                  </div>
                )}

                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Are you sure you want to {modalData.action} this user?
                </h4>

                {modalData.user && (
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {modalData.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {modalData.user.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {modalData.user.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          Registered: {formatDate(modalData.user.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-gray-600 mt-4">
                  {modalData.action === "approve"
                    ? "This user will gain access to the Climate Readiness Index Simulator and receive an approval email."
                    : "This user will be denied access and receive a rejection email. They can reapply later if needed."}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold text-white transition duration-200 ${
                    modalData.action === "approve"
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  }`}
                >
                  {modalData.action === "approve" ? "Approve User" : "Reject User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white bg-opacity-95 backdrop-blur-sm shadow-xl">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Link to="/" title="Go to Home">
                  <FaHome className="text-gray-700 hover:text-red-600 transition-colors duration-200 cursor-pointer" size={24} />
                </Link>
                <h1 className="text-xl md:text-3xl font-bold text-red-700">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-gray-600 font-semibold hidden md:block">
                Model Heat Action Plan For Patna 
              </p>
            </div>
            <div className="flex items-center space-x-4 ">
              <div className="text-right">
                <p className="text-sm text-gray-600 hidden md:block">
                  Welcome back,
                </p>
                <p className="text-lg font-semibold text-gray-800 hidden md:block">
                  {user.name}
                </p>
              </div>

              <div>
                <Link to="/analytics">
                  <button className="py-2 px-3 rounded-md cursor-pointer font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm md:text-lg ">
                    Analytics
                  </button>
                </Link>
              </div>
              <button
                onClick={logout}
                className="bg-gradient-to-r  from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-sm md:text-lg cursor-pointer text-white px-3 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-md">
            <div className="flex">
              <FaExclamationCircle className="w-5 h-5 text-red-400 mr-2" />
              {error}
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition duration-300">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaUsers className="w-7 h-7 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-semibold text-gray-600">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.totalUsers - 1}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition duration-300">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaClock className="w-7 h-7 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-semibold text-gray-600">
                  Pending Approvals
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.pendingUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition duration-300">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaCheckCircle className="w-7 h-7 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-semibold text-gray-600">
                  Approved Users
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.approvedUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition duration-300">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaTimesCircle className="w-7 h-7 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-semibold text-gray-600">
                  Rejected Users
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.rejectedUsers}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Users Section */}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaClock className="w-6 h-6 text-yellow-600 mr-2" />
              Pending User Approvals
            </h2>
          </div>
          <div className="overflow-x-auto">
            {pendingUsers.length === 0 ? (
              <div className="text-center py-12">
                <FaInbox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No pending user approvals
                </p>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Registration Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingUsers.map((pendingUser) => (
                    <tr
                      key={pendingUser._id}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {pendingUser.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">{pendingUser.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">
                          {formatDate(pendingUser.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button
                            onClick={() =>
                              handleUserAction(pendingUser._id, "approve")
                            }
                            disabled={actionLoading[pendingUser._id]}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
                          >
                            {actionLoading[pendingUser._id] === "approve" ? (
                              <>
                                <FaSpinner className="animate-spin w-4 h-4" />
                                <span>Approving...</span>
                              </>
                            ) : (
                              <>
                                <FaCheckCircle className="w-4 h-4" />
                                <span>Approve</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() =>
                              handleUserAction(pendingUser._id, "reject")
                            }
                            disabled={actionLoading[pendingUser._id]}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
                          >
                            {actionLoading[pendingUser._id] === "reject" ? (
                              <>
                                <FaSpinner className="animate-spin w-4 h-4" />
                                <span>Rejecting...</span>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="w-4 h-4" />
                                <span>Reject</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* All Users Section */}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaUserFriends className="w-6 h-6 text-red-600 mr-2" />
              All Users
            </h2>
          </div>
          <div className="overflow-x-auto">
            {allUsers.length === 0 ? (
              <div className="text-center py-12">
                <FaUserCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No users found</p>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Registration Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Approved Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allUsers.map((userData) => (
                    <tr
                      key={userData._id}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {userData.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">{userData.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(userData.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">
                          {formatDate(userData.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">
                          {userData.approvedAt
                            ? formatDate(userData.approvedAt)
                            : "-"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


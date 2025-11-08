import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Simulator = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div className="p-8">Checking authentication...</div>;

  if (!isAuthenticated()) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-semibold">Simulator (Protected)</h2>
        <p className="mt-2 text-gray-700">You must have an approved account to access the simulator.</p>
        <p className="mt-4">Current user: {user ? `${user.email} (${user.status})` : 'Not logged in'}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold">Simulator</h2>
      <p className="mt-2 text-gray-700">Welcome, {user?.name || user?.email} — your account is approved.</p>
      <p className="mt-4">(This is a placeholder simulator page. Replace with the real simulator component.)</p>
    </div>
  );
};

export default Simulator;

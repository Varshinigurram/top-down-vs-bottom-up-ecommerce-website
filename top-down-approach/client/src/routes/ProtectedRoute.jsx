import React from 'react';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children, requiredRole, fallbackView = 'login', onNavigate }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner">Verifying session security...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="alert-banner error">
        Authentication required. Please <button className="btn-link" onClick={() => onNavigate(fallbackView)}>Log in</button> to access this feature.
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="alert-banner error">
        Access denied: Administrator privileges required. Current role: {user.role}
      </div>
    );
  }

  return children;
}

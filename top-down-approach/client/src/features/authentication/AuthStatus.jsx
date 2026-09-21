import React from 'react';
import { useAuth } from '../../context/AuthContext';

export function AuthStatus({ onNavigate }) {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="auth-nav-group">
        <button className="nav-link-btn" onClick={() => onNavigate('login')}>
          Login
        </button>
        <button className="nav-link-btn btn-highlight" onClick={() => onNavigate('register')}>
          Register
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile-badge">
      <span className="user-name">👤 {user.name}</span>
      <span className="user-role-badge">{user.role}</span>
      <button className="btn-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

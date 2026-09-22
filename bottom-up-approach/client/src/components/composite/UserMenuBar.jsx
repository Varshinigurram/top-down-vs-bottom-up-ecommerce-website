import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../primitives/Button';

export function UserMenuBar({ onNavigate }) {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="user-menu-bar">
        <Button variant="secondary" size="sm" onClick={() => onNavigate && onNavigate('login')}>
          Login
        </Button>
        <Button variant="primary" size="sm" onClick={() => onNavigate && onNavigate('register')}>
          Register
        </Button>
      </div>
    );
  }

  return (
    <div className="user-profile-badge">
      <span className="user-name-label">👤 {user.name}</span>
      <span className="user-role-badge">{user.role}</span>
      <Button variant="outline" size="sm" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

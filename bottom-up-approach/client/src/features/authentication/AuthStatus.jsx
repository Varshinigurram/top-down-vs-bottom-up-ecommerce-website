import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/primitives/Button';
import { Badge } from '../../components/primitives/Badge';

export function AuthStatus() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="auth-status-bar unauthenticated">
        <span>You are currently browsing as a guest.</span>
      </div>
    );
  }

  return (
    <div className="auth-status-bar authenticated">
      <div className="auth-status-info">
        <span className="user-icon">👤</span>
        <span className="user-name"><strong>{user.name}</strong> ({user.email})</span>
        <Badge variant={user.role === 'ADMIN' ? 'emerald' : 'blue'}>
          {user.role}
        </Badge>
      </div>
      <Button variant="outline" size="sm" onClick={logout}>
        Sign Out
      </Button>
    </div>
  );
}

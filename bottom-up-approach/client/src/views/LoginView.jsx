import React from 'react';
import { LoginForm } from '../features/authentication/LoginForm';

export function LoginView({ onNavigate }) {
  const handleSuccess = () => {
    if (onNavigate) {
      onNavigate('catalog');
    }
  };

  const handleSwitchToRegister = () => {
    if (onNavigate) {
      onNavigate('register');
    }
  };

  return (
    <div className="view-container auth-view">
      <div className="auth-card">
        <LoginForm
          onSuccess={handleSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
        <div className="arch-note-subtle">
          <small>⚡ Bottom-Up Feature: Composed from AuthForm -&gt; AuthContext -&gt; authService -&gt; apiClient primitives.</small>
        </div>
      </div>
    </div>
  );
}

export default LoginView;

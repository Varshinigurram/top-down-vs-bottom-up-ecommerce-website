import React from 'react';
import { RegisterForm } from '../features/authentication/RegisterForm';

export function RegisterView({ onNavigate }) {
  const handleSuccess = () => {
    if (onNavigate) {
      onNavigate('catalog');
    }
  };

  const handleSwitchToLogin = () => {
    if (onNavigate) {
      onNavigate('login');
    }
  };

  return (
    <div className="view-container auth-view">
      <div className="auth-card">
        <RegisterForm
          onSuccess={handleSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
        <div className="arch-note-subtle">
          <small>⚡ Bottom-Up Feature: Composed from RegisterForm -&gt; AuthContext -&gt; authService -&gt; apiClient primitives.</small>
        </div>
      </div>
    </div>
  );
}

export default RegisterView;

import React from 'react';
import { LoginForm } from '../features/authentication/LoginForm';

export function LoginView({ onNavigate }) {
  return (
    <section className="auth-view-container">
      <header className="view-header">
        <h2>Customer & Admin Authentication</h2>
        <p>Top-Down View: User login screen decomposed into authentication feature modules.</p>
      </header>

      <LoginForm
        onSuccess={() => onNavigate('catalog')}
        onSwitchToRegister={() => onNavigate('register')}
      />
    </section>
  );
}

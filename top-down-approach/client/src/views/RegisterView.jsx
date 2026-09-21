import React from 'react';
import { RegisterForm } from '../features/authentication/RegisterForm';

export function RegisterView({ onNavigate }) {
  return (
    <section className="auth-view-container">
      <header className="view-header">
        <h2>Account Registration</h2>
        <p>Top-Down View: User registration screen decomposed into authentication feature modules.</p>
      </header>

      <RegisterForm
        onSuccess={() => onNavigate('catalog')}
        onSwitchToLogin={() => onNavigate('login')}
      />
    </section>
  );
}

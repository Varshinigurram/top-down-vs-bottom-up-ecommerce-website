import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export function LoginForm({ onSuccess, onSwitchToRegister }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setFormError('Email address is required.');
      return;
    }
    if (!formData.password) {
      setFormError('Password is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError('');
      await login({ email: formData.email.trim(), password: formData.password });
      if (onSuccess) onSuccess();
    } catch (err) {
      setFormError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick fill helper for development testing
  const handleQuickFill = (email, password) => {
    setFormData({ email, password });
    setFormError('');
  };

  return (
    <div className="auth-form-card">
      <h3>Sign In to Your Account</h3>
      <p className="auth-subtitle">Enter your credentials to manage your store session.</p>

      {formError && <div className="alert-banner error">{formError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. customer@example.com"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            disabled={isSubmitting}
            required
          />
        </div>

        <button type="submit" className="btn-primary btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="test-credentials-box">
        <span className="test-box-title">Dev Quick-Fill Test Credentials:</span>
        <div className="test-btn-group">
          <button
            type="button"
            className="btn-quick-fill"
            onClick={() => handleQuickFill('customer@example.com', 'Customer123!')}
          >
            Customer Account
          </button>
          <button
            type="button"
            className="btn-quick-fill"
            onClick={() => handleQuickFill('admin@example.com', 'Admin123!')}
          >
            Admin Account
          </button>
        </div>
      </div>

      <div className="auth-form-footer">
        <span>Don't have an account? </span>
        <button type="button" className="btn-link" onClick={onSwitchToRegister}>
          Register here
        </button>
      </div>
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredUser, setStoredUser, clearStoredUser } from '../utils/authSession';
import { loginApi, registerApi, logoutApi, getCurrentUserApi } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const data = await getCurrentUserApi();
      const currentUser = data?.data?.user || data?.user || data;
      setUser(currentUser);
      setStoredUser(currentUser);
    } catch (err) {
      setUser(null);
      clearStoredUser();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    const loggedInUser = data?.data?.user || data?.user || data;
    setUser(loggedInUser);
    setStoredUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (userData) => {
    const data = await registerApi(userData);
    const newUser = data?.data?.user || data?.user || data;
    setUser(newUser);
    setStoredUser(newUser);
    return newUser;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.warn('Logout request warning:', err);
    } finally {
      setUser(null);
      clearStoredUser();
    }
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    register,
    logout,
    checkAuthStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

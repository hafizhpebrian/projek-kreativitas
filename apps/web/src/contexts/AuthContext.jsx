import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from '../lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const res = await fetchApi('/auth/get-session');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email, password) => {
    const res = await fetchApi('/auth/sign-in/email', {
      method: 'POST',
      body: { email, password },
    });
    
    if (res.ok) {
      await checkSession();
      return { success: true };
    } else {
      const error = await res.json().catch(() => ({}));
      return { success: false, error: error.message || error.error || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    const res = await fetchApi('/auth/sign-up/email', {
      method: 'POST',
      body: { name, email, password },
    });
    
    if (res.ok) {
      await checkSession();
      return { success: true };
    } else {
      const error = await res.json().catch(() => ({}));
      return { success: false, error: error.message || error.error || 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await fetchApi('/auth/sign-out', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setUser({ role, token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authAPI.login(email, password, role);
      const { token, user: userData } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userData.role || role);
      setUser({ ...userData, token });
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authAPI.register(userData);
      const { token, user: newUser } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', newUser.role);
      setUser({ ...newUser, token });
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
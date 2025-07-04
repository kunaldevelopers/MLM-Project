import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoUsers, generateJWT, validateJWT } from '../utils/auth.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('mlm_token');
    if (token) {
      const userData = validateJWT(token);
      if (userData) {
        setUser(userData);
      } else {
        localStorage.removeItem('mlm_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Find user in demo users
      const userData = demoUsers.find(u => u.email === email && u.password === password);
      
      if (!userData) {
        throw new Error('Invalid credentials');
      }

      const token = generateJWT(userData);
      localStorage.setItem('mlm_token', token);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // For demo purposes, we'll just simulate registration
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        rank: 'Bronze',
        totalEarnings: 0,
        walletBalance: 0,
        directReferrals: 0,
        indirectReferrals: 0,
        leftLegCount: 0,
        rightLegCount: 0,
        kycStatus: 'pending',
        isActive: true,
        joinDate: new Date().toISOString(),
        role: 'user'
      };

      const token = generateJWT(newUser);
      localStorage.setItem('mlm_token', token);
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('mlm_token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
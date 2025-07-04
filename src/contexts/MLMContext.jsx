import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';
import { demoTreeData, demoTransactions, demoNotifications } from '../utils/demoData.js';

const MLMContext = createContext();

export const useMLM = () => {
  const context = useContext(MLMContext);
  if (!context) {
    throw new Error('useMLM must be used within an MLMProvider');
  }
  return context;
};

export const MLMProvider = ({ children }) => {
  const { user } = useAuth();
  const [treeData, setTreeData] = useState(demoTreeData);
  const [transactions, setTransactions] = useState(demoTransactions);
  const [notifications, setNotifications] = useState(demoNotifications);

  const getUserTree = (userId) => {
    return treeData.find(node => node.id === userId) || null;
  };

  const getUserTransactions = (userId) => {
    return transactions.filter(t => t.userId === userId);
  };

  const getUserNotifications = (userId) => {
    return notifications.filter(n => n.userId === userId);
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now().toString(),
      ...transaction,
      timestamp: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const value = {
    treeData,
    transactions,
    notifications,
    getUserTree,
    getUserTransactions,
    getUserNotifications,
    addTransaction,
    addNotification,
    markNotificationAsRead
  };

  return <MLMContext.Provider value={value}>{children}</MLMContext.Provider>;
};
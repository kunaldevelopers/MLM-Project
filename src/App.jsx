import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { MLMProvider } from './contexts/MLMContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TreeView from './pages/TreeView.jsx';
import Wallet from './pages/Wallet.jsx';
import Profile from './pages/Profile.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import Layout from './components/Layout.jsx';

function App() {
  return (
    <AuthProvider>
      <MLMProvider>
        <div className="min-h-screen bg-neutral-100">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tree" element={<TreeView />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </MLMProvider>
    </AuthProvider>
  );
}

export default App;
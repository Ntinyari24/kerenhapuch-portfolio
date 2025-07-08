import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from '../components/Portfolio';
import AdminDashboard from '../components/AdminDashboard';
import AdminLogin from '../components/AdminLogin';

const Index = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    localStorage.getItem('admin_authenticated') === 'true'
  );

  const handleAdminLogin = (password: string) => {
    // Simple password check - in production, use proper authentication
    if (password === 'admin123') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route 
        path="/admin" 
        element={
          isAdminAuthenticated ? (
            <AdminDashboard onLogout={handleAdminLogout} />
          ) : (
            <AdminLogin onLogin={handleAdminLogin} />
          )
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Index;

import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard';
import apiService from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await apiService.verifyToken();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await apiService.login(username, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error.message || 'Đăng nhập thất bại' 
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;

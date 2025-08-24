import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import apiService from './services/api';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NewRequestPage from './pages/NewRequestPage';
import PharmacistPage from './pages/PharmacistPage';

function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Verify user and get profile from backend
          const response = await apiService.verifyUser(firebaseUser.email);
          if (response.success) {
            setUser(firebaseUser);
            setUserProfile(response.user);
          } else {
            setUser(null);
            setUserProfile(null);
          }
        } catch (error) {
          console.error('Failed to verify user:', error);
          setUser(null);
          setUserProfile(null);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '18px'
      }}>
        Đang tải...
      </div>
    );
  }

  if (!user || !userProfile) {
    return <LoginPage />;
  }

  // Route based on user role
  if (userProfile.role === 'pharmacist') {
    return <PharmacistPage user={userProfile} />;
  }

  // Doctor interface
  if (currentPage === 'new-request') {
    return <NewRequestPage onBack={() => setCurrentPage('home')} user={userProfile} />;
  }

  return <HomePage onCreateRequest={() => setCurrentPage('new-request')} user={userProfile} />;
}

export default App;



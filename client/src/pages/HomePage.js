import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import './HomePage.css';

function HomePage({ onCreateRequest, user }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <Header 
        user={user}
        onLogout={handleLogout}
        onCreateRequest={onCreateRequest}
      />
      <main className="main-content">
        <Dashboard 
          user={user}
          onCreateRequest={onCreateRequest}
        />
      </main>
    </div>
  );
}

export default HomePage;

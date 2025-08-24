import React, { useState } from 'react';
import '../App.css'; 

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleAccounts = [
    { username: 'sicu', role: 'Bác sĩ (SICU)' },
    { username: 'pharmacist1', role: 'Dược sĩ' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await onLogin(username, password);
      if (!result.success) {
        setError(result.error || 'Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi kết nối. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (sampleUsername) => {
    setUsername(sampleUsername);
    setPassword('123456'); // Default password for sample accounts
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">PedMedConsult</h1>
        <p className="login-subtitle">Hệ thống hỗ trợ tư vấn TDM</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
              autoComplete="username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
              autoComplete="current-password"
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <div className="spinner-small"></div>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        <div className="sample-accounts">
          <p>Sử dụng tài khoản mẫu:</p>
          <ul>
            {sampleAccounts.map(acc => (
              <li key={acc.username}>
                <button onClick={() => handleSampleClick(acc.username)}>
                  <strong>{acc.username}</strong> ({acc.role})
                </button>
              </li>
            ))}
          </ul>
           <p className="note">Mật khẩu mặc định cho tài khoản mẫu là: <strong>123456</strong></p>
        </div>
      </div>
       <footer className="login-footer">
        <p>&copy; 2024 PedMedConsult. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;

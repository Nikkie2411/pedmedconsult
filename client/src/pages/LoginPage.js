import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const result = await onLogin(username, password);
            if (!result.success) {
                setError(result.message || 'Đăng nhập thất bại');
            }
        } catch (err) {
            setError('Lỗi kết nối. Vui lòng thử lại.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-form">
                    <h1>PedMedConsult</h1>
                    <h2>Đăng nhập</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Tên đăng nhập:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="VD: sicu, pharmacist1"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Mật khẩu:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        
                        {error && <div className="error-message">{error}</div>}
                        
                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </form>

                    <div className="info-section">
                        <div className="account-info">
                            <h4>Tài khoản mẫu:</h4>
                            <p><strong>Bác sĩ:</strong> sicu, nhi, timMach</p>
                            <p><strong>Dược sĩ:</strong> pharmacist1, pharmacist2</p>
                            <p><strong>Mật khẩu:</strong> 123456</p>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center', marginTop: '1rem' }}>
                            💡 Liên hệ quản trị viên để được cấp tài khoản truy cập hệ thống
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const goToTestEmail = () => {
        // Set a flag to navigate to test email page
        window.location.hash = 'test-email';
        window.location.reload();
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-form">
                    <h1>PedMedConsult</h1>
                    <h2>Đăng nhập</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
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

                    <div className="demo-accounts">
                        <h3>Tài khoản demo:</h3>
                        <p><strong>Bác sĩ:</strong> doctor@example.com / password123</p>
                        <p><strong>Dược sĩ:</strong> pharmacist@example.com / password123</p>
                    </div>

                    <div className="test-section">
                        <button onClick={goToTestEmail} className="test-email-button">
                            Test Email Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

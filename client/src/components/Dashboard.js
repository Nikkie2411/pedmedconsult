import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import apiService from '../services/api';
import './Dashboard.css';

const Dashboard = ({ user }) => {
    const [stats, setStats] = useState({
        totalRequests: 0,
        pendingRequests: 0,
        completedRequests: 0,
        todayRequests: 0
    });
    const [recentRequests, setRecentRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch all requests
            const requestsResponse = await apiService.getRequests();
            const requests = requestsResponse.data || [];
            
            // Calculate statistics
            const today = new Date().toISOString().split('T')[0];
            const stats = {
                totalRequests: requests.length,
                pendingRequests: requests.filter(r => r.status === 'Chờ trả lời').length,
                completedRequests: requests.filter(r => r.status === 'Đã trả lời').length,
                todayRequests: requests.filter(r => r.createdDate === today).length
            };
            
            setStats(stats);
            
            // Get recent requests (last 5)
            const recent = requests
                .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                .slice(0, 5);
            setRecentRequests(recent);
            
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Chờ trả lời': return '#ff9800';
            case 'Đã trả lời': return '#4caf50';
            default: return '#757575';
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="header-left">
                        <h1>🏥 PedMedConsult</h1>
                        <p>Hệ thống tư vấn TDM</p>
                    </div>
                    <div className="header-right">
                        <div className="user-info">
                            <span>Xin chào, {user.displayName || user.email}</span>
                            <button onClick={handleLogout} className="logout-btn">
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Cards */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card total">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <h3>{stats.totalRequests}</h3>
                            <p>Tổng yêu cầu</p>
                        </div>
                    </div>
                    
                    <div className="stat-card pending">
                        <div className="stat-icon">⏳</div>
                        <div className="stat-content">
                            <h3>{stats.pendingRequests}</h3>
                            <p>Chờ trả lời</p>
                        </div>
                    </div>
                    
                    <div className="stat-card completed">
                        <div className="stat-icon">✅</div>
                        <div className="stat-content">
                            <h3>{stats.completedRequests}</h3>
                            <p>Đã hoàn thành</p>
                        </div>
                    </div>
                    
                    <div className="stat-card today">
                        <div className="stat-icon">📅</div>
                        <div className="stat-content">
                            <h3>{stats.todayRequests}</h3>
                            <p>Hôm nay</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="actions-section">
                <h2>Thao tác nhanh</h2>
                <div className="actions-grid">
                    <button 
                        className="action-card primary"
                        onClick={() => window.location.href = '/new-request'}
                    >
                        <div className="action-icon">➕</div>
                        <div className="action-content">
                            <h3>Tạo yêu cầu TDM</h3>
                            <p>Tạo yêu cầu tư vấn liều thuốc mới</p>
                        </div>
                    </button>
                    
                    {user.email?.includes('duocsi') && (
                        <button 
                            className="action-card secondary"
                            onClick={() => window.location.href = '/pharmacist'}
                        >
                            <div className="action-icon">💊</div>
                            <div className="action-content">
                                <h3>Giao diện dược sĩ</h3>
                                <p>Xem và trả lời các yêu cầu TDM</p>
                            </div>
                        </button>
                    )}
                    
                    <button 
                        className="action-card tertiary"
                        onClick={() => window.location.href = '/reports'}
                    >
                        <div className="action-icon">📈</div>
                        <div className="action-content">
                            <h3>Báo cáo</h3>
                            <p>Xem thống kê và báo cáo</p>
                        </div>
                    </button>
                </div>
            </section>

            {/* Recent Requests */}
            <section className="recent-section">
                <h2>Yêu cầu gần đây</h2>
                <div className="recent-list">
                    {recentRequests.length === 0 ? (
                        <div className="empty-state">
                            <p>Chưa có yêu cầu TDM nào</p>
                        </div>
                    ) : (
                        recentRequests.map(request => (
                            <div key={request.id} className="recent-item">
                                <div className="recent-left">
                                    <h4>{request.patientName}</h4>
                                    <p>{request.drugName} - {request.patientCode}</p>
                                    <small>{request.createdDate}</small>
                                </div>
                                <div className="recent-right">
                                    <span 
                                        className="status-badge"
                                        style={{ backgroundColor: getStatusColor(request.status) }}
                                    >
                                        {request.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import apiService from '../services/api';
import './PharmacistPage.css';

const PharmacistPage = ({ user }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [response, setResponse] = useState('');
    const [activeTab, setActiveTab] = useState('pending'); // pending, answered

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            setLoading(true);
            // In real implementation, filter by pharmacist's departments
            const data = await apiService.getPatients();
            setRequests(data);
        } catch (err) {
            console.error('Failed to load requests:', err);
            setError('Không thể tải danh sách yêu cầu. Vui lòng thử lại.');
            // Fallback data
            setRequests([
                { 
                    id: 1, 
                    createdDate: '2025-08-24', 
                    department: 'Nhi khoa', 
                    patientName: 'Nguyễn Văn A', 
                    patientCode: 'BN001', 
                    dob: '2020-01-15', 
                    status: 'Chờ trả lời',
                    drugName: 'Vancomycin',
                    doctorName: 'BS. Lê Văn C',
                    priority: 'high'
                },
                { 
                    id: 2, 
                    createdDate: '2025-08-23', 
                    department: 'Nhi khoa', 
                    patientName: 'Trần Thị B', 
                    patientCode: 'BN002', 
                    dob: '1995-05-20', 
                    status: 'Đã trả lời',
                    drugName: 'Digoxin',
                    doctorName: 'BS. Nguyễn Văn D',
                    responseDate: '2025-08-24',
                    responseBy: user.name
                },
                { 
                    id: 3, 
                    createdDate: '2025-08-24', 
                    department: 'Sơ sinh', 
                    patientName: 'Lê Văn C', 
                    patientCode: 'BN003', 
                    dob: '2022-03-10', 
                    status: 'Chờ trả lời',
                    drugName: 'Theophylline',
                    doctorName: 'BS. Phạm Thị E',
                    priority: 'normal'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        signOut(auth);
    };

    const handleSelectRequest = (request) => {
        setSelectedRequest(request);
        setResponse(request.pharmacistResponse || '');
    };

    const handleSendResponse = async () => {
        if (!response.trim()) {
            alert('Vui lòng nhập nội dung tư vấn');
            return;
        }

        const confirmed = window.confirm('Bạn có chắc chắn muốn gửi tư vấn này?');
        if (!confirmed) return;

        try {
            // Send response via API
            const responseData = await apiService.updateRequestResponse(
                selectedRequest.id,
                response,
                user.name
            );

            if (responseData.success) {
                // Update local state
                setRequests(prev => prev.map(req => 
                    req.id === selectedRequest.id 
                        ? { 
                            ...req, 
                            status: 'Đã trả lời', 
                            pharmacistResponse: response,
                            responseDate: new Date().toISOString().split('T')[0],
                            responseBy: user.name
                        }
                        : req
                ));

                alert('Tư vấn đã được gửi thành công! Email thông báo đã được gửi đến bác sĩ.');
                setSelectedRequest(null);
                setResponse('');
            } else {
                throw new Error(responseData.error || 'Failed to send response');
            }
        } catch (err) {
            console.error('Error sending response:', err);
            alert('Có lỗi xảy ra khi gửi tư vấn. Vui lòng thử lại.');
        }
    };

    const pendingRequests = requests.filter(req => req.status === 'Chờ trả lời');
    const answeredRequests = requests.filter(req => req.status === 'Đã trả lời');

    const currentRequests = activeTab === 'pending' ? pendingRequests : answeredRequests;

    if (loading) {
        return <div className="loading">Đang tải...</div>;
    }

    return (
        <div className="pharmacist-page">
            <div className="header">
                <div className="header-left">
                    <h1>PedMedConsult - Dược sĩ</h1>
                    <p>Xin chào, {user.name}</p>
                </div>
                <div className="header-right">
                    <span className="departments">
                        Phụ trách: {user.departments?.join(', ') || 'Tất cả khoa'}
                    </span>
                    <button className="logout-btn" onClick={handleLogout}>
                        Đăng xuất
                    </button>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="main-content">
                <div className="sidebar">
                    <div className="tabs">
                        <button 
                            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
                            onClick={() => setActiveTab('pending')}
                        >
                            Chờ trả lời ({pendingRequests.length})
                        </button>
                        <button 
                            className={`tab ${activeTab === 'answered' ? 'active' : ''}`}
                            onClick={() => setActiveTab('answered')}
                        >
                            Đã trả lời ({answeredRequests.length})
                        </button>
                    </div>

                    <div className="requests-list">
                        {currentRequests.length === 0 ? (
                            <div className="no-requests">
                                {activeTab === 'pending' 
                                    ? 'Không có yêu cầu nào đang chờ trả lời'
                                    : 'Chưa có yêu cầu nào đã trả lời'
                                }
                            </div>
                        ) : (
                            currentRequests.map((request) => (
                                <div 
                                    key={request.id} 
                                    className={`request-item ${selectedRequest?.id === request.id ? 'selected' : ''} ${request.priority === 'high' ? 'high-priority' : ''}`}
                                    onClick={() => handleSelectRequest(request)}
                                >
                                    <div className="request-header">
                                        <strong>{request.patientName}</strong>
                                        <span className="request-date">{request.createdDate}</span>
                                    </div>
                                    <div className="request-details">
                                        <span className="drug">{request.drugName}</span>
                                        <span className="department">{request.department}</span>
                                    </div>
                                    <div className="doctor-info">
                                        BS: {request.doctorName}
                                    </div>
                                    {request.priority === 'high' && (
                                        <div className="priority-badge">Ưu tiên cao</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="content-area">
                    {selectedRequest ? (
                        <div className="request-details-panel">
                            <div className="panel-header">
                                <h2>Chi tiết yêu cầu TDM</h2>
                                <span className={`status-badge ${selectedRequest.status === 'Chờ trả lời' ? 'pending' : 'answered'}`}>
                                    {selectedRequest.status}
                                </span>
                            </div>

                            <div className="patient-info-section">
                                <h3>Thông tin bệnh nhân</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Tên bệnh nhân:</label>
                                        <span>{selectedRequest.patientName}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Mã BN:</label>
                                        <span>{selectedRequest.patientCode}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Ngày sinh:</label>
                                        <span>{selectedRequest.dob}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Khoa:</label>
                                        <span>{selectedRequest.department}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Thuốc TDM:</label>
                                        <span>{selectedRequest.drugName}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Bác sĩ yêu cầu:</label>
                                        <span>{selectedRequest.doctorName}</span>
                                    </div>
                                </div>
                            </div>

                            {selectedRequest.status === 'Chờ trả lời' ? (
                                <div className="response-section">
                                    <h3>Tư vấn TDM</h3>
                                    <textarea
                                        value={response}
                                        onChange={(e) => setResponse(e.target.value)}
                                        placeholder="Nhập nội dung tư vấn TDM..."
                                        rows="8"
                                        className="response-textarea"
                                    />
                                    <div className="response-actions">
                                        <button 
                                            className="send-btn"
                                            onClick={handleSendResponse}
                                        >
                                            Gửi tư vấn
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="response-section">
                                    <h3>Tư vấn đã gửi</h3>
                                    <div className="response-display">
                                        {selectedRequest.pharmacistResponse}
                                    </div>
                                    <div className="response-meta">
                                        <span>Trả lời bởi: {selectedRequest.responseBy}</span>
                                        <span>Ngày: {selectedRequest.responseDate}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="no-selection">
                            <h2>Chọn một yêu cầu để xem chi tiết</h2>
                            <p>Bấm vào yêu cầu ở danh sách bên trái để xem thông tin chi tiết và tư vấn.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PharmacistPage;

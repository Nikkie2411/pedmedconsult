import React from 'react';

const Header = ({ user, onLogout, onCreateRequest }) => {
    return (
        <header style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                    🏥 PedMedConsult
                </h1>
                <span style={{ 
                    marginLeft: '1rem', 
                    fontSize: '0.9rem', 
                    opacity: 0.9 
                }}>
                    Hệ thống tư vấn TDM Nhi khoa
                </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                    Xin chào, <strong>{user?.fullName || user?.email}</strong>
                </span>
                
                {user?.role === 'doctor' && (
                    <button
                        onClick={onCreateRequest}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.3)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.2)';
                        }}
                    >
                        ➕ Tạo yêu cầu tư vấn
                    </button>
                )}
                
                <button
                    onClick={onLogout}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.1)';
                    }}
                >
                    🚪 Đăng xuất
                </button>
            </div>
        </header>
    );
};

export default Header;

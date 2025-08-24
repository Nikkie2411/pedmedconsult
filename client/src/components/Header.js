import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/login');
        }).catch((error) => {
            console.error('Error signing out: ', error);
        });
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    PedMedConsult
                </Typography>
                <Button color="inherit" onClick={() => navigate('/new-request')}>Tạo yêu cầu</Button>
                <Button color="inherit" onClick={handleLogout}>Đăng xuất</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import services
const GoogleSheetsService = require('./services/googleSheetsService');
const emailService = require('./services/emailService');

// Import routes
const { router: authRoutes } = require('./routes/auth');
const consultationRoutes = require('./routes/consultation');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Initialize Google Sheets service
async function initializeServices() {
    try {
        console.log('🔍 Initializing Google Sheets service...');
        await GoogleSheetsService.instance.initialize();
        console.log('✅ Google Sheets service initialized successfully');
    } catch (error) {
        console.error('❌ Failed to initialize Google Sheets service:', error.message);
        process.exit(1);
    }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/consultation', consultationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'PedMedConsult Backend'
    });
});

// Start server
async function startServer() {
    try {
        await initializeServices();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

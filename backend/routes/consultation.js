const express = require('express');
const router = express.Router();
const GoogleSheetsService = require('../services/googleSheetsService');
const { authMiddleware } = require('../middleware/auth');

// Get all consultation requests
router.get('/requests', authMiddleware, async (req, res) => {
    try {
        const requests = await GoogleSheetsService.instance.getRequests();
        res.json(requests);
    } catch (error) {
        console.error('Error fetching consultation requests:', error);
        res.status(500).json({ 
            error: 'Failed to fetch consultation requests',
            details: error.message 
        });
    }
});

// Submit new consultation request
router.post('/requests', authMiddleware, async (req, res) => {
    try {
        const requestData = req.body;
        const result = await GoogleSheetsService.instance.addRequest(requestData);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error submitting consultation request:', error);
        res.status(500).json({ 
            error: 'Failed to submit consultation request',
            details: error.message 
        });
    }
});

// Get request by ID
router.get('/requests/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const request = await GoogleSheetsService.instance.getRequestById(id);
        
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }
        
        res.json(request);
    } catch (error) {
        console.error('Error fetching consultation request:', error);
        res.status(500).json({ 
            error: 'Failed to fetch consultation request',
            details: error.message 
        });
    }
});

// Update request status
router.patch('/requests/:id/status', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const result = await GoogleSheetsService.instance.updateRequestStatus(id, status);
        res.json(result);
    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({ 
            error: 'Failed to update request status',
            details: error.message 
        });
    }
});

// Get patients for consultation
router.get('/patients', authMiddleware, async (req, res) => {
    try {
        const patients = await GoogleSheetsService.instance.getPatients();
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ 
            error: 'Failed to fetch patients',
            details: error.message 
        });
    }
});

// Get dosing information
router.get('/doses', authMiddleware, async (req, res) => {
    try {
        const doses = await GoogleSheetsService.instance.getDoses();
        res.json(doses);
    } catch (error) {
        console.error('Error fetching doses:', error);
        res.status(500).json({ 
            error: 'Failed to fetch doses',
            details: error.message 
        });
    }
});

// Get concentrations
router.get('/concentrations', authMiddleware, async (req, res) => {
    try {
        const concentrations = await GoogleSheetsService.instance.getConcentrations();
        res.json(concentrations);
    } catch (error) {
        console.error('Error fetching concentrations:', error);
        res.status(500).json({ 
            error: 'Failed to fetch concentrations',
            details: error.message 
        });
    }
});

module.exports = router;

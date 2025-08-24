const express = require('express');
const router = express.Router();
const googleSheets = require('../services/googleSheets');

// Get user info by email (for login verification)
router.post('/verify', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check in Users sheet first (doctors)
        const userRows = await googleSheets.findRowsByField('Users', 'email', email);
        if (userRows.length > 0) {
            const user = userRows[0];
            return res.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    department: user.department,
                    role: user.role || 'doctor',
                    pharmacistIds: user.pharmacistIds ? user.pharmacistIds.split(',') : []
                }
            });
        }

        // Check in Pharmacists sheet
        const pharmacistRows = await googleSheets.findRowsByField('Pharmacists', 'email', email);
        if (pharmacistRows.length > 0) {
            const pharmacist = pharmacistRows[0];
            return res.json({
                success: true,
                user: {
                    id: pharmacist.id,
                    email: pharmacist.email,
                    name: pharmacist.name,
                    departments: pharmacist.departments ? pharmacist.departments.split(',') : [],
                    role: 'pharmacist',
                    phone: pharmacist.phone
                }
            });
        }

        return res.status(404).json({ 
            success: false,
            error: 'User not found' 
        });

    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to verify user' 
        });
    }
});

// Get departments list
router.get('/departments', async (req, res) => {
    try {
        // This could be from a config or database
        const departments = [
            'Nhi',
            'Nội tiết',
            'Ung thư',
            'Tim mạch',
            'Thần kinh',
            'ICU',
            'Hồi sức cấp cứu'
        ];

        res.json(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ error: 'Failed to fetch departments' });
    }
});

// Get TDM drugs list
router.get('/tdm-drugs', async (req, res) => {
    try {
        const drugs = [
            'Vancomycin',
            'Phenytoin',
            'Digoxin',
            'Theophylline',
            'Carbamazepine',
            'Valproic acid',
            'Lithium',
            'Gentamicin',
            'Amikacin',
            'Tobramycin'
        ];

        res.json(drugs);
    } catch (error) {
        console.error('Error fetching TDM drugs:', error);
        res.status(500).json({ error: 'Failed to fetch TDM drugs' });
    }
});

module.exports = router;

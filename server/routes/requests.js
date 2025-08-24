const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const googleSheets = require('../services/googleSheets');
const emailService = require('../services/email');

// Create new consultation request
router.post('/', async (req, res) => {
    try {
        const {
            formData,
            doses,
            concentrations
        } = req.body;

        // Generate unique ID for the request
        const requestId = uuidv4();
        
        // Prepare patient data for Google Sheets
        const patientData = {
            id: requestId,
            createdDate: formData.createdDate,
            department: formData.department,
            patientName: formData.patientName,
            patientCode: formData.patientCode,
            gender: formData.gender,
            dob: formData.dob,
            weight: formData.weight,
            height: formData.height,
            isIcu: formData.isIcu.toString(),
            isNewborn: formData.isNewborn.toString(),
            gestationalAge: formData.gestationalAge || '',
            birthWeight: formData.birthWeight || '',
            isObese: formData.isObese.toString(),
            isCancer: formData.isCancer.toString(),
            tdmDrug: formData.tdmDrug,
            creatinineValue: formData.creatinineValue,
            creatinineDateTime: formData.creatinineDateTime,
            doctorName: formData.doctorName,
            doctorPhone: formData.doctorPhone,
            doctorEmail: formData.doctorEmail,
            status: 'Chờ trả lời',
            pharmacistResponse: '',
            responseDate: '',
            createdAt: new Date().toISOString()
        };

        // Save patient to Google Sheets
        await googleSheets.addRow('Patients', patientData);

        // Save doses
        for (const dose of doses) {
            await googleSheets.addRow('Doses', {
                id: uuidv4(),
                patientId: requestId,
                amount: dose.amount,
                interval: dose.interval,
                duration: dose.duration,
                dateTime: dose.time,
                createdAt: new Date().toISOString()
            });
        }

        // Save concentrations
        for (const concentration of concentrations) {
            await googleSheets.addRow('Concentrations', {
                id: uuidv4(),
                patientId: requestId,
                value: concentration.value,
                dateTime: concentration.time,
                createdAt: new Date().toISOString()
            });
        }

        // Find pharmacists responsible for this department
        const pharmacists = await googleSheets.getRows('Pharmacists');
        const responsiblePharmacists = pharmacists.filter(pharmacist => {
            const departments = pharmacist.departments ? pharmacist.departments.split(',') : [];
            return departments.includes(formData.department);
        });

        // Send email notifications to pharmacists
        if (responsiblePharmacists.length > 0) {
            const pharmacistEmails = responsiblePharmacists.map(p => p.email);
            try {
                await emailService.sendNewRequestNotification(patientData, pharmacistEmails);
                console.log(`📧 Notification emails sent to ${pharmacistEmails.length} pharmacists`);
            } catch (emailError) {
                console.error('Failed to send email notifications:', emailError);
                // Don't fail the request if email fails
            }
        }

        res.status(201).json({
            success: true,
            message: 'Yêu cầu tư vấn đã được tạo thành công',
            requestId: requestId
        });

    } catch (error) {
        console.error('Error creating consultation request:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to create consultation request',
            details: error.message 
        });
    }
});

// Get all requests (for pharmacist view)
router.get('/', async (req, res) => {
    try {
        const { status, department } = req.query;
        
        let rows = await googleSheets.getRows('Patients');
        
        // Filter by status if specified
        if (status && status !== 'all') {
            rows = rows.filter(row => (row.status || 'Chờ trả lời') === status);
        }

        // Filter by department if specified
        if (department && department !== 'all') {
            rows = rows.filter(row => row.department === department);
        }

        const requests = rows.map(row => ({
            id: row.id,
            createdDate: row.createdDate,
            department: row.department,
            patientName: row.patientName,
            patientCode: row.patientCode,
            tdmDrug: row.tdmDrug,
            doctorName: row.doctorName,
            status: row.status || 'Chờ trả lời',
            responseDate: row.responseDate
        }));

        res.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ error: 'Failed to fetch consultation requests' });
    }
});

// Update request with pharmacist response
router.put('/:id/response', async (req, res) => {
    try {
        const { id } = req.params;
        const { response, pharmacistName } = req.body;

        if (!response || !pharmacistName) {
            return res.status(400).json({ 
                error: 'Response and pharmacist name are required' 
            });
        }

        // Find the patient record
        const patientRows = await googleSheets.findRowsByField('Patients', 'id', id);
        if (patientRows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }

        const patient = patientRows[0];
        
        // Update the response
        patient.pharmacistResponse = response;
        patient.status = 'Đã trả lời';
        patient.responseDate = new Date().toISOString();
        await patient.save();

        // Send email notification to the requesting doctor
        try {
            await emailService.sendResponseNotification(patient, response, pharmacistName);
            console.log(`📧 Response notification sent to ${patient.doctorEmail}`);
        } catch (emailError) {
            console.error('Failed to send response email:', emailError);
            // Don't fail the request if email fails
        }

        res.json({
            success: true,
            message: 'Phản hồi đã được gửi thành công'
        });

    } catch (error) {
        console.error('Error updating request response:', error);
        res.status(500).json({ 
            error: 'Failed to update request response',
            details: error.message 
        });
    }
});

module.exports = router;

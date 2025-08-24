const express = require('express');
const router = express.Router();
const googleSheets = require('../services/googleSheets');

// Get all patients (for main page)
router.get('/', async (req, res) => {
    try {
        const { department } = req.query;
        
        let rows = await googleSheets.getRows('Patients');
        
        // Filter by department if specified
        if (department && department !== 'all') {
            rows = rows.filter(row => row.department === department);
        }

        const patients = rows.map(row => ({
            id: row.id,
            createdDate: row.createdDate,
            department: row.department,
            patientName: row.patientName,
            patientCode: row.patientCode,
            dob: row.dob,
            status: row.status || 'Chờ trả lời',
            doctorName: row.doctorName
        }));

        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
});

// Get single patient with full details
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const patientRows = await googleSheets.findRowsByField('Patients', 'id', id);
        if (patientRows.length === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const patient = patientRows[0];
        
        // Get doses and concentrations
        const doses = await googleSheets.findRowsByField('Doses', 'patientId', id);
        const concentrations = await googleSheets.findRowsByField('Concentrations', 'patientId', id);

        const fullPatientData = {
            id: patient.id,
            createdDate: patient.createdDate,
            department: patient.department,
            patientName: patient.patientName,
            patientCode: patient.patientCode,
            gender: patient.gender,
            dob: patient.dob,
            weight: patient.weight,
            height: patient.height,
            isIcu: patient.isIcu === 'true',
            isNewborn: patient.isNewborn === 'true',
            gestationalAge: patient.gestationalAge,
            birthWeight: patient.birthWeight,
            isObese: patient.isObese === 'true',
            isCancer: patient.isCancer === 'true',
            tdmDrug: patient.tdmDrug,
            creatinineValue: patient.creatinineValue,
            creatinineDateTime: patient.creatinineDateTime,
            doctorName: patient.doctorName,
            doctorPhone: patient.doctorPhone,
            doctorEmail: patient.doctorEmail,
            status: patient.status || 'Chờ trả lời',
            pharmacistResponse: patient.pharmacistResponse,
            responseDate: patient.responseDate,
            doses: doses.map(dose => ({
                id: dose.id,
                amount: dose.amount,
                interval: dose.interval,
                duration: dose.duration,
                dateTime: dose.dateTime
            })),
            concentrations: concentrations.map(conc => ({
                id: conc.id,
                value: conc.value,
                dateTime: conc.dateTime
            }))
        };

        res.json(fullPatientData);
    } catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ error: 'Failed to fetch patient details' });
    }
});

module.exports = router;

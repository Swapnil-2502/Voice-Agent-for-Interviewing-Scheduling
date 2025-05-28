const express = require('express');
const router = express.Router();

const appointments = require('../controllers/AppointmentsController')

router.post('/',appointments.createAppointment)
router.get('/',appointments.getAllApointments)
router.get('/job/:jobId',appointments.getappointmentByJob)
router.get('/candidate/:candidateId',appointments.getAppointmentsByCandidate)

module.exports = router
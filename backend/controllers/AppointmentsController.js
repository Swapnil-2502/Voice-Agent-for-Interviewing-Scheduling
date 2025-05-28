const Appointments = require('../models/Appointments')

exports.createAppointment = (req,res) => {
    Appointments.createAppointment(req.body,(err,result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Appointment created', appointmentId: result.insertId });
    })
}

exports.getAllApointments = (req,res) => {
    Appointments.getAllAppointments((err,results)=>{
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    })
}

exports.getappointmentByJob = (req,res) => {
    const jobId = req.params.jobId;
    Appointments.getappointmentByJob(jobId,(err,results)=>{
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    })
}

exports.getAppointmentsByCandidate = (req,res)=>{
    const candidateId = req.params.candidateId;
    Appointments.getAppointmentsByCandidate(candidateId,(err,results)=>{
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    })
}


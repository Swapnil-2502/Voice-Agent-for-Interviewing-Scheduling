const db = require('./db')

const createAppointment = (appointment,cb) => {
    const {job_id, candidate_id, date_time, status} = appointment
    db.query(
        'INSERT INTO appointments (job_id, candidate_id, date_time, status) VALUES (?, ?, ?, ?)',
        [job_id, candidate_id, date_time, status || 'Scheduled'],
        cb
    )
}

const getAllAppointments = (cb) => {
    db.query(
        'SELECT * FROM appointments',cb
    )
}

const getappointmentByJob = (jobId,cb) => {
    db.query(
        'SELECT * FROM appointments WHERE job_id = ?',[jobId],cb
    )
}

const getAppointmentsByCandidate = (candidateId, cb) => {
  db.query('SELECT * FROM appointments WHERE candidate_id = ?', [candidateId], cb);
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getappointmentByJob,
    getAppointmentsByCandidate
}
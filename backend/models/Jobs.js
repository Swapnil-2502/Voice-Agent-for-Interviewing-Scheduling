const db = require("./db")

const getAllJobs = (cb) =>{
    db.query('SELECT * FROM Jobs',cb )
}

const createJob = (job,cb) => {
    const { title, description, requirements } = job;
    db.query(
        'INSERT INTO jobs (title, description, requirements) VALUES (?, ?, ?)',
        [title, description, requirements],
        cb
    )
}

module.exports = { getAllJobs, createJob };
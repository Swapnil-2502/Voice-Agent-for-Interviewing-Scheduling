const Job = require("../models/Jobs")

module.exports.getJobs = (req, res) => {
    Job.getAllJobs((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
}

exports.createJob = (req, res) => {
  Job.createJob(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Job created', jobId: result.insertId });
  });
};
const Candidate = require("../models/Candidates")

exports.createCandidate = (req,res) => {
    Candidate.createCandidate(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Candidate created', candidateId: result.insertId });
  });
}

exports.getCandidates = (req, res) => {
  Candidate.getAllCandidates((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
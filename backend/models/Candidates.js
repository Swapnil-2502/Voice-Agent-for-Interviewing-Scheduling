const db = require('./db')

const createCandidate = (candidate, cb) => {
    const { name, phone, current_ctc, expected_ctc, notice_period, experience } = candidate;
    db.query(
        'INSERT INTO candidates (name, phone, current_ctc, expected_ctc, notice_period, experience) VALUES (?, ?, ?, ?, ?, ?)',
        [name, phone, current_ctc, expected_ctc, notice_period, experience],
        cb
    );
}

const getAllCandidates = (cb) => {
  db.query('SELECT * FROM candidates', cb);
};

module.exports = {
  createCandidate,
  getAllCandidates,
};
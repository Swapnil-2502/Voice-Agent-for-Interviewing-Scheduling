const express = require('express');
const router = express.Router();

const candidate = require("../controllers/CandidateController")

router.post('/',candidate.createCandidate)
router.get('/',candidate.getCandidates)

module.exports = router
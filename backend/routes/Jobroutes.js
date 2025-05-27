const express = require('express');
const router = express.Router();

const jobController = require("../controllers/JobController")

router.get('/',jobController.getJobs)
router.post('/',jobController.createJob)

module.exports = router
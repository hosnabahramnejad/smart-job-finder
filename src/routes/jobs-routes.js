const express = require('express');

const getjobs = require('../controllers/jobs-controller');

const router = express.Router();

router.get('/jobs', getjobs.getjobs);
router.get('/search', getjobs.searchJobs);

module.exports = router;
const express = require('express');

const recommendation = require('../controllers/recommendation');

const router = express.Router();

router.get('/recommend/:username', recommendation.getRecommendation);
module.exports = router;
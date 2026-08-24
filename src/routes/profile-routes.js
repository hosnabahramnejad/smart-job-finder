const express = require('express');

const getprofiles = require('../controllers/profile-controller');

const router = express.Router();

router.post('/createprofile', getprofiles.createprofile);
router.get('/profile', getprofiles.getallprofiles);

module.exports = router;
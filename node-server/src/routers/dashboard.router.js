const express = require('express');
const passport = require('passport');

const dashboardController = require('../controllers/dashboard.controller');

const router = express.Router();

// get summary data for dashboard
router.get('/summary', dashboardController.summary);


module.exports = router;
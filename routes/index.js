// Import required modules
const express = require('express');
const router = express.Router();

// Import employee controller
const employeecontoller = require('../controllers/employeeController');

// Route to display the signup page for new employees
router.get('/', employeecontoller.signup);

// Include other routers for different routes
router.use('/employees', require('./employeeRoute'));
router.use('/students', require('./studentsRoute'));
router.use('/company', require('./companyRoutes'));
router.use('/interview', require('./interviewRoutes'));

// Export the router to be used in the main app file
module.exports = router;

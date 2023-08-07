// Import required modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import interview controller
const interviewController = require('../controllers/interviewController');

// Route to render the form to add a new interview
router.get('/renderInterviewsPage', passport.checkAuthentication, interviewController.renderInterviewform);

// Route to create a new interview
router.post('/create', passport.checkAuthentication, interviewController.createInterview);

// Route to display the list of all interviews
router.get('/listOfInterview', passport.checkAuthentication, interviewController.listOfInterviews);

// Route to get details of a specific interview by its ID
router.get('/getInterviewByIds/:id', interviewController.getInterview);

// Route to update details of a specific interview by its ID
router.post('/updateInterview/:id', passport.checkAuthentication, interviewController.update);

// Route to delete an interview by its ID
router.get('/destroyInterview/:id', interviewController.destroyInterview);

// Export the router to be used in the main app file
module.exports = router;

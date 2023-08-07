// Import required modules
const express = require('express');
const router = express.Router();
const passport = require("passport");

// Import employee controller
const employeecontoller = require('../controllers/employeeController');

// Route to display the home page for authenticated employees
router.get('/home', passport.checkAuthentication, employeecontoller.home);

// Route to display the profile page of a specific employee by ID
router.get('/profile/:id', passport.checkAuthentication, employeecontoller.Profile);

// Route to update the profile of an employee by ID
router.post('/update/:id', passport.checkAuthentication, employeecontoller.update);

// Route to display the signin page for employees
router.get('/signin', employeecontoller.signin);

// Route to create a new employee
router.post('/create', employeecontoller.Create);

// Route to authenticate employee login and create a session
router.post('/create_session', passport.authenticate('local', {
    failureRedirect: '/'
}), employeecontoller.create_session);

// Route to sign out an authenticated employee
router.get('/signout', passport.checkAuthentication, employeecontoller.destroysession);

// Export the router to be used in the main app file
module.exports = router;

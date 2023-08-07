// Import required modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import company controller
const companyContoller = require('../controllers/companyController');

// Route to render the company creation page
router.get('/renderComanyPage', passport.checkAuthentication, companyContoller.renderCompanyPage);

// Route to handle company creation
router.post('/addCompany', passport.checkAuthentication, companyContoller.addCompany);

// Route to display the list of companies
router.get('/listOfCompany', passport.checkAuthentication, companyContoller.displayListOfCompany);

// Route to handle company deletion
router.get('/destroy/:id', passport.checkAuthentication, companyContoller.destroyCompany);

// Export the router to be used in the main app file
module.exports = router;

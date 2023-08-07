// Import required modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import students controller
const studentsContoller = require('../controllers/studentsController');

// Route to render the form to add a new student
router.get('/renderStudentForm', passport.checkAuthentication, studentsContoller.renderStudentform);

// Route to create a new student
router.post('/addStudent', passport.checkAuthentication, studentsContoller.addStudent);

// Route to display the list of all students
router.get('/DisplayListOfStudents', passport.checkAuthentication, studentsContoller.displayListOfStudent);

// Route to get details of a specific student by their ID
router.get('/getStudentByIds/:id', passport.checkAuthentication, studentsContoller.getStudentById);

// Route to update details of a specific student by their ID
router.post('/updateStudent/:id', passport.checkAuthentication, studentsContoller.update);

// Route to delete a student by their ID
router.get('/destroy/:id', passport.checkAuthentication, studentsContoller.destroystudent);

// Route to display all details of all students
router.get('/alldetails', passport.checkAuthentication, studentsContoller.allDetailsOfStudent);

// Route to export student data to a CSV file
router.get('/export', passport.checkAuthentication, studentsContoller.exportsCsv);

// Route to fetch job data from an external API
router.get('/apisjob', passport.checkAuthentication, studentsContoller.jobPage);

// Export the router to be used in the main app file
module.exports = router;

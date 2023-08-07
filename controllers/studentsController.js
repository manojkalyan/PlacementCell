const Student = require('../models/studentSchema');
const Interview = require('../models/interviewsSchema');
const fetch = require('cross-fetch');
const Excel = require('exceljs');
const fs = require('fs');
const path = require('path');

// Module for rendering the student form
module.exports.renderStudentform = async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      return res.render('studentCreate');
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.error('Error retrieving user profile:', err);
    return res.status(500).json({ error: 'An error occurred while retrieving user profile' });
  }
};

// Module for creating a new student
module.exports.addStudent = async function (req, res) {
  try {
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (!existingStudent) {
      const newUser = await Student.create(req.body);
      req.flash('success', 'Successfully created');
      return res.redirect('back');
    } else {
      req.flash('error', 'Failed');
      return res.redirect('back');
    }
  } catch (err) {
    console.error('Error creating student:', err);
    return res.status(500).json({ error: 'An error occurred while creating student' });
  }
};

// Module for displaying the list of students
module.exports.displayListOfStudent = async function (req, res) {
  try {
    const students = await Student.find({});
    return res.render('displayStudentsList', {
      student: students
    });
  } catch (err) {
    console.error('Error retrieving student list:', err);
    return res.status(500).json({ error: 'An error occurred while retrieving student list' });
  }
};

// Module for fetching a single student by ID and rendering their details
module.exports.getStudentById = async function (req, res) {
  try {
    const student = await Student.findById(req.params.id);
    return res.render('getStudentByIds', {
      title: "Update Student",
      students: student
    });
  } catch (err) {
    console.error('Error retrieving user profile:', err);
    return res.status(500).json({ error: 'An error occurred while retrieving user profile' });
  }
};

// Module for updating student details
module.exports.update = async function (req, res) {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id);
    student.name = req.body.name;
    student.email = req.body.email;
    student.status = req.body.status;
    student.college = req.body.college;
    student.batch = req.body.batch;
    student.dsaFinalScore = req.body.dsaFinalScore;
    student.webDFinalScore = req.body.webDFinalScore;
    student.reactFinalScore = req.body.reactFinalScore;
    student.save();
    req.flash('success', 'Successfully updated');
    return res.redirect('back');
  } catch (err) {
    console.error('Error updating student details:', err);
    return res.status(500).send('Internal Server Error');
  }
};

// Module for deleting a student
module.exports.destroystudent = async function (req, res) {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      req.flash('error', 'Student not found');
      return res.redirect('back');
    }
    const interviewIds = student.interviews;
    for (const interviewId of interviewIds) {
      await Interview.findByIdAndRemove(interviewId);
    }
    const deletedStudent = await Student.findByIdAndRemove(studentId);
    if (!deletedStudent) {
      req.flash('error', 'Student not found');
      return res.redirect('back');
    }
    req.flash('success', 'Successfully deleted');
    return res.redirect('back');
  } catch (err) {
    console.error('Error deleting student:', err);
    req.flash('error', 'An error occurred while deleting the student');
    res.redirect('back');
  }
};

// Module for fetching all details of students and their interviews
module.exports.allDetailsOfStudent = async function (req, res) {
  try {
    const students = await Student.find().populate({
      path: 'interviews',
      populate: {
        path: 'companies',
      },
    });
    res.render('studentAllDetails', { students });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).send('Error fetching students');
  }
};

// Module for exporting student data to an Excel file
module.exports.exportsCsv = async (req, res) => {
  try {
    const students = await Student.find().populate({
      path: 'interviews',
      populate: {
        path: 'companies',
      },
    });

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    // Set up the columns in the Excel worksheet
    worksheet.columns = [
      { header: 'Name', key: 'Name', width: 20 },
      { header: 'Email', key: 'Email', width: 30 },
      { header: 'College', key: 'College', width: 25 },
      { header: 'Batch', key: 'Batch', width: 15 },
      { header: 'Status', key: 'Status', width: 15 },
      { header: 'DSA Final Score', key: 'DSAFinalScore', width: 20 },
      { header: 'WebD Final Score', key: 'WebDFinalScore', width: 20 },
      { header: 'React Final Score', key: 'ReactFinalScore', width: 20 },
      { header: 'Company', key: 'Company', width: 25 },
      { header: 'InterviewDate', key: 'InterviewDate', width: 25 },
      { header: 'Result', key: 'Result', width: 20 },
    ];

    // Add student data to the worksheet
    students.forEach(student => {
      if (student.interviews.length === 0) {
        // If the student has no interviews, add a row with empty interview details
        worksheet.addRow({
          Name: student.name,
          Email: student.email,
          College: student.college,
          Batch: student.batch,
          Status: student.status,
          DSAFinalScore: student.dsaFinalScore,
          WebDFinalScore: student.webDFinalScore,
          ReactFinalScore: student.reactFinalScore,
          Company: 'N/A',
          InterviewDate: 'N/A',
          Result: student.isPlaced ? '' : 'Not Placed',
        });
      } else {
        // If the student has interviews, add a row for each interview
        student.interviews.forEach(interview => {
          worksheet.addRow({
            Name: student.name,
            Email: student.email,
            College: student.college,
            Batch: student.batch,
            Status: student.status,
            DSAFinalScore: student.dsaFinalScore,
            WebDFinalScore: student.webDFinalScore,
            ReactFinalScore: student.reactFinalScore,
            Company: interview.companies ? interview.companies.name : 'No Company Found',
            InterviewDate: interview.date,
            Result: interview.result || 'Pending',
          });
        });
      }
    });

    // Generate a unique file name for the Excel file using the timestamp
    const excelFilePath = path.join(__dirname, '..', 'assets', 'students.xlsx');

    // Save the workbook to a file
    await workbook.xlsx.writeFile(excelFilePath);

    // Set the response headers for downloading the file
    res.setHeader('Content-Disposition', 'attachment; filename=students.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the Excel file as a response
    const fileStream = fs.createReadStream(excelFilePath);
    fileStream.pipe(res);
  } catch (err) {
    console.error('Error exporting student data:', err);
    res.status(500).send('Error exporting student data');
  }
};

/*
Route            /jobs/list
Description      Renders the jobsapi page
Access           PUBLIC
Parameter        None
Methods          GET
*/

// Module for rendering the jobsapi page
module.exports.jobPage = async function (req, res) {
  try {
    const response = await fetch('https://remotive.com/api/remote-jobs');
    const jobsData = await response.json();
    return res.render('jobsapi', {
      title: "Placement Cell",
      body: jobsData.jobs
    });
  } catch (err) {
    console.error('Error fetching jobs from API:', err);
  }
};

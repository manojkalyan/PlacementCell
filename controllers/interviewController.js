const Interview = require('../models/interviewsSchema');
const Company = require('../models/companySchema');
const Student = require('../models/studentSchema');

// Module for rendering the interview form
module.exports.renderInterviewform = async function (req, res) {
  try {
    const interviews = await Interview.find({});
    const companies = await Company.find({});
    const students = await Student.find({});
    return res.render('addInterview', {
      company: companies,
      interview: students
    });
  } catch (err) {
    res.status(500).send('Error fetching interviews');
  }
};

// Module for creating a new interview
module.exports.createInterview = async function (req, res) {
  try {
    // Get the data from the request body
    const { date, starttime, students, companies } = req.body;

    // Check if both student and company exist
    const student = await Student.findById(students);
    const company = await Company.findById(companies);

    if (!student || !company) {
      return res.status(400).send('Student or Company does not exist');
    }

    // Create the interview
    const interview = await Interview.create({
      date: date,
      starttime: starttime,
      students: students,
      companies: companies,
      // Use the provided result or set to 'pending' by default
    });

    // Push the interview ID to the student's interviews array
    await Student.updateOne({ _id: students }, { $push: { interviews: interview._id } });
    company.save();
    student.save();
    req.flash('success', 'Successfully created');
    return res.redirect('back');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating interview');
  }
};

// Module for rendering the list of interviews
module.exports.listOfInterviews = async function (req, res) {
  try {
    const interviews = await Interview.find({}).populate('students').populate('companies').exec();
    return res.render('listOfinterview', {
      sheduleinterview: interviews
    });
  } catch (err) {
    res.status(500).send('Error fetching interviews');
  }
};

// Module for fetching a single interview by ID and rendering its details
module.exports.getInterview = async function (req, res) {
  try {
    const interview = await Interview.findById(req.params.id).populate('students').populate('companies');
    return res.render('getInterviewByIds', {
      title: "Update Interview",
      interviewinfo: interview
    });
  } catch (err) {
    console.error('Error retrieving interview details:', err);
    return res.status(500).json({ error: 'An error occurred while retrieving interview details' });
  }
};

// Module for updating an interview result
module.exports.update = async function (req, res) {
  try {
    const interview = await Interview.findByIdAndUpdate(req.params.id);
    interview.result = req.body.result;

    // Assuming 'pass' is the value that means the student has passed the interview
    if (req.body.result === 'pass') {
      // Update the status field of the student to 'placed'
      await Student.findByIdAndUpdate(interview.students, { status: 'placed' });
    }

    interview.save();
    req.flash('success', 'Successfully updated');
    return res.redirect('back');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

// Module for deleting an interview
module.exports.destroyInterview = async function (req, res) {
  try {
    const interviewId = req.params.id;

    // Find the interview to get the associated student ID
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      req.flash('error', 'Interview not found');
      return res.redirect('back');
    }

    const studentId = interview.students;

    // Now, delete the interview from the 'interview' schema
    await Interview.findByIdAndRemove(interviewId);

    // Remove the interview ID from the student's 'interviews' array
    await Student.updateOne({ _id: studentId }, { $pull: { interviews: interviewId } });

    req.flash('success', 'Successfully deleted');
    return res.redirect('back');
  } catch (err) {
    console.error('Error deleting interview:', err);
    req.flash('error', 'An error occurred while deleting the interview');
    res.redirect('back');
  }
};

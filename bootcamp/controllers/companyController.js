// Import the Company model
const Company = require('../models/companySchema');

// Module to render the company page for adding a new company
module.exports.renderCompanyPage = function (req, res) {
  return res.render('addCompany');
};

// Module for adding a new company
module.exports.addCompany = async function (req, res) {
  try {
    // Check if the company already exists based on the company name (email field in this case)
    const existingCompany = await Company.findOne({ email: req.body.name });

    if (!existingCompany) {
      // If the company does not exist, create a new one with the request body data
      const newCompany = await Company.create(req.body);
      req.flash('success', 'Successfully created');
      return res.redirect('back');
    } else {
      // If the company already exists, display an error message
      req.flash('error', 'Failed');
      return res.redirect('back');
    }
  } catch (err) {
    console.error('Error retrieving creating company:', err);
    return res.status(500).json({ error: 'An error occurred while retrieving creating company' });
  }
};

// Module to display the list of companies
module.exports.displayListOfCompany = async function (req, res) {
  try {
    // Find all companies and render the 'listOfCompany' view with the companies data
    const companies = await Company.find({});
    return res.render('listOfCompany', {
      company: companies,
    });
  } catch (err) {
    console.error('Error retrieving rendering company:', err);
    return res.status(500).json({ error: 'An error occurred while retrieving company' });
  }
};

// Module for deleting a company
module.exports.destroyCompany = async function (req, res) {
  try {
    // Find the company by ID and remove it from the database
    const deletedCompany = await Company.findByIdAndRemove(req.params.id);
    if (!deletedCompany) {
      // If the company is not found, display an error message
      req.flash('error', 'Error in deleting');
      return res.status(404).json({ message: 'Company not found' });
    }
    // If the company is successfully deleted, display a success message
    await deletedCompany.deleteOne();
    req.flash('success', 'Successfully deleted');
    return res.redirect('back');
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'An error occurred while deleting the student' });
  }
};

Placement Cell Web Application

This is a web application for managing placement-related activities for a college or institution. It follows the MVC (Model-View-Controller) architecture, allowing administrators, employees, and students to manage company information, student profiles, interviews, and job listings.

Features
User authentication and authorization using Passport.js
Add, update, and delete company information
Add, update, and delete student profiles
Schedule and manage interviews between companies and students
Export student data to CSV
Fetch real-time job listings using external APIs
Responsive and minimalistic design


Technologies Used
Node.js
Express.js
MongoDB with Mongoose
Passport.js for authentication
EJS templating engine for views
ExcelJS for exporting data to CSV
HTML, CSS, and JavaScript for frontend




Usage
Register as an employee to access the placement cell features.
Add company information by navigating to /company/renderComanyPage.
Add student profiles by navigating to /students/renderStudentForm.
Schedule interviews by navigating to /interview/renderInterviewsPage.
View lists of companies, students, interviews, etc., through the respective routes.
Sign out by navigating to /employees/signout


Folder Structure
-assets/
-config/
- models/
  - CompanySchema.js
  - InterviewSchema.js
  - ResultSchema.js
  - StudentSchema.js
- controllers/
  - companyController.js
  - employeeontroller.js
  - interviewController.js
  - studentController.js
- routes/
  - companyRoutes.js
  - employeeRoutes.js
  - index.js
  - interviewRoutes.js
  - studentRoutes.js
- views/
  - -header
  - addCompany.ejs
  - addInterview.ejs
  - dispalyStudentsList.ejs
  - employeeProfile.ejs
  - employeeSignin.ejs
  - employeeSignin.ejs
  - employeeSignup.ejs
  - layouts.ejs etc


- app.js (main application file)


Dependencies

Express.js: Web application framework for Node.js.
Mongoose: MongoDB object modeling for Node.js.
EJS: Embedded JavaScript templates for views.






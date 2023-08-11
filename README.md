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

# Application Images

# signup page
![Screenshot (31)](https://github.com/manojkalyan/PlacementCell/assets/70328306/920beb15-4f3d-4f48-9f3b-db1726751c49)
# login page
![Screenshot (32)](https://github.com/manojkalyan/PlacementCell/assets/70328306/2b7e45ad-ab25-4022-8557-bd5ec365a8bf)
# if password missmatch shows popup message
![Screenshot (33)](https://github.com/manojkalyan/PlacementCell/assets/70328306/80a2c387-2012-431c-9fb2-6b31fa90ac97)

# home page
![Screenshot (35)](https://github.com/manojkalyan/PlacementCell/assets/70328306/eac7f6d1-90fb-4f77-b25e-cc892637d499)
# Add student Page
![Screenshot (36)](https://github.com/manojkalyan/PlacementCell/assets/70328306/7f4f082c-7b48-42cb-aab0-6b9cbac56088)
# list of students page

![Screenshot (37)](https://github.com/manojkalyan/PlacementCell/assets/70328306/69ae3466-58a0-42e4-9055-72e271d747ea)
# add Interview page

![Screenshot (38)](https://github.com/manojkalyan/PlacementCell/assets/70328306/7dde49a9-86ef-41cf-9937-0c021d5687a6)
#list of interview page
![Screenshot (37)](https://github.com/manojkalyan/PlacementCell/assets/70328306/ad3fb88f-5949-411c-9c78-15abf69d23b0)
# update interview page
![Screenshot (41)](https://github.com/manojkalyan/PlacementCell/assets/70328306/09f3af05-e06b-404a-985d-493b3a9cf831)
# add company page
![Screenshot (42)](https://github.com/manojkalyan/PlacementCell/assets/70328306/bc19d0d2-7aba-48be-af58-356da2ea12c5)

# list of company

![Screenshot (43)](https://github.com/manojkalyan/PlacementCell/assets/70328306/71601335-4d06-4c48-8b17-742d8a975ece)
# employee update page


![Screenshot (44)](https://github.com/manojkalyan/PlacementCell/assets/70328306/d1b09e49-de1c-4da7-9c7d-864c4eb1c6c2)





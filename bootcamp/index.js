// Import required modules
const express = require('express');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const axios = require('axios');

// Create an instance of the Express application
const app = express();
const port = 7005;

// Import Express layouts, custom middleware, JSON to CSV converter, file system, and path modules
const expressLayouts = require('express-ejs-layouts');
const costumMware = require('./config/middleware');
const json2csv = require('json2csv').parse;
const fs = require('fs');
const path = require('path');

// Import and connect to MongoDB using Mongoose
const mongodb = require('./config/mongoose');

// Set up Express middleware
app.use(express.urlencoded()); // Parse incoming request bodies
app.use(cookieParser()); // Parse cookies
app.use(expressLayouts); // Use EJS layouts for rendering views
app.use(express.static('./assets')); // Serve static files from the 'assets' directory
app.set('layout extractStyles', true); // Extract and include CSS styles from EJS views

// Set up and configure Express session
const session = require('express-session');
const passport = require('passport');
const pasportLocal = require('./config/passportLocal');
const MongoDBStore = require('connect-mongodb-session')(session); // Used for MongoDBStore

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', './views'); // Set the views directory

// Create a new MongoDBStore for session storage
const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1/carearecamp_placementcell', // Update with your MongoDB connection URI
  collection: 'sessions'
});

// Catch errors in the MongoDBStore
store.on('error', function (error) {
  console.log(error);
});

// Set up session middleware
app.use(
  session({
    secret: 'blah', // Secret key used to sign the session ID cookie
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 1000 // Set the maximum age of the session to 1 hour (in milliseconds)
    },
    store: store // Use the MongoDBStore for session storage
  })
);

app.use(passport.initialize()); // Tell the app to use passport for authentication
app.use(passport.session()); // Set up session-based authentication using passport
app.use(passport.setAuthenticationuser); // Custom middleware to set authenticated user information

app.use(flash()); // Flash messages middleware for displaying flash messages
app.use(costumMware.setflash); // Custom middleware to set flash messages in the response

// Set up routes using the exported router from ./routes
app.use('/', require('./routes'));

// Start the server on the specified port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server on port: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});

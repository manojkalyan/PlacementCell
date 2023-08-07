const User = require('../models/employeeSchema');

// Module to get employee profile by ID
module.exports.Profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render('employeeProfile', {
      title: "User Profile",
      profile_user: user
    });
  } catch (err) {
    console.error('Error retrieving user profile:', err);
    return res.status(500).json({ error: 'An error occurred while retrieving user profile' });
  }
};

// Module for rendering the signup page
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/employees/home');
  }
  console.log(__dirname);
  return res.render("employeeSignup");
};

// Module for creating a new user (sign up)
module.exports.Create = async function (req, res) {
  if (req.body.password != req.body.confirmpassword) {
    req.flash('error', 'Check email or password');
    return res.redirect('back');
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = await User.create(req.body);
      req.flash('success', 'Successfully created');
      return res.redirect('/employees/signin');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in finding or creating user:', err);
    return res.status(500).send('Internal Server Error');
  }
};

// Module for rendering the signin page
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/employees/home');
  }
  return res.render("employeeSignin");
};

// Module to create a user session upon successful signin
module.exports.create_session = async function (req, res) {
  req.flash('success', 'Login success');
  return res.redirect("home");
};

// Module for rendering the home page with all users
module.exports.home = async function (req, res) {
  try {
    const users = await User.find({});
    return res.render('home', {
      title: 'manoj',
      all_users: users
    });
  } catch (err) {
    console.error('Error retrieving posts or users:', err);
    return res.status(500).json({ error: 'An error occurred while retrieving posts or users' });
  }
};

// Module for destroying the user session (sign out)
module.exports.destroysession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Successfully signout');
    res.redirect('/');
  });
};

// Module for updating user information
module.exports.update = async function (req, res) {
  try {
    if (req.user.id == req.params.id) {
      let user = await User.findByIdAndUpdate(req.params.id);
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      user.save();
      req.flash('success', 'Successfully updated');
      return res.redirect('back');
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

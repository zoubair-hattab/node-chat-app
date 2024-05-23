const { createUser, login } = require('../models/auth.model');
const validatorInput = require('express-validator').validationResult;

/**--------------------------Registration Part Starts ------------------------ */
exports.getRegister = (req, res, next) => {
  const errorInRegistration = req.flash('errorInRegistration')[0];
  const validatorInput = req.flash('validatorInput');
  res.render('register', {
    pageTitle: 'Register Page',
    errorInRegistration,
    validatorInput,
    auth: req.session.userId,
  });
};

exports.register = (req, res, next) => {
  if (validatorInput(req).isEmpty()) {
    createUser(req.body)
      .then(() => {
        res.redirect(301, '/login');
      })
      .catch((error) => {
        res.redirect(301, '/register');
        req.flash('errorInRegistration', error);
      });
  } else {
    req.flash('validatorInput', validatorInput(req).array());
    res.redirect(301, '/register');
  }
};
/**--------------------------Registration Part Ends ------------------------ */

/**--------------------------Login Part Starts ------------------------ */
exports.getLoginPage = (req, res, next) => {
  const errorInLogin = req.flash('errorInLogin')[0];
  const validatorInput = req.flash('validatorInput');
  res.render('login', {
    pageTitle: 'Login Page',
    errorInLogin,
    validatorInput,
    auth: req.session.userId,
  });
};

exports.postLogin = (req, res, next) => {
  if (validatorInput(req).isEmpty()) {
    login(req.body)
      .then((user) => {
        req.session.userId = user._id;
        res.redirect(301, '/');
      })
      .catch((error) => {
        res.redirect(301, '/login');
        req.flash('errorInLogin', error);
      });
  } else {
    res.redirect('/login');
    req.flash('validatorInput', validatorInput(req).array());
  }
};
/**--------------------------Login Part Ends ------------------------ */

/**--------------------------Logout Part Starts ------------------------ */
exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
/**--------------------------Logout Part Ends ------------------------ */

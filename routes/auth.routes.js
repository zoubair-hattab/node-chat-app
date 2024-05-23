const {
  getRegister,
  register,
  postLogin,
  getLoginPage,
  logout,
} = require('../controllers/auth.controllers');
const { notAuth } = require('../middleware/auth.meddleware');
const check = require('express-validator').check;
const router = require('express').Router();
router.post(
  '/register',
  check('username').not().isEmpty().withMessage('Username is required'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('invalid fromat email.'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password at least 8 caracters.'),
  check('confirmPassword').custom((value, { req }) => {
    if (value == req.body.password) {
      return true;
    } else throw 'password doesnot match';
  }),

  register
);
router.get('/register', notAuth, getRegister);

router.post(
  '/login',
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('invalid fromat email.'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password at least 8 caracters.'),
  postLogin
);
router.get('/login', notAuth, getLoginPage);
router.all('/logout', logout);

module.exports = router;

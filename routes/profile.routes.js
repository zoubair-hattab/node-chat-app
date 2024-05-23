const {
  getProfile,
  getPageEdit,
} = require('../controllers/profile.controllers');
const { isAuth } = require('../middleware/auth.meddleware');

const router = require('express').Router();
router.get('/', isAuth, getProfile);

router.get('/:id', isAuth, getProfile);

router.get('/edit/:id', isAuth, getPageEdit);

module.exports = router;

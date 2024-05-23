const { getHome } = require('../controllers/home.controllers');

const router = require('express').Router();
router.get('/', getHome);
module.exports = router;

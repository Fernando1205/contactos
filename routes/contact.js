const express = require('express');
const { home } = require('../controllers/contactController');
const router = express.Router();

router.get('/', home);

module.exports = router;
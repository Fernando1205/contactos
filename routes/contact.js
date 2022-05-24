const express = require('express');
const { home, store, list } = require('../controllers/contactController');
const router = express.Router();

router.get('/', home);
router.get('/list', list);
router.post('/', store);

module.exports = router;
const express = require('express');
const { home, store, list, update } = require('../controllers/contactController');
const router = express.Router();

router.get('/', home);
router.get('/list', list);
router.post('/', store);
router.put('/:id', update);

module.exports = router;
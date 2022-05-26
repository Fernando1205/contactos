const express = require('express');
const { home, store, list, update, destroy } = require('../controllers/contactController');
const router = express.Router();

router.get('/', home);
router.get('/list', list);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
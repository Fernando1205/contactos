const express = require('express');
const { home, store, list, update, destroy } = require('../controllers/contactController');
const router = express.Router();

const { body } = require('express-validator');
const verificarUser = require('../middleware/verificarUser');

router.get('/', verificarUser, home);
router.get('/list', list);

router.post('/', verificarUser, [
    body('name', 'El nombre es requerido').trim().notEmpty().escape(),
    body('lastname', 'El apellido es requerido').trim().notEmpty().escape(),
    body('email', 'El apellido es requerido').trim().isEmail().normalizeEmail(),
    body('phone', 'El apellido es requerido').trim().isNumeric().escape()
], store);

router.put('/:id', verificarUser, [
    body('name', 'El nombre es requerido').trim().notEmpty().escape(),
    body('lastname', 'El apellido es requerido').trim().notEmpty().escape(),
    body('email', 'El apellido es requerido').trim().isEmail().normalizeEmail(),
    body('phone', 'El apellido es requerido').trim().isNumeric().escape()
], update);

router.delete('/:id', verificarUser, destroy);

module.exports = router;
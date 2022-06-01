const express = require('express');
const { register, login, registerPost } = require('../controllers/authController');
const router = express.Router();

const { body } = require('express-validator');
const User = require('../models/User');

router.get('/register', register);
router.post('/register', [
    body('name', 'El campo nombre es requerido').trim().escape().notEmpty(),
    body('lastname', 'El campo apellido es requerido').trim().escape().notEmpty(),
    body('email', 'El campo email es requerido').notEmpty().isEmail().normalizeEmail().custom(async(value) => {

        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('El email ya existe');
        }
        return true;
    }),
    body('password', 'El campo contraseña es requerido').notEmpty().
    isLength(6).withMessage('La contraseña debe tener minimo 6 caracteres')
    .escape().custom((value, { req }) => {

        if (value !== req.body.confPassword) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    })
], registerPost);
router.get('/login', login);

module.exports = router;
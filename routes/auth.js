const express = require('express');
const { register, login, registerPost, loginPost } = require('../controllers/authController');
const router = express.Router();
const bcrypt = require('bcrypt');

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
router.post('/login', [
    body('email', 'El campo email es requerido').notEmpty().isEmail().normalizeEmail().custom(async(value) => {

        const user = await User.findOne({ email: value });

        if (!user) {
            throw new Error('El email no existe')
        }
        return true;

    }),
    body('password', 'El campo contraseña es requerido').notEmpty().
    isLength(6).withMessage('La contraseña debe tener minimo 6 caracteres').escape().custom(async(value, { req }) => {

        const user = await User.findOne({ email: req.body.email });
        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            throw new Error('Contraseña incorrecta');
        }

        return true;

    })
], loginPost);

module.exports = router;
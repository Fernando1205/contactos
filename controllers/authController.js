const mongoose = require('mongoose');
const User = require("../models/User");

const { validationResult } = require('express-validator');

const register = async(req, res) => {
    res.render('auth/register');
};

const registerPost = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {

        const user = await User.findOne({ email });

        if (user) throw new Error('El email ya existe');

        const newUser = User(req.body);
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Registrado exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ errors: error.message });
    }
}

const login = async(req, res) => {
    res.render('auth/login');
}

const loginPost = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) throw new Error('No existe el email');

        if (!await user.comparePassword(password)) throw new Error('Contraseña incorrecta');

        // Crea sesion de usuario a traves de passport
        req.login(user, function(err) {
            if (err) {
                console.log(err);
                throw new Error('Error al crear sesion');
            }
            // return res.redirect();
            res.status(200).json({
                success: true,
                message: 'Login correcto'
            });
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({ errors: error.message });
    }
}

module.exports = {
    register,
    registerPost,
    login,
    loginPost
}
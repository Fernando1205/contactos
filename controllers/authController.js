const mongoose = require('mongoose');
const User = require("../models/User");
const { nanoid } = require('nanoid');
const nodemailer = require('nodemailer');
const { mailUser, mailPass } = require('../config/config');

const { validationResult } = require('express-validator');

const register = async(req, res) => {
    res.render('auth/register', { mensajes: req.flash('mensajes') });
};

const registerPost = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastname, email, password } = req.body;
    try {

        const user = await User.findOne({ email });

        if (user) throw new Error('El email ya existe');

        const newUser = User({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            userToken: nanoid(6)
        });
        await newUser.save();

        // ENVIO DE EMAIL PARA CONFIRMAR CUENTA
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: mailUser,
                pass: mailPass
            }
        });

        // send mail with defined transport object
        await transport.sendMail({
            from: '"Fernando 👻" <fer@example.com>', // sender address
            to: newUser.email, // list of receivers
            subject: "Verificar cuenta", // Subject line
            text: "Verificar cuenta", // plain text body
            html: `<a href="http://127.0.0.1:3001/auth/verificarCuenta/${newUser.userToken}">Verificar cuenta</a>`
        });

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
    res.render('auth/login', { mensajes: req.flash('mensajes') });
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

        if (user.countConfirm !== true) throw new Error('Cuenta no validad');

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

const logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
    });
    return res.redirect('/auth/login');
}

const verificarCuenta = async(req, res) => {

    let { token } = req.params

    try {
        const user = await User.findOne({ userToken: token });

        if (!user) throw new Error('El usuario no se encuentra en nuestros registros');

        await User.findByIdAndUpdate(user._id, { countConfirm: true });

        req.flash('mensajes', { msg: "Cuenta verificada" });

        return res.redirect('/auth/login');

    } catch (error) {
        req.flash('mensajes', { msg: "Hubo un problema al verificar cuenta, intente mas tarde" });
        return res.redirect('/auth/register');
    }
}

module.exports = {
    register,
    registerPost,
    login,
    loginPost,
    logout,
    verificarCuenta
}
const mongoose = require("mongoose");
const Contact = require("../models/Contact");

const { validationResult } = require('express-validator');

const home = async(req, res) => {
    try {
        let user = req.user;
        let contacts = await Contact.find({ user: req.user.id }).lean();
        res.render('home', { contacts, user });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const list = async(req, res) => {
    try {
        let contacts = await Contact.find({ user: req.user.id });
        res.status(200).send(contacts);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}

const store = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    try {
        const contact = Contact(req.body);
        await contact.save();
        res.status(201).send({
            success: true,
            message: 'Registro guardado exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const update = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    try {
        let { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) throw new Error('El contacto no existe');
        await Contact.findByIdAndUpdate(id, req.body);
        res.status(200).send({ success: true, message: 'Actualizado correctamente' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
}

const destroy = async(req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) throw new Error('El contacto no existe');
        await Contact.findByIdAndDelete(id);
        res.status(200).send({ message: 'Eliminado correctamente' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
}

module.exports = {
    home,
    store,
    list,
    update,
    destroy
}
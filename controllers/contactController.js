const mongoose = require("mongoose");
const Contact = require("../models/Contact");

const home = async(req, res) => {
    try {
        let contacts = await Contact.find().lean();
        res.render('home', { contacts });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const store = async(req, res) => {
    try {
        const contact = Contact(req.body);
        await contact.save();
        console.log('guardado');
        res.status(201).send({
            success: true,
            message: 'Registro guardado exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const list = async(req, res) => {
    try {
        let contacts = await Contact.find();
        res.status(200).send(contacts);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}

module.exports = {
    home,
    store,
    list
}
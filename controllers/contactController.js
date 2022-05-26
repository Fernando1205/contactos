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

const list = async(req, res) => {
    try {
        let contacts = await Contact.find();
        res.status(200).send(contacts);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}

const store = async(req, res) => {
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
    try {
        let { id } = req.params;
        await Contact.findByIdAndUpdate(id, req.body);
        res.status(200).send({ message: 'Actualizado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

const destroy = async(req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).send({ message: 'Eliminado correctamente' });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = {
    home,
    store,
    list,
    update,
    destroy
}
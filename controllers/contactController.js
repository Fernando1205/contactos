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

module.exports = {
    home
}
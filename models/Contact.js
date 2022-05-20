const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
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
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
});

UserSchema.pre('save', async function(next) {

    const user = this;

    if (!user.isModified('password')) return next;

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
    } catch (error) {
        console.log(error);
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
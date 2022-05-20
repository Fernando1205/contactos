const mongoose = require('mongoose');
const { url } = require('./config');

mongoose.connect(url)
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(err => console.log(err));
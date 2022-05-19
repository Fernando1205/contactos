const express = require('express');
const { port } = require('./config/config');

const app = express();

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('Hola mundo');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port} 🚀`);
})
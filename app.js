const express = require('express');
const { create } = require('express-handlebars');
const { port } = require('./config/config');

const app = express();
const hbs = create({
    extname: ".hbs",
    partialsDir: __dirname + '/views/partials/'
});

// Handlebars engine
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port} 🚀`);
})
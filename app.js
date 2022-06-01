require('./config/db');

const express = require('express');
const { create } = require('express-handlebars');
const { port } = require('./config/config');

const app = express();
const hbs = create({
    extname: ".hbs",
    partialsDir: __dirname + '/views/partials/',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

// Handlebars engine
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/contact'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port} 🚀`);
})
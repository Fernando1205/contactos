require('dotenv').config();

const port = process.env.PORT;
const url = process.env.URL;

module.exports = { port, url };
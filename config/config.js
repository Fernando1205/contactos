require('dotenv').config();

const port = process.env.PORT;
const url = process.env.URL;
const mailUser = process.env.MAILUSER;
const mailPass = process.env.MAILPASS;

module.exports = { port, url, mailUser, mailPass };
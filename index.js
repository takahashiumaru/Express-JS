const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = `${process.env.PORT_DB}`;
const HOST = `${process.env.HOST_DB}`;
const USER = `${process.env.USER_DB}`;
const PASSWORD = `${process.env.PASSWORD_DB}`;
const DATABASE = `${process.env.DATABASE_DB}`;

console.log(`Database Host :: ${HOST}`)
console.log(`Database Port :: ${PORT}`)
console.log(`Database Username :: ${USER}`)
console.log(`Database Password :: ${PASSWORD}`)
console.log(`Database Name :: ${DATABASE}`)

module.exports = {
    multipleStatements: true,
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: PORT
};

const db = require("./src/model/index");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const appRoute = require('./src/routes/user');

app.use('/', appRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server Berjalan di Port : ${port}`);
});
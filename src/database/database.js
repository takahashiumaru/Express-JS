const dotenv = require('dotenv');
const mysql = require('mysql');
const config = require("../../index");
// configraration with env. 
dotenv.config();
module.exports = mysql.createConnection({
    multipleStatements: true,
    host: config.PORT,
    user: `${process.env.USER_DB}`,
    password: `${process.env.PASSWORD_DB}`,
    database: `${process.env.DATABASE_DB}`,
    port: `${process.env.PORT_DB}`
});

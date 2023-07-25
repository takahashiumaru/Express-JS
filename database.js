require('dotenv').config();
const PORT = `${process.env.PORT_DB}`;
const HOST = `${process.env.HOST_DB}`;
const USER = `${process.env.USER_DB}`;
const PASSWORD = `${process.env.PASSWORD_DB}`;
const DATABASE = `${process.env.DATABASE_DB}`;

module.exports = {
    multipleStatements: true,
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: PORT
};
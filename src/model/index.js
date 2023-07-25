const dbConfig = require("../../index");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    operatorsAliases: false,
    host: dbConfig.host,
    dialect: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};
console.log("Nilai PASSWORD_DB:", process.env.PASSWORD_DB);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.query = require("./user-model")(sequelize, Sequelize);

module.exports = db;
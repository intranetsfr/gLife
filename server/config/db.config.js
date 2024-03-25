
const config = process.env;
//config.HOST
const SQLite = require("sqlite3");
module.exports = {
    HOST: config.DB_HOST,
    USER: config.DB_USER,
    PASSWORD: config.DB_PASSWORD,
    DB: config.DB_DATABASE,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
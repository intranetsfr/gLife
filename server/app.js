var createError = require('http-errors');
require("dotenv").config();
const express = require('express');
const cors = require("cors");

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();


app.use(cors({origin: [process.env.URL]}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();});
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

const db = require("./models");
db.sequelize.sync()
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });


require("./routes/sphere.routes")(app);


app.use((req, res, next) => {
  
    next();
});
module.exports = app;
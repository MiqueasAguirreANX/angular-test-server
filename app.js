var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');

var projectsRouter = require('./routes/projects');

var mysql = require('mysql');
require('dotenv').config()
var app = express();

var db = mysql.createConnection ({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'angulartest'
});

db.connect((err)=>{
    if (err) {
        console.log("Error al conectarse a mysql");
    }
    console.log("Connected again!");

    db.query(`CREATE TABLE projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(80),
        description VARCHAR(160),
        createdAt DATE,
        manager VARCHAR(80),
        assignedTo VARCHAR(80),
        status VARCHAR(80)
    )`, (err, result) =>{
        if (err) console.log(err)
        if (!err) console.log(result);
    })
})
global.db = db;

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/projects', projectsRouter);

module.exports = app;

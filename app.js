var express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');
require('dotenv').config()

const PORT = process.env.PORT || 3050;
var mysql = require('mysql');
var app = express();

var db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'testuser1234',
    database: 'angulartest'
});

// open the MySQL connection
db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
    db.query(`CREATE TABLE projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(80),
        description VARCHAR(160),
        createdAt DATE,
        manager VARCHAR(80),
        assignedTo VARCHAR(80),
        status VARCHAR(80))`, (err)=>{
            if (err) console.log(err)
            else console.log("No errors")
        })
});
  
   
/*
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80),
    description VARCHAR(160),
    createdAt DATE,
    manager VARCHAR(80),
    assignedTo VARCHAR(80),
    status VARCHAR(80)
*/
global.db = db; 

app.use(cors())  
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var projectsRouter = require('./routes/projects');
 
app.get("/", (req, res) => {
    res.send("ANGULAR API")
})  
app.use('/projects', projectsRouter);
 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

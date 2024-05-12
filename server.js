const express = require("express");
const fs = require("fs");
const mysql = require("mysql");


//Create Connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root123",
    database: "typingtestDB"
});

// Connect
db.connect(err => {
    if(err) throw err;
    console.log("MySql Connected");
});

// Init App

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/setup", (req, res) => {
    let sqlCheck = 'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "typingtestDB"';
    db.query(sqlCheck, (err, result) => {
        if (err) {
            return res.status(500).send('Error checking for database: ' + err.message);
        }
        if (result.length > 0) {
            return res.send("Database already exists.");
        }
        let sqlCreate = 'CREATE DATABASE typingtestDB';
        db.query(sqlCreate, (err, result) => {
            if (err) {
                return res.status(500).send('Error creating database: ' + err.message);
            }
            res.send("Database created successfully.");
        });
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
})



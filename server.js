const express = require('express');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();
// load environment variables

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
})


app.get('/', (req, res) => {
res.send('Hello World');
});


app.get('/test', (req, res) => {
    con.query('SELECT * FROM tbl_user', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    })
})




app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
})
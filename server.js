const express = require('express');
var app = express();
const mysql = require('mysql2');
require('dotenv').config();
var bodyParser = require('body-parser');
// load environment variables


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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


app.post('/login', (req, res) => {
    var post_data = req.body;
    var { mail, surname, givenName, id } = post_data;


    con.query('SELECT * FROM tbl_user where email = ?', [mail], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0){
            res.json({status: 200, message: 'User Exist'});
        } else{
            con.query('INSERT INTO tbl_user (user_id, email, l_name, f_name) VALUES (?, ?, ?, ?)', [id,mail, surname, givenName], (err, rows) => {
                if (err) throw err;
                res.json({status: 200, message: 'User Created'});
            })
        }
    })

})


app.get('/test', (req, res) => {
    con.query('SELECT * FROM tbl_user', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    })
})




app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
})
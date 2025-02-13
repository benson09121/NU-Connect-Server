const express = require('express');
var app = express();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
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


const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.userId = decoded.id;
      next();
    });
  };


app.get('/', (req, res) => {
res.send('Hello World');
});


function getUser(mail, callback){
    con.query('SELECT * FROM tbl_user where email = ?', [mail], (err, rows) => {
        if (err) return callback(err);
        callback(null, rows);
    });
}

function generateToken(email){
    con.query('SELECT * FROM tbl_user where email = ?', [email], (err, rows) => {
        if (err) throw err;
        const { user_id, email, f_name, l_name } = rows[0];
        const result = { user_id, email, f_name, l_name };
        return jwt.sign({ result }, process.env.JWT_SECRET, { expiresIn: '7d' });
    });
}

app.post('/api/mobile/login', (req, res) => {
    var post_data = req.body;
    var { mail, surname, givenName, id } = post_data;

    getUser(mail, (err, result) => {
        if (err) throw err;
        if (result.length > 0){
            console.log(result);
            const token = generateToken(result[0].email);
            res.json({ status: 200, message: "User Authenticated", token: token });
        } else {
            con.query('INSERT INTO tbl_user (user_id, email, l_name, f_name) VALUES (?, ?, ?, ?)', [id, mail, surname, givenName], (err, rows) => {
                if (err) throw err;
                const token = generateToken(mail);
                res.json({ status: 200, message: 'User Created', token: token });
            });
        }
    });
})


app.get('/test', (req, res) => {
    con.query('SELECT * FROM tbl_user', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    })
})




app.listen(3000, () => {
    console.log('NU-Connect server is Running~~~');
})
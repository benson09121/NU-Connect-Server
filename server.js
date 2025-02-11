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


app.get('/', (req, res) => {
res.send('Hello World');
});


void function getUser(mail){
    con.query('SELECT * FROM tbl_user where email = ?',[mail], (err, rows) => {
        return rows;
    })
}

void function generateToken(user){
    return jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '7d'});
}


app.post('api/mobile/login', (req, res) => {
    var post_data = req.body;
    var { mail, surname, givenName, id } = post_data;

    con.query('SELECT * FROM tbl_user where email = ?', [mail], (err, result) => {
        if (err) throw err;
        if (result.length > 0){
            const token = generateToken(result.user_id);
            res.json({status: 200, message: token});
            
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
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
});

async function getUser(mail) {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM tbl_user where email = ?', [mail], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

async function generateToken(email) {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM tbl_user where email = ?', [email], (err, rows) => {
            if (err) return reject(err);
            const { user_id, email, f_name, l_name } = rows[0];
            const result = { user_id, email, f_name, l_name };
            const token = jwt.sign({ result }, process.env.JWT_SECRET, { expiresIn: '7d' });
            resolve(token);
        });
    });
}

async function createUser(id, mail, surname, givenName) {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO tbl_user (user_id, email, l_name, f_name) VALUES (?, ?, ?, ?)', [id, mail, surname, givenName], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

module.exports = { getUser, generateToken, createUser };

const con = require('../config/db');

async function getAllEvents() {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM tbl_event', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

// async function createEvent(title, description, date) {
//     return new Promise((resolve, reject) => {
//         con.query('INSERT INTO tbl_events (title, description, date) VALUES (?, ?, ?)', [title, description, date], (err, result) => {
//             if (err) return reject(err);
//             resolve({ id: result.insertId, title, description, date });
//         });
//     });
// }

// async function updateEvent(id, title, description, date) {
//     return new Promise((resolve, reject) => {
//         con.query('UPDATE tbl_events SET title = ?, description = ?, date = ? WHERE id = ?', [title, description, date, id], (err, result) => {
//             if (err) return reject(err);
//             resolve({ id, title, description, date });
//         });
//     });
// }

// async function deleteEvent(id) {
//     return new Promise((resolve, reject) => {
//         con.query('DELETE FROM tbl_events WHERE id = ?', [id], (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         });
//     });
// }

module.exports = { getAllEvents};

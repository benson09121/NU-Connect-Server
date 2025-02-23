const con = require("../config/db");

async function getAllEvents() {
  return new Promise((resolve, reject) => {
    con.query(
      'SELECT a.event_id, a.title, a.description, a.start_time, a.end_time, a.date, a.created_at, b.f_name, b.l_name FROM tbl_event a INNER JOIN tbl_user b ON a.user_id = b.user_id',
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

async function createEvent(
  user_id,
  title,
  description,
  venue,
  date,
  start_time,
  end_time
) {
  return new Promise((resolve, reject) => {
    con.query(
      "INSERT INTO tbl_event (user_id, title, description, venue, date, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user_id, title, description, venue, date, start_time, end_time],
      (err, result) => {
        if (err) return reject(err);
        resolve({
          title,
          description,
          venue,
          date,
          start_time,
          end_time,
        });
      }
    );
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

module.exports = { getAllEvents, createEvent };

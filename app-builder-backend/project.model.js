const db = require('./db');

class Project {
  static create(userId, name, code, callback) {
    db.run('INSERT INTO projects (userId, name, code) VALUES (?, ?, ?)', [userId, name, code], function (err) {
      callback(err, { id: this.lastID, userId, name, code });
    });
  }

  static findByUserId(userId, callback) {
    db.all('SELECT * FROM projects WHERE userId = ?', [userId], (err, rows) => {
      callback(err, rows);
    });
  }

  static update(id, name, code, callback) {
    db.run('UPDATE projects SET name = ?, code = ? WHERE id = ?', [name, code, id], function (err) {
      callback(err, { id, name, code });
    });
  }

  static delete(id, callback) {
    db.run('DELETE FROM projects WHERE id = ?', [id], function (err) {
      callback(err);
    });
  }
}

module.exports = Project;
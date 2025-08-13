const db = require('./db');

class User {
  static create(username, password, callback) {
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function (err) {
      callback(err, { id: this.lastID, username });
    });
  }

  static findByUsername(username, callback) {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      callback(err, row);
    });
  }
}

module.exports = User;
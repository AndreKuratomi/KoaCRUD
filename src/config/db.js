const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/config/database.sqlite", (err) => {
  if (err) {
    console.error(err);
  }

  db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cpf TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        nome TEXT NOT NULL
    )`
  );
  // console.log(db);
});

module.exports = db;

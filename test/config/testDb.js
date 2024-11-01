const sqlite3 = require("sqlite3").verbose();

const testDb = new sqlite3.Database(':memory:');

const initializeTestDb = () => {
  return new Promise((resolve, reject) => {    
    testDb.serialize(() => {
      testDb.run(
        `
        CREATE TABLE IF NOT EXISTS test_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          age INTEGER NOT NULL,
          cpf TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL,
          nome TEXT NOT NULL
        )
        `,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  });
};

module.exports = { testDb, initializeTestDb };


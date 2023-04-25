const db = require("../config/db");

const usersList = async (ctx) => {
  const query = "SELECT * FROM users";
  await new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
        ctx.body = err;
        ctx.status = 400;
      }
      resolve(rows);
      ctx.body = rows;
      ctx.status = 200;
    });
  });
};

module.exports = usersList;

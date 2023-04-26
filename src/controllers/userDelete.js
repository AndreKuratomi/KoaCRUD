const db = require("../config/db");

const userDelete = async (ctx) => {
  try {
    const { id } = ctx.params;

    const findQuery = `SELECT * FROM users WHERE id = ${id}`;
    const deleteQuery = `DELETE FROM users WHERE id = ${id}`;
    // const result = db.run(query);
    // console.log(result);
    const doWeHaveThisUser = await new Promise((resolve, reject) => {
      db.all(findQuery, (err, rows) => {
        if (err) {
          reject(err);
          ctx.body = err;
          ctx.status = 400;
          return;
        }
        if (rows.length == 0) {
          reject(rows);
          ctx.body = "User not found!";
          ctx.status = 404;
          return;
        }
        resolve(rows);
        db.run(deleteQuery);
        ctx.status = 204;
        return;
      });
    });

    ctx.status = 204;
  } catch (error) {
    console.log(error);
  }
};

module.exports = userDelete;

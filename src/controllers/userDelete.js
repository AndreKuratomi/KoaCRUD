const db = require("../config/db");

const userDelete = async (ctx) => {
  try {
    const { id } = ctx.params;

    const findQuery = `SELECT * FROM users WHERE id = ${id}`;
    const deleteQuery = `DELETE FROM users WHERE id = ${id}`;

    const doWeHaveThisUser = await new Promise((resolve, reject) => {
      db.all(findQuery, (err, rows) => {
        if (rows == undefined) {
          reject(err);
          ctx.body = { message: "Invalid Id! Must be a number." };
          ctx.status = 400;
          return;
        }
        if (rows.length == 0) {
          reject(rows);
          ctx.body = { message: "User not found!" };
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

const db = require("../config/db");

const userByIdList = async (ctx) => {
  try {
    const { id } = ctx.params;

    const query = `SELECT * FROM users WHERE id = ${id}`;

    const doWeHaveThisUser = await new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
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
        ctx.body = rows;
        ctx.status = 200;
        return;
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = userByIdList;

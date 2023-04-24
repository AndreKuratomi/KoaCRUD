const db = require("../config/db");

const userByIdList = async (ctx) => {
  try {
    const { id } = ctx.params;

    const query = `SELECT * FROM users WHERE id = ${id}`;
    const result = await db.run(query);
    const doWeHaveThisUser = db.all(query, (err, rows) => {
      if (err) {
        // console.log(err);
        ctx.body = err;
        // console.log(ctx.body);
        ctx.status = 400;
      }
      console.log(rows);
      ctx.body = rows;
      ctx.status = 200;
      return;
      // console.log(ctx.body);
      // ctx.status = 200;
    });

    console.log(doWeHaveThisUser);
    if (doWeHaveThisUser === []) {
      ctx.body = "User not found!";
      ctx.status = 404;
      return;
    }

    // ctx.body = result;
  } catch (error) {
    console.log(error);
    ctx.body = "User not found!";
    ctx.status = 404;
  }
};

module.exports = userByIdList;

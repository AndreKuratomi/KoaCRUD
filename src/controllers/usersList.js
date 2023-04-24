const db = require("../config/db");

const usersList = async (ctx) => {
  const query = "SELECT * FROM users";
  var result = [];
  return db.all(query, (err, rows) => {
    if (err) {
      // console.log(err);
      ctx.body = err;
      // console.log(ctx.body);
      ctx.status = 400;
    }
    // console.log(rows);
    rows.forEach((elt) => {
      result.push(elt);
    });
    // console.log(result);

    ctx.body = result;
    ctx.status = 200;
    // return;
  });

  console.log(result);
  ctx.body = result;
  ctx.status = 200;
};
// const result = await db.all(query);

// ctx.body = result;
// ctx.status = 200;
// };

module.exports = usersList;

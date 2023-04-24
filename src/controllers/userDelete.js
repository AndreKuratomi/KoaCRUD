const db = require("../config/db");

const userDelete = async (ctx) => {
  try {
    const { id } = ctx.params;

    const query = `DELETE FROM users WHERE id = ${id}`;
    const result = db.run(query);
    console.log(result);

    ctx.status = 204;
  } catch (error) {
    console.log(error);
    ctx.body = "User not found!";
    ctx.status = 404;
  }
};

module.exports = userDelete;

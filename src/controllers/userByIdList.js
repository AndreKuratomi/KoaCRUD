const db = require("../config/db");

const userByIdList = async (ctx) => {
  const { id } = ctx.params;

  const user = db.find((elem) => elem.id === Number(id));

  if (user) {
    ctx.body = user;
    ctx.status = 200;
  } else {
    ctx.body = "User not found!";
    ctx.status = 404;
  }
};

module.exports = userByIdList;

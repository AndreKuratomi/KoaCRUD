const db = require("../config/db");

const usersList = async (ctx) => {
  ctx.body = db;
  ctx.status = 200;
};

module.exports = usersList;

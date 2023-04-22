const db = require("../config/db");

const userCreation = async (ctx) => {
  const toBeAdded = ctx.request.body;

  db.push(toBeAdded);

  ctx.body = "Data added successfully!";
  ctx.status = 201;
};

module.exports = userCreation;

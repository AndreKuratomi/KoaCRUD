const db = require("../config/db");

const userCreation = async (ctx) => {
  const toBeAdded = ctx.request.body;

  const { id, nome, cpf, email } = ctx.request.body;

  if (!nome) {
    // ctx.body = `Missing field "${}"!`;
    ctx.body = 'Missing field "nome"!';
    ctx.status = 400;
    return;
  } else if (!cpf) {
    // ctx.body = `Missing field "${}"!`;
    ctx.body = 'Missing field "cpf"!';
    ctx.status = 400;
    return;
  } else if (!id) {
    // ctx.body = `Missing field "${}"!`;
    ctx.body = 'Missing field "id"!';
    ctx.status = 400;
    return;
  } else if (!email) {
    // ctx.body = `Missing field "${}"!`;
    ctx.body = 'Missing field "email"!';
    ctx.status = 400;
    return;
  }

  db.push(toBeAdded);

  ctx.body = "Data added successfully!";
  ctx.status = 201;
};

module.exports = userCreation;

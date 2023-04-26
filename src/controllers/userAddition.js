const db = require("../config/db");

const userCreation = async (ctx) => {
  try {
    const { nome, cpf, email, age } = ctx.request.body;

    // VALIDATION
    if (!age) {
      ctx.body = 'Missing field "age"!';
      ctx.status = 400;
      return;
    } else if (!cpf) {
      ctx.body = 'Missing field "cpf"!';
      ctx.status = 400;
      return;
    } else if (!email) {
      ctx.body = 'Missing field "email"!';
      ctx.status = 400;
      return;
    } else if (!nome) {
      ctx.body = 'Missing field "nome"!';
      ctx.status = 400;
      return;
    }

    const query =
      "INSERT INTO users (age, cpf, email, nome) VALUES (?, ?, ?, ?)";

    const params = [age, cpf, email, nome];
    if (age < 18) {
      ctx.body = { message: "Unauthorized! Users under 18 are not allowed." };
      ctx.status = 403;
      return;
    }

    db.run(query, params);

    ctx.body = { message: "Data added successfully!" };
    ctx.status = 201;
  } catch (error) {
    console.log(error);
    ctx.body = { message: error.message };
    ctx.status = 400;
  }
};

module.exports = userCreation;

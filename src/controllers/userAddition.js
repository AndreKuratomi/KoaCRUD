const db = require("../config/db");

const userCreation = async (ctx) => {
  try {
    const { nome, cpf, email } = ctx.request.body;

    // VALIDATION
    if (!cpf) {
      ctx.body = 'Missing field "cpf"!';
      ctx.status = 400;
      return;
    } else if (!email) {
      ctx.body = 'Missing field "email"!';
      ctx.status = 400;
      return;
    } else if (!nome) {
      ctx.body = 'Missing field "nome"!';
      // ctx.body = `Missing field "${}"!`; AUTOMATIZE!
      ctx.status = 400;
      return;
    }

    const query = "INSERT INTO users (cpf, email, nome) VALUES (?, ?, ?)";
    const params = [cpf, email, nome];
    db.run(query, params);
    // get para pegar o cadastrado?
    ctx.body = { message: "Data added successfully!" };
    ctx.status = 201;
  } catch (error) {
    console.log(error);
    ctx.body = { message: error.message };
    ctx.status = 400;
  }
};

module.exports = userCreation;

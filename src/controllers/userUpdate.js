const db = require("../config/db");

const userUpdate = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { email, nome } = ctx.request.body;
    console.log(email);
    const query = `UPDATE users SET email = '${email}', nome = '${nome}' WHERE id = ${id}`;
    // const params = [email, nome];
    const result = db.run(query);
    // console.log(db.all());
    console.log(result);
    console.log(query);

    ctx.body = {
      message: "User updated successfully!",
      content: result,
    };
    // ver como bloquear alteração de id e cpf
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.body = "User not found!";
    ctx.status = 404;
  }
};

module.exports = userUpdate;

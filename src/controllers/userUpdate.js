const db = require("../config/db");

const userUpdate = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { email, nome } = ctx.request.body;

    const findQuery = `SELECT * FROM users WHERE id = ${id}`;
    const updateQuery = `UPDATE users SET email = '${email}', nome = '${nome}' WHERE id = ${id}`;

    const doWeHaveThisUser = await new Promise((resolve, reject) => {
      db.all(findQuery, (err, rows) => {
        if (err) {
          reject(err);
          ctx.body = err;
          ctx.status = 400;
          return;
        }
        if (rows.length == 0) {
          reject(rows);
          ctx.body = "User not found!";
          ctx.status = 404;
          return;
        }
        resolve(rows);
        db.run(updateQuery); //fazer uma callback para exibir o que foi atualizado?
        ctx.body = "User successfully updated!";
        ctx.status = 200;
        return;
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = userUpdate;

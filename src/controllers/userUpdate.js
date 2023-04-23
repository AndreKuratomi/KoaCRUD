const db = require("../config/db");

const userUpdate = async (ctx) => {
  // try {
  const { id } = ctx.params;

  const user = db.find((elem) => elem.id === Number(id));

  if (user) {
    // ver como bloquear alteração de id e cpf
    ctx.status = 200;
  } else {
    ctx.body = "User not found!";
    ctx.status = 404;
  }
};

module.exports = userUpdate;

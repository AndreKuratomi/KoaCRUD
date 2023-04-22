const db = require("../config/db");

const userDelete = async (ctx) => {
  // try {
  const { id } = ctx.params;

  const user = db.find((elem) => elem.id === Number(id));

  if (user) {
    delete db[user];
    console.log(db);
    ctx.status = 204;
  } else {
    ctx.body = "User not found!";
    ctx.status = 404;
  }
};

module.exports = userDelete;

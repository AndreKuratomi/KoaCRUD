const db = require("../config/db");

const userUpdate = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { age, email } = ctx.request.body;

    // QUERIES:
    const findQuery = `SELECT * FROM users WHERE id = ${id}`;
    const updateQuery0 = "UPDATE users SET ";

    // QUERIES FOR ALTERNATIVE UPDATE:
    let updateQueryAge = "";
    if (!age) {
      updateQueryAge = "";
    } else {
      updateQueryAge = "age = " + age;
    }

    let spaceOrComma = "";
    if (age && email) {
      spaceOrComma = ",";
    }

    let updateQueryEmail = "";
    if (!email) {
      updateQueryEmail = "";
    } else {
      updateQueryEmail = "email = " + `"${email}"` + " ";
    }

    const updateQuery2 = " WHERE id = " + id;

    const updateQuery =
      updateQuery0 +
      updateQueryAge +
      spaceOrComma +
      updateQueryEmail +
      updateQuery2;

    const doWeHaveThisUser = await new Promise((resolve, reject) => {
      db.all(findQuery, (err, rows) => {
        if (rows == undefined) {
          reject(err);
          ctx.body = { message: "Invalid Id! Must be a number." };
          ctx.status = 400;
          return;
        }
        if (rows.length == 0) {
          reject(rows);
          ctx.body = { message: "User not found!" };
          ctx.status = 404;
          return;
        }
        resolve(rows);
        db.run(updateQuery); //fazer uma callback para exibir o que foi atualizado?
        ctx.body = { message: "User successfully updated!" };
        ctx.status = 200;
        return;
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = userUpdate;

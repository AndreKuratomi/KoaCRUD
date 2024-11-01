const db = require("../config/db");
const testDb = require("../../test/config/testDb");

const {apiServerPort, testServerPort} =  require("../../utils/envs")

const userCreation = async (ctx) => {
  try {
    const host = ctx.request.header.host;
    const port  = host.substring(host.indexOf(':') + 1);
  
    let dbUsed = "users";
    let whatDb = db;
  
    if (port === testServerPort) {
      dbUsed = "test_users"
      whatDb = testDb
      // console.log("database:", whatDb)
    }

    const { nome, cpf, email, age } = ctx.request.body || {};
  
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
      `INSERT INTO ${dbUsed} (age, cpf, email, nome) VALUES (?, ?, ?, ?)`;

    const params = [age, cpf, email, nome];
    if (age < 18) {
      ctx.body = { message: "Unauthorized! Users under 18 are not allowed." };
      ctx.status = 403;
      return;
    }

    await new Promise((resolve, reject) => {
      whatDb.run(query, params, function(err) {
        if (err) {
          console.error("Error executing query on testDb: ", err);
          reject(err);
          ctx.body = err;
          ctx.status = 400;
        } else {
          resolve(this);
        }
      });
    });
    // console.log(db)
    // db.run(query, params);

    ctx.body = { message: "Data added successfully!" };
    ctx.status = 201;
  } catch (error) {
    console.log(error);
    ctx.body = { message: error.message };
    ctx.status = 400;
  }
};

module.exports = userCreation;

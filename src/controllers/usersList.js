const db = require("../config/db");
const testDb = require("../../test/config/testDb");

const {apiServerPort, testServerPort} =  require("../../utils/envs")

const usersList = async (ctx) => {
  try {
    const host = ctx.request.header.host;
    const port  = host.substring(host.indexOf(':') + 1);
  
    let db_used = "";
    let whatDb = db;
  
    if (port === apiServerPort) {
      db_used = "users";
    } else if (port === testServerPort) {
      db_used = "test_users";
      whatDb = testDb
    } else {
      console.log("Error! Check port used.")
    }
  
    const query = `SELECT * FROM ${db_used}`;
  
    await new Promise((resolve, reject) => {
      whatDb.all(query, (err, rows) => {
        if (err) {
          reject(err);
          ctx.body = err;
          ctx.status = 400;
        }
        resolve(rows);
  
        ctx.body = rows;
        ctx.status = 200;
      });
    });
  } catch (error) {
    console.log(error);
    ctx.body = { message: error.message };
    ctx.status = 400;
  }
};

module.exports = usersList;

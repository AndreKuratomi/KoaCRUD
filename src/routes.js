const Router = require("koa-router");

const userCreation = require("./controllers/userAddition");
const usersList = require("./controllers/usersList");
const userByIdList = require("./controllers/userByIdList");
const userUpdate = require("./controllers/userUpdate");
const userDelete = require("./controllers/userDelete");

const router = new Router();

router
  .post("/user", userCreation)
  .get("/users", usersList)
  .get("/user/:id", userByIdList)
  .patch("/user/:id", userUpdate)
  .delete("/user/:id", userDelete);

module.exports = router;

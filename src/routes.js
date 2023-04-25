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

// //Uma rota de exemplo simples aqui.
// //As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
// router.get("/users", async (ctx) => {
//   ctx.status = 200;
//   ctx.body = { total: 0, count: 0, rows: [] };
// });

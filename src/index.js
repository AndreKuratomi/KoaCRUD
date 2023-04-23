//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
// import dotenv from "dotenv";

const dotenv = require("dotenv");
// const router = require("./routes");

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const userCreation = require("./controllers/userAddition");
const usersList = require("./controllers/usersList");
const userByIdList = require("./controllers/userByIdList");
const userUpdate = require("./controllers/userUpdate");
const userDelete = require("./controllers/userDelete");

dotenv.config();

const PORT = process.env.PORT || 3000;
const koa = new Koa();
const router = new Router();

koa.use(bodyParser());

router
  .post("/user", userCreation)
  .get("/users", usersList)
  .get("/user/:id", userByIdList)
  .patch("/user/:id", userUpdate)
  .delete("/user/:id", userDelete);

koa.use(router.routes()).use(router.allowedMethods());

const server = koa.listen(PORT, () => {
  console.log(`Server is running at "http://localhost:${PORT}"!`);
});

module.exports = { server, router };

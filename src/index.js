//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
// import dotenv from "dotenv";

const dotenv = require("dotenv");
const cors = require("@koa/cors");

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const { koaSwagger } = require("koa2-swagger-ui");

const router = require("./routes");

dotenv.config();

const PORT = process.env.PORT || 3000;
const koa = new Koa();

koa.use(cors());
koa.use(bodyParser());

koa.use(router.routes()).use(router.allowedMethods());

koa.use(
  koaSwagger({
    routePrefix: "/swagger",
    swaggerOptions: {
      url: "http://localhost:3000/swagger",
    },
  })
);

const server = koa.listen(PORT, () => {
  console.log(`Server is running at "http://localhost:${PORT}"!`);
});

module.exports = { server };

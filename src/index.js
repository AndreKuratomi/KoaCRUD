const dotenv = require("dotenv");
const cors = require("@koa/cors");

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const { koaSwagger } = require("koa2-swagger-ui");
const paginate = require("koa-ctx-paginate");

const fs = require('fs');
const path = require('path');

const router = require("./routes");

dotenv.config();

const API_PORT = process.env.API_PORT;

const koa = new Koa();

koa.use(cors());
koa.use(bodyParser());
koa.use(paginate.middleware(10, 20));

koa.use(router.routes()).use(router.allowedMethods());


// SWAGGER:
koa.use(
  koaSwagger({
    routePrefix: "/swagger",
    swaggerOptions: {
      url: `http://localhost:${API_PORT}/swagger/openapi.yaml`,
    },
  })
);


koa.use(async(ctx, next) => {
  if (ctx.path === '/swagger/openapi.yaml') {
    ctx.type = 'yaml';
    ctx.body = fs.createReadStream(path.join(__dirname, '../openapi.yaml'));
  } else {
    await next()
  }
});

const server = koa.listen(API_PORT, () => {
  console.log(`API Server is running at "http://localhost:${API_PORT}"!`);
});

module.exports = { server };

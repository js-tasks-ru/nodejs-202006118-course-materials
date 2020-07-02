const router = require('./routing');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

module.exports = (app) => {
  app.use(cors({origin: '*'}))
  app.use(bodyParser());
  // app.use(async (ctx, next) => {
  //   const buffer = []
  //   for await (const chunk of ctx.req) {
  //     buffer.push(chunk)
  //   }
  //   ctx.request.body = JSON.parse(Buffer.concat(buffer).toString());
  //   return next();
  // });

  app.use(router.middleware());

  // app.use(router2.middleware());
  // router.all('/v3', routerV3.middleware());
}

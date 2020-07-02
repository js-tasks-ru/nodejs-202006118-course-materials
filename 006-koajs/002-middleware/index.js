const Koa = require('koa');

const app = new Koa();

class ApiError extends Error {
  constructor() {
    super();
    this.status = 500;
    this.message = 'Internal server error';
  }
}

class NotAuthorized extends ApiError {
  constructor() {
    super();
    this.status = 403;
    this.message = 'User not authorized';
  }
}

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (e instanceof ApiError) {
      ctx.status = e.status;
      ctx.body = {
        message: e.message,
      }
      return;
    }
    throw e;
  }
});

app.use(async (ctx, next) => {
  const start =  Date.now();
  await next();
  const end = Date.now();
  console.log(`Time: ${end - start}ms`);
});

app.use(async (ctx, next) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  // ctx.body = 'Done';
  throw new NotAuthorized();
});

/**
 * m1 -> m2 -> m3 -> m2 -> m1
 */

app.listen(3000);

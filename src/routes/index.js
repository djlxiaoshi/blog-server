// todo 登录校验

const Router = require('koa-router');
const config = require('../config/config');
const userRouter = require('./user');
const componentRouter = require('./component');
const tagRouter = require('./tag');

const router = new Router();

// 处理cors跨域
router.use(async (ctx, next) => {
  const allowOrigin = ctx.request.header.origin;

  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  ctx.set('Access-Control-Allow-Origin', allowOrigin);
  ctx.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  ctx.set('Access-Control-Allow-Credentials', true);
  await next()
});

// 处理预请求
router.options('*', async (ctx, next) => {
  const allowOrigin = ctx.request.header.origin;

  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  ctx.set('Access-Control-Allow-Origin', allowOrigin);
  ctx.status = 204;
  await next();
});

// 用户相关路由
userRouter(router);
// 组件管理路由
componentRouter(router);
// 标签相关路由
tagRouter(router);

module.exports = router;


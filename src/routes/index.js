// todo 登录校验

const Router = require('koa-router');
const config = require('../config/config');
const userRouter = require('./user');
const articleRouter = require('./article');
const tagRouter = require('./tag');
const menuRouter = require('./menu');
const commentRouter = require('./comment');
const timelineRouter = require('./timeline');
const systemRouter = require('./system');

const router = new Router({
  prefix: '/api'
});

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
// 文章相关
articleRouter(router);
// 标签相关路由
tagRouter(router);
// 菜单管理相关路由
menuRouter(router);
// 评论相关
commentRouter(router);
// 时光轴
timelineRouter(router);
// 系统相关
systemRouter(router);

module.exports = router;


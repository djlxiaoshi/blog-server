// 检测用户是否登录

module.exports = {
  checkLogin: async (ctx, next) => {
    if (!ctx.session.user) {
      return ctx.body = {
        code: -1000,
        message: '用户未登录'
      }
    }
    await next();
  },

  checkIsAdmin: async (ctx, next) => {
    const user = ctx.session.user;
    if(!user) {
      return ctx.body = {
        code: -1000,
        message: '用户未登录'
      }
    }
    if (user.role !== 0) {
      return ctx.body = {
        code: -1001,
        message: '用户权限不足'
      }
    }
    await next();
  },

  checkNotLogin: async (ctx, next) => {
    if (ctx.session.user) {
      return ctx.body = {
        code: -1002,
        message: '用户已登录，请登出后再执行操作'
      };
    }
    await next();
  }
};
